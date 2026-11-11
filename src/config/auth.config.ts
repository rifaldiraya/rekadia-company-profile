/* eslint-disable no-param-reassign */
import { NEXTAUTH_SECRET } from "@/constants";
import { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiRequest } from "@/services/api-client";
import { API_ENDPOINTS } from "@/services/api-config";
import { isApiError } from "@/services/api-error";

interface AccountTokenResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

interface AccessTokenClaims {
  sub?: string;
  id?: string;
  username?: string;
  name?: string;
  email?: string;
  role?: string | string[];
  /** JSON string of `[{ type, values }]`. */
  permission?: string;
}

/** Refresh this long before the API token actually expires. */
const REFRESH_MARGIN_MS = 60_000;

const readClaims = (token: string): AccessTokenClaims => {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1] ?? "", "base64url").toString("utf8"));
  } catch {
    return {};
  }
};

const readPermissions = (value: string | undefined): User["permissions"] => {
  try {
    return JSON.parse(value ?? "[]");
  } catch {
    return [] as unknown as User["permissions"];
  }
};

const expiresAt = (expiresIn: number) => Date.now() + expiresIn * 1000;

const refreshAccessToken = async (token: JWT): Promise<JWT | null> => {
  try {
    const refreshed = await apiRequest<AccountTokenResponse>(API_ENDPOINTS.refreshToken, {
      method: "POST",
      body: { refreshToken: token.refreshToken },
    });
    return {
      ...token,
      accessToken: refreshed.token,
      refreshToken: refreshed.refreshToken,
      accessTokenExpires: expiresAt(refreshed.expiresIn),
    };
  } catch {
    return null;
  }
};

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        emailOrUserName: {
          label: "Email or username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        try {
          const account = await apiRequest<AccountTokenResponse>(API_ENDPOINTS.login, {
            method: "POST",
            body: {
              emailOrUserName: credentials?.emailOrUserName ?? "",
              password: credentials?.password ?? "",
            },
          });
          const claims = readClaims(account.token);

          return {
            id: claims.id ?? claims.sub ?? "",
            username: claims.username ?? "",
            name: claims.name ?? "",
            email: claims.email ?? "",
            photo: "",
            roles: [claims.role ?? []].flat(),
            permissions: readPermissions(claims.permission),
            accessToken: account.token,
            refreshToken: account.refreshToken,
            accessTokenExpires: expiresAt(account.expiresIn),
          } as User;
        } catch (error) {
          if (isApiError(error) && (error.status === 400 || error.status === 401)) return null;
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.name = user.name;
        token.id = user.id;
        token.permissions = user.permissions;
        token.picture = user.photo;
        token.roles = user.roles;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
        return token;
      }

      if (Date.now() < token.accessTokenExpires - REFRESH_MARGIN_MS) return token;

      // Keep the expired token when refreshing fails; the next API call answers 401 and signs the user out.
      return (await refreshAccessToken(token)) ?? token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user = {
          ...session.user,
          username: token.username,
          email: token.email,
          name: token.name,
          id: token.id,
          permissions: token.permissions,
          image: token.picture,
          roles: token.roles,
        };
      }

      return session;
    },
  },
  events: {
    async signOut({ token }) {
      if (!token?.refreshToken) return;
      await apiRequest(API_ENDPOINTS.logout, {
        method: "POST",
        body: { refreshToken: token.refreshToken },
        headers: { Authorization: `Bearer ${token.accessToken}` },
      }).catch(() => undefined);
    },
  },
  jwt: {
    maxAge: 60 * 30,
  },
  session: {
    strategy: "jwt",
  },
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};

export default authOptions;
