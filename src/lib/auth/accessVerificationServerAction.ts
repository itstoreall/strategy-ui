'use server';

const allowedEmails = process.env.ACCESS_CREDENTIALS;

const accessVerification = async (email: string) => {
  if (!email || !allowedEmails) return false;

  const isAccess = allowedEmails.split('_|_').includes(email);

  return isAccess;
};

export default accessVerification;
