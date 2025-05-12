import apiClient from '@/src/lib/api/client';

export type UpdateStrategyParams = {
  data: string | null;
};

class StrategyService {
  async updateStratedy(strategyId: number, params: UpdateStrategyParams) {
    try {
      const url = `/strategies/id/${strategyId}`;
      const res = await apiClient.put(url, params);
      return res.data;
    } catch (err: unknown) {
      console.error('ERROR in updateStratedy:', err);
      throw err;
    }
  }
}

export const strategyService = new StrategyService();
