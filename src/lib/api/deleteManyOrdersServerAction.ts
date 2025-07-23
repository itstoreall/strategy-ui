'use server';

import { orderService } from '@/src/services/order.service';

export const deleteManyOrders = async (orderIds: number[]) => {
  try {
    const res = await orderService.deleteManyOrders(orderIds);
    return res;
  } catch (err) {
    throw err;
  }
};
