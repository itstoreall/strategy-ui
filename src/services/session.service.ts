import axios from 'axios';
// import { getSessionData } from '@/src/lib/auth/getSessionDataServerAction';
// import { Session } from '@/src/types';

const BASE_URL = process.env.NEXT_PUBLIC_STRATEGY_API_URL;
const userUrl = `${BASE_URL}/api/sessions`;

axios.defaults.baseURL = userUrl;

class SessionService {
  async getAllSessions() {
    /*
    const sessionData = await getSessionData();
    if (!sessionData) {
      throw new Error('Session is missing!');
    }
    try {
      // const url = `/all?userId=${session.user?.id}&sessionToken=${hashedToken}`;
      const url = `/all?userId=${sessionData.userId}`;
      const res: AxiosResponse<Session[]> = await axios.get(url);
      return res.data;
    } catch (err: unknown) {
      console.error('Failed to fetch All Sessions:', err);
    }
    // */
  }
}

export const sessionService = new SessionService();
