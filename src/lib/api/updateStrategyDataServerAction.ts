'use server';

import { AxiosError } from 'axios';
import { strategyService } from '@/src/services/strategy.service';

export const updateStrategyData = async (strategyId: number, data: string) => {
  try {
    const res = await strategyService.updateStrategy(strategyId, data);
    return res.data;
  } catch (err) {
    return { error: (err as AxiosError).message };
  }
};
