'use server';

import { AxiosError } from 'axios';
import { tokenService, UpdatePricesParams } from '@/src/services/token.service';

export const updatePrices = async (params: UpdatePricesParams) => {
  try {
    const data = await tokenService.updatePrices(params);
    return data.data;
  } catch (err) {
    return { error: (err as AxiosError).message };
  }
};
