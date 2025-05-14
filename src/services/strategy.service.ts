import apiClient from '@/src/lib/api/client';
import { AxiosError } from 'axios';

class StrategyService {
  async updateStrategy(strategyId: number, data: string) {
    try {
      const url = '/strategies/update-strategy-data';
      const res = await apiClient.put(url, { strategyId, data });
      return res.data;
    } catch (err: unknown) {
      console.error('ERROR in updateStratedy:', (err as AxiosError).message);
      throw err;
    }
  }
}

export const strategyService = new StrategyService();
