import * as bcrypt from 'bcrypt';

const comparePasswords = async (inputPassword: string, dbPassword: string) => {
  try {
    const isPasswordMatch = await bcrypt.compare(inputPassword, dbPassword);
    return !!isPasswordMatch;
  } catch (err) {
    console.error('ERROR in comparePasswords:', err);
    return false;
  }
};

export default comparePasswords;
