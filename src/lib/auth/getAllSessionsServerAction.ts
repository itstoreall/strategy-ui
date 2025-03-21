'use server';

import { sessionService } from '@/src/services/session.service';

export const getAllSessions = async () => {
  try {
    return await sessionService.getAllSessions();
  } catch (err) {
    console.log('ERROR in getAllSessions:', err);
  }
};
