/* eslint-disable no-param-reassign */
import { BASE_URL, NEXTAUTH_SECRET, SUPER_ADMIN } from "@/constants";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import axios from "axios";
import { accessControl } from "@/config/access-control.config";

interface ISignIn {
  token: string;
  refreshToken: string;
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        try {
          const data = await axios.post<ISignIn>(
            `${BASE_URL}/account/login`,
            credentials,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          const decoded = (await jwt.decode(data.data.token)) as any;

          let permissions = decoded.permission;

          if (decoded.role.includes(SUPER_ADMIN)) {
            permissions = accessControl.map((item) => ({
              type: item.name,
              values: item.actions,
            }));
          }

          const user = {
            ...decoded,
            permissions,
            roles: decoded.role,
            accessToken: data.data.token,
            refreshToken: data.data.refreshToken,
          };

          return user;
        } catch (e) {
          return null;
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
