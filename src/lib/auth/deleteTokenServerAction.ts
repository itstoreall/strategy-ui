'use server';

import { tokenService } from '@/src/services/token.service';

export const deleteToken = async (symbol: string) => {
  try {
    const res = await tokenService.removeToken(symbol);
    return res.data;
  } catch (err) {
    console.log('ERROR in deleteToken:', err);
  }
};
