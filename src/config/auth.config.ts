/* eslint-disable no-param-reassign */
import { NEXTAUTH_SECRET, SUPER_ADMIN } from "@/constants";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { accessControl } from "@/config/access-control.config";
import { findDemoAccount } from "@/features/sign-in/data/demo-accounts";

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
        const account = findDemoAccount(credentials?.emailOrUserName ?? "", credentials?.password ?? "");
        if (!account) return null;

        const permissions =
          account.role === SUPER_ADMIN
            ? accessControl.map((item) => ({ type: item.name, values: item.actions }))
            : [];

        return {
          id: account.id,
          username: account.username,
          name: account.name,
          email: account.email,
          photo: "",
          roles: [account.role],
          permissions,
          accessToken: `demo-token-${account.id}`,
          refreshToken: `demo-refresh-${account.id}`,
        } as User;
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
      }

      return token;
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
