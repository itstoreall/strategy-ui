/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/src/lib/prisma/client";
import { clearExpiredVerificationTokens } from "@/src/lib/auth/clearStaleTokensServerAction";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

const sendVerificationEmail = async (to: string, signInUrl: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Sign in to My App",
    text: `Sign in to the app by clicking on this link: ${signInUrl}`,
    html: `<p>Click the link below to sign in to <strong>My App</strong>:</p>
           <p><a href="${signInUrl}">Sign in to My App</a></p>`,
  });
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/success",
    error: "/auth/error",
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    {
      id: "nodemailer",
      name: Nodemailer.name,
      type: "email",
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await sendVerificationEmail(email, url);
      },
    },

    /*
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    */
  ],

  callbacks: {
    async jwt({ token, user, session, trigger }) {
      console.log("------ jwt trigger ------", trigger);

      if (user) {
        await clearExpiredVerificationTokens();
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

    async session({ session, token }) {
      console.log("session callback:", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
});
