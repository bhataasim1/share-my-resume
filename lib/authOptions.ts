import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { userDefaultValues } from "@/constant/defaultValyes";
import prisma from "@/prisma/schema";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter Username",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials?.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
        };

        // const user = {
        //   id: userDefaultValues.id,
        //   name: userDefaultValues.name,
        //   username: userDefaultValues.username,
        //   email: userDefaultValues.email,
        //   password: userDefaultValues.password,
        // };
        // if (
        //   user.email === credentials?.email &&
        //   user.password === credentials.password
        // ) {
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token, user }) {
      // session.user = token;
      if (session.user) {
        session.user.id = token.id;
      }
      // console.log("session", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
