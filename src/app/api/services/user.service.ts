import axios, { AxiosResponse } from 'axios';

type RoleData = { role: 'USER' | 'ADMIN' };
type RoleRes = AxiosResponse<RoleData>;
type StatusData = { status: boolean };
type StatusRes = AxiosResponse<StatusData>;
type SetNameData = { updated: boolean };
type SetNameRes = AxiosResponse<SetNameData>;
type UnlinkData = { unlinked: boolean };
type UnlinkRes = AxiosResponse<UnlinkData>;
type Provider = 'google';

const BASE_URL = process.env.NEXT_PUBLIC_STRATEGY_API_URL;
const userUrl = `${BASE_URL}/api/user`;

axios.defaults.baseURL = userUrl;

class UserService {
  async getRole(id: string) {
    try {
      const url = `/role/${id}`;
      const res: RoleRes = await axios.get(url);
      return res.data;
    } catch (err) {
      console.error('Failed to retrieve user role:', err);
      throw err;
    }
  }

  async getStatus(id: string) {
    try {
      const url = `/account/google/${id}`;
      const res: StatusRes = await axios.get(url);
      return res.data;
    } catch (err) {
      console.error('Error checking Google account link status:', err);
      throw err;
    }
  }

  async updateName(id: string, name: string) {
    try {
      const url = '/update-name';
      const payload = { userId: id, name };
      const res: SetNameRes = await axios.put(url, payload);
      return res.data;
    } catch (err) {
      console.error('Failed to set name:', err);
      throw err;
    }
  }

  async unlinkAccount(id: string, provider: Provider) {
    try {
      const url = `/account/${provider}/${id}`;
      const res: UnlinkRes = await axios.delete(url);
      return res.data;
    } catch (err) {
      console.error('Failed to unlink Google account:', err);
      throw err;
    }
  }
}

export const userService = new UserService();
