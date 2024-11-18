import { AxiosError } from 'axios';
import apiClient from '@/src/lib/api/client';

const errorHandler = (msg: string, err: unknown) => {
  const errMsg = err instanceof AxiosError ? err.response?.statusText : err;
  console.error(msg, errMsg ?? 'Unknown error');
  return String(errMsg) ?? 'An unexpected error occurred';
};

export type FindAllTokensParams = {
  status?: string;
  orderSymbol?: string;
};

export type CreateTokenDto = {
  symbol: string;
  name: string;
};

class TokenService {
  async fetchAllTokens(params: FindAllTokensParams = {}) {
    try {
      const url = '/tokens';
      const res = await apiClient.get(url, { params });
      return res.data;
    } catch (err: unknown) {
      errorHandler('ERROR in fetchAllTokens:', err);
      throw err;
    }
  }

  async createToken(tokenData: CreateTokenDto) {
    try {
      const url = '/tokens';
      const res = await apiClient.post(url, tokenData);
      return res.data;
    } catch (err: unknown) {
      errorHandler('ERROR in createToken:', err);
      throw err;
    }
  }
}

export const tokenService = new TokenService();
