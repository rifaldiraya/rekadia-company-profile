import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    roles: string[];
    photo: string;
    permissions: [
      {
        type: string;
        values: string[]
      }
    ]
    accessToken: string;
    refreshToken: string;
  }
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      username: string;
      name: string;
      email: string;
      roles: string[];
      image: string;
      permissions: [
        {
          type: string;
          values: string[]
        }
      ]
    } & DefaultSession['user'];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    username: string;
    name: string;
    email: string;
    roles: string[];
    permissions: [
      {
        type: string;
        values: string[]
      }
    ],
    picture: string;
    accessToken: string;
    refreshToken: string;
  }
}


