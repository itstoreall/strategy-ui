/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "../prisma/client";
// import PostgresAdapter from "@auth/pg-adapter";
// import { pool } from "@/src/lib/postgress";
// import { clearStaleTokens } from "./clearStaleTokensServerAction";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  // adapter: PostgresAdapter(pool),
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET, // Signing the session cookie (AuthJS can verify the session)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/auth/sign-in",
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    /*
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
      }
      if (account) {
        token.accessToken = account.accessToken; // Add access token
      }
      return token;
    },

    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.id; // Add user ID to session object
      // @ts-ignore
      session.accessToken = token.accessToken; // Add access token to session
      return session;
    },
    */
    // /*
    async jwt({ token, user, session, trigger }) {
      console.log("------ jwt trigger ------", trigger);

      if (user) {
        // await clearStaleTokens();
        console.log("clearStaleTokens user ==>", user);
        console.log("clearStaleTokens token ==>", token);
        console.log("clearStaleTokens session ==>", session);
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    // */
  },
});
