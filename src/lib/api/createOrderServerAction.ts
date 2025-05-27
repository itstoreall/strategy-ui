'use server';

import { CreateOrderDto, orderService } from '@/src/services/order.service';

export const createOrder = async (dto: CreateOrderDto) => {
  try {
    const data = await orderService.createOrder(dto);
    return data;
  } catch (err) {
    throw err;
  }
};
