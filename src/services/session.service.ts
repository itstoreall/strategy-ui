import axios, { AxiosError, AxiosResponse } from 'axios';
import { getSessionData } from '@/src/lib/auth/getSessionDataServerAction';
import { Session } from '@/src/types';

const BASE_URL = process.env.NEXT_PUBLIC_STRATEGY_API_URL;
const userUrl = `${BASE_URL}/api/sessions`;

axios.defaults.baseURL = userUrl;

const errorHandler = (msg: string, err: unknown) => {
  const errMsg = err instanceof AxiosError ? err.response?.statusText : err;
  console.error(msg, errMsg ?? 'Unknown error');
  return String(errMsg) ?? 'An unexpected error occurred';
};

class SessionService {
  async getAllSessions() {
    const sessionData = await getSessionData();
    if (!sessionData) {
      throw new Error('Session token is missing!');
    }
    const { userId, hashedToken } = sessionData;
    console.log('userId, hashedToken:::', userId, hashedToken);
    try {
      const url = `/all?userId=${userId}&sessionToken=${hashedToken}`;
      const res: AxiosResponse<Session[]> = await axios.get(url);
      // console.log('res:::', res);
      return res.data;
    } catch (err: unknown) {
      errorHandler('Failed to fetch All Sessions:', err);
    }
  }
}

export const sessionService = new SessionService();
