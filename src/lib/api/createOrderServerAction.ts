'use server';

import { CreateOrderDto, orderService } from '@/src/services/order.service';

export const createOrder = async (dto: CreateOrderDto) => {
  console.log('dto:', dto);
  try {
    const data = await orderService.createOrder(dto);
    return data;
  } catch (err) {
    throw err;
  }
};
