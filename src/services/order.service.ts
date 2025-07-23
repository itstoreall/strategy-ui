import { AxiosError } from 'axios';
import apiClient from '@/src/lib/api/client';
import { OrderTypeEnum } from '@/src/enums';
import { OrderData, OrderStrategyData } from '@/src/types';

const errorHandler = (msg: string, err: unknown) => {
  const errMsg = err instanceof AxiosError ? err.response?.statusText : err;
  console.error(msg, errMsg ?? 'Unknown error');
  return String(errMsg) ?? 'An unexpected error occurred';
};

export type CreateOrderDto = {
  type: OrderTypeEnum | string;
  symbol: string;
  amount: number;
  price: number;
  userId: string;
};

export type DelManyOrdersRes = {
  deletedCount: number;
  deletedIds: number[];
};

class OrderService {
  async fetchAllOrders(): Promise<OrderData> {
    try {
      const url = '/orders';
      const res = await apiClient.get(url);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = errorHandler('ERROR in fetchAllOrders:', err);
      throw new Error(errorMessage);
    }
  }

  async fetchAllByUserId(userId: string): Promise<OrderData> {
    try {
      const url = `/orders/user/${userId}`;
      const res = await apiClient.get(url);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = errorHandler('ERROR in fetchAllByUserId:', err);
      throw new Error(errorMessage);
    }
  }

  async fetchAllByUserIdAndStrategy(
    userId: string,
    type: string,
    symbol: string,
    status: string,
    exchange: string
  ): Promise<OrderStrategyData> {
    if (!userId) {
      throw new Error('User ID is required to fetch orders.');
    }

    const queryType = type ? `&type=${type}` : '';
    const queryStatus = exchange ? `&status=${status}` : '';
    const queryExchange = exchange ? `&exchange=${exchange}` : '';

    try {
      const query = `symbol=${symbol}${queryType}${queryStatus}${queryExchange}`;
      const url = `/orders/user/${userId}/strategy?${query}`;
      const res = await apiClient.get(url);
      return res.data.data;
    } catch (err: unknown) {
      const errorMessage = errorHandler(
        'ERROR in fetchAllByUserIdAndStrategy:',
        err
      );
      throw new Error(errorMessage);
    }
  }

  async createOrder(orderData: CreateOrderDto) {
    try {
      const url = '/orders';
      const res = await apiClient.post(url, orderData);
      return res.data;
    } catch (err: unknown) {
      errorHandler('ERROR in createOrder:', err);
      throw err;
    }
  }

  async deleteOrder(orderId: number): Promise<{ id: number }> {
    try {
      const url = `/orders/id/${orderId}`;
      const res = await apiClient.delete(url);
      return res.data.data;
    } catch (err: unknown) {
      const errorMessage = errorHandler('ERROR in deleteOrder:', err);
      throw new Error(errorMessage);
    }
  }

  async deleteManyOrders(orderIds: number[]): Promise<DelManyOrdersRes> {
    console.log('orderIds:', orderIds);
    try {
      const url = '/orders/many';
      const res = await apiClient.delete(url, { data: { orderIds } });
      return res.data.data;
    } catch (err: unknown) {
      const errorMessage = errorHandler('ERROR in deleteManyOrders:', err);
      throw new Error(errorMessage);
    }
  }
}

export const orderService = new OrderService();
