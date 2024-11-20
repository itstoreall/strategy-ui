'use server';

import { CreateTokenDto, tokenService } from '@/src/services/token.service';

export const createToken = async (dto: CreateTokenDto) => {
  try {
    const data = await tokenService.createToken(dto);
    return data;
  } catch (err) {
    throw err;
  }
};
