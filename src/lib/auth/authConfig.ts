import NextAuth from "next-auth";
import axios from "axios";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { createTransport } from "nodemailer";
import { prisma } from "@/src/lib/prisma/client";
import { clearExpiredVerificationTokens } from "@/src/lib/auth/clearStaleTokensServerAction";
import { error } from "console";

const strategyApiUrl = process.env.NEXT_PUBLIC_STRATEGY_API_URL;

const SMTPFrom = process.env.EMAIL_FROM;

const SMTPCreds = {
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};

type VerifyReqParams = {
  identifier: string;
  url: string;
};

const generateRandomNumbers = () => {
  let verificationCode = "";
  for (let i = 0; i < 4; i++) {
    verificationCode += Math.floor(Math.random() * 10);
  }
  return verificationCode;
};

export async function sendVerificationRequest(params: VerifyReqParams) {
  const { identifier, url } = params;
  const { host } = new URL(url);
  const transport = createTransport(SMTPCreds);

  const code = generateRandomNumbers();
  const payload = { identifier, code, url };
  await axios.post(`${strategyApiUrl}/api/user/verify/code`, payload);

  try {
    await transport.sendMail({
      to: identifier,
      from: SMTPFrom,
      subject: `Sign in to ${host}`,
      text: text({ url, host }),
      html: html({ url, host, code }),
    });
  } catch (err) {
    throw error(err);
  }
}

const text = ({ url, host }: { url: string; host: string }) => {
  return `Sign in to ${host}\n${url}\n\n`;
};

const html = (params: { url: string; host: string; code: string }) => {
  const { url, host, code } = params;
  console.log("host:::::", host);
  return `
    <body>
      <a href="${url}" target="_blank">Sign in</a>
      <p>${code}</p>
    </body>
  `;
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
    verifyRequest: `/auth/success/`,
    error: "/auth/error",
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    /*
    Nodemailer({
      async generateVerificationToken() {
        console.log(111);
        return crypto.randomUUID();
      },
    }),
    */

    /*
    {
      id: "nodemailer",
      name: Nodemailer.name,
      type: "email",
      sendVerificationRequest: async ({ identifier, url }) => {
        await sendVerificationEmail({ identifier, url });
      },
    },
    */

    // /*
    Nodemailer({
      server: SMTPCreds,
      from: SMTPFrom,
      sendVerificationRequest({ identifier, url }) {
        sendVerificationRequest({ identifier, url });
      },
    }),
    // */

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
      async generateVerificationToken() {
        console.log(111);
        return crypto.randomUUID();
      },
    }),
    // */
  ],

  callbacks: {
    async jwt({ token, user, session, trigger }) {
      console.log("------ jwt trigger | session ------", trigger, session);

      if (user) {
        await clearExpiredVerificationTokens();
        /*
        console.log("clearStaleTokens user ==>", user);
        console.log("clearStaleTokens token ==>", token);
        console.log("clearStaleTokens session ==>", session);
        */
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },

    async session({ session, token }) {
      /*
      console.log("session callback:", { session, token });
      */
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
