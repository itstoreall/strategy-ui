import { AxiosError } from 'axios';
import apiClient from '@/src/lib/api/client';
import { HodlTargetsData } from '@/src/types';

type HodlTargetsRes = { data: HodlTargetsData[] };

class HodlTargetsService {
  async fetchAllHodlTargetsByUserId(userId: string): Promise<HodlTargetsRes> {
    try {
      const url = `/strategies/hodl-targets/user/${userId}`;
      const res = await apiClient.get(url);
      return res.data;
    } catch (err: unknown) {
      console.error(
        'ERROR in fetchAllHodlTargetsByUserId:',
        (err as AxiosError).message
      );
      throw err;
    }
  }
}

export const hodlTargetsService = new HodlTargetsService();
