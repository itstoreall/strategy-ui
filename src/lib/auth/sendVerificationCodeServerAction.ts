'use server';

import { createTransport } from 'nodemailer';
import SMTPCredentials from '@/src/lib/auth/SMTPCredentials';

const sendVerificationCode = async (recipientEmail: string, code: string) => {
  const transport = createTransport(SMTPCredentials);

  const message = {
    to: recipientEmail,
    from: process.env.EMAIL_FROM,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${code}`,
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  };

  try {
    await transport.sendMail(message);
    return true;
  } catch (err) {
    console.error('Failed to send verification code:', err);
    return false;
  }
};

export default sendVerificationCode;
