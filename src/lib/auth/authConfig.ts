import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import PostgresAdapter from "@auth/pg-adapter";
// import { pool } from "@/src/lib/postgress";
// import { clearStaleTokens } from "./clearStaleTokensServerAction";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  // adapter: PostgresAdapter(pool),
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
  },
});
