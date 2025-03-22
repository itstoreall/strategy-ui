import { ReactNode } from 'react';
import { AuthRoleEnum, ExchangeEnum, OrderStatusEnum } from '@/src/enums';

export type ChildrenProps = { children: ReactNode };

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;

// ---

export type Role = AuthRoleEnum.Admin | AuthRoleEnum.User | '';

// --- Sessions:

export type Session = { updatedAt: Date; userId: string };

// --- Users:

export type User = {
  id: string;
  email: string;
  emailVerified: Date;
  // image: string | null;
  name: string;
  password: string;
  role: AuthRoleEnum;
  createdAt: Date;
  updatedAt: Date;
  sessions: { updatedAt: Date }[];
};

// --- Tokens:

export type Token = {
  id: number;
  name: string;
  pair: string;
  price: number;
  status: string;
  symbol: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TokenData = {
  status: string;
  tokens: Token[];
};

export type TokensRes = {
  data: TokenData;
};

// --- Orders:

export type Order = {
  id: number;
  type: string;
  symbol: string;
  amount: number;
  price: number;
  fiat: number;
  status: OrderStatusEnum;
  userId: string;
  target: number;
  exchange: ExchangeEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderData = {
  data: Order[];
};

export type StrategyOrders = {
  buy: Order[];
  sell: Order[];
};

/*
export type OrdersRes = {
  data: OrderData;
};
*/

export type AggregatedOrderListAcc = {
  symbol: string;
  totalAmount: number;
  totalFiat: number;
  orders: number;
  percent: number;
  orderDate: string;
};
