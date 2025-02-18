import { AxiosError } from 'axios';
import apiClient from '@/src/lib/api/client';
import { OrderTypeEnum } from '@/src/enums';
import { OrderData } from '@/src/types';

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

class OrderService {
  // async fetchAllByUserId(userId: string): Promise<Order[]> {
  //   const response = await apiClient.get(`/api/orders?userId=${userId}`);
  //   return response.data;
  // }

  async fetchAllOrders(): Promise<OrderData> {
    try {
      const url = '/orders';
      const res = await apiClient.get(url);
      console.log('orders res -------->', res);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = errorHandler('ERROR in fetchAllOrders:', err);
      throw new Error(errorMessage);
    }
  }

  async fetchAllByUserId(userId: string): Promise<OrderData> {
    if (!userId) {
      throw new Error('User ID is required to fetch orders.');
    }

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
  ): Promise<OrderData> {
    if (!userId) {
      throw new Error('User ID is required to fetch orders.');
    }

    const queryType = type ? `&type=${type}` : '';
    const queryStatus = exchange ? `&status=${status}` : '';
    const queryExchange = exchange ? `&exchange=${exchange}` : '';

    console.log('queryExchange:', queryExchange);

    try {
      // const url = `/orders/user/${userId}/${symbol}`;
      const url = `/orders/user/${userId}/strategy?symbol=${symbol}${queryType}${queryStatus}${queryExchange}`;
      const res = await apiClient.get(url);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = errorHandler(
        'ERROR in fetchAllByUserIdAndStrategy:',
        err
      );
      throw new Error(errorMessage);
    }
  }

  // async fetchAllByUserId(userId: string) {
  //   console.log('api getAllByUserId', userId);

  //   try {
  //     const url = `/orders/user/${userId}`;
  //     const res = await apiClient.get(url);
  //     return res.data;
  //   } catch (err: unknown) {
  //     errorHandler('ERROR in createOrder:', err);
  //     throw err;
  //   }
  // }

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
}

export const orderService = new OrderService();
