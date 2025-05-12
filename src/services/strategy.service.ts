import apiClient from '@/src/lib/api/client';
import { TradeStrategy } from '@/src/types';

export type UpdateStrategyParams = {
  data: TradeStrategy;
};

class StrategyService {
  async updateStratedy(strategyId: number, params: UpdateStrategyParams) {
    console.log('params:', params);
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
