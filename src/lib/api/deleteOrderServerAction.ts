'use server';

import { orderService } from '@/src/services/order.service';

export const deleteOrder = async (orderId: number) => {
  try {
    const res = await orderService.deleteOrder(orderId);
    return res.id === orderId;
  } catch (err) {
    throw err;
  }
};
