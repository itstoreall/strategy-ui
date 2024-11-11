import axios, { AxiosError, AxiosResponse } from 'axios';

type RoleData = { role: 'USER' | 'ADMIN' };
type CredsData = { email: string; verified: Date; password: string };
type StatusData = { status: boolean };
type SignUpData = { id: string; email: string; role: string };
type SignInData = (SignUpData & { name: string }) | null;
type UpdatedData = { updated: boolean };
type TokensData = { deletedCount: number };
type UnlinkData = { unlinked: boolean };
type Provider = 'google';

const BASE_URL = process.env.NEXT_PUBLIC_STRATEGY_API_URL;
const userUrl = `${BASE_URL}/api/user`;

axios.defaults.baseURL = userUrl;

const errorHandler = (msg: string, err: unknown) => {
  const errMsg = err instanceof AxiosError ? err.response?.statusText : err;
  console.error(msg, errMsg ?? 'Unknown error');
  return String(errMsg) ?? 'An unexpected error occurred';
};

class UserService {
  async getRole(id: string) {
    try {
      const url = `/role/${id}`;
      const res: AxiosResponse<RoleData> = await axios.get(url);
      return res.data;
    } catch (err: unknown) {
      errorHandler('Failed to retrieve user role:', err);
      // throw err;
      // return null;
    }
  }

  async getCredentials(email: string) {
    try {
      const url = `/email/${email}`;
      const res: AxiosResponse<CredsData | null> = await axios.get(url);
      return res.data;
    } catch (err: unknown) {
      throw err;
    }
  }

  async getStatus(id: string) {
    try {
      const url = `/account/google/${id}`;
      const res: AxiosResponse<StatusData> = await axios.get(url);
      return res.data;
    } catch (err: unknown) {
      errorHandler('Error checking Google account link status:', err);
      throw err;
    }
  }

  async credentialsSignUp(email: string, password: string) {
    try {
      const url = '/auth/signup';
      const payload = { email, password };
      const res: AxiosResponse<SignUpData> = await axios.post(url, payload);
      return res.data;
    } catch (err: unknown) {
      errorHandler('Failed to sign up:', err);
      // throw err;
    }
  }

  async credentialsSignIn(email: string, password: string) {
    try {
      const url = '/auth/signin';
      const payload = { email, password };
      const res: AxiosResponse<SignInData> = await axios.post(url, payload);
      return res.data;
    } catch (err: unknown) {
      errorHandler('Failed to sign in:', err);
    }
  }

  async createVerifyCode(email: string) {
    try {
      const url = '/verify/code';
      const payload = { identifier: email };
      const res: AxiosResponse<boolean> = await axios.post(url, payload);
      return res.data;
    } catch (err: unknown) {
      console.log(3, err);
      errorHandler('Failed to sign in:', err);
    }
  }

  async updateName(id: string, name: string) {
    try {
      const url = '/update-name';
      const payload = { userId: id, name };
      const res: AxiosResponse<UpdatedData> = await axios.put(url, payload);
      console.log('updateName res:', res);
      return res.data;
    } catch (err: unknown) {
      errorHandler('Failed to set name:', err);
      throw err;
    }
  }

  async updateCredentials(email: string, password: string, code: string) {
    try {
      const url = '/verify/credentials';
      const payload = { email, password, code };
      const res: AxiosResponse<UpdatedData> = await axios.put(url, payload);
      return res.data;
    } catch (err: unknown) {
      errorHandler('Failed to update credentials:', err);
      throw err;
    }
  }

  async removeTokens() {
    try {
      const url = '/token/remove-expired';
      const res: AxiosResponse<TokensData> = await axios.delete(url);
      return res.data;
    } catch (err: unknown) {
      errorHandler('Error clearing expired tokens:', err);
      throw err;
    }
  }

  async unlinkAccount(id: string, provider: Provider) {
    try {
      const url = `/account/${provider}/${id}`;
      const res: AxiosResponse<UnlinkData> = await axios.delete(url);
      return res.data;
    } catch (err: unknown) {
      errorHandler('An unknown error occurred:', err);
      throw err;
    }
  }
}

export const userService = new UserService();
