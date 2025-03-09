import { ReactNode } from 'react';
import { AuthRoleEnum, OrderStatusEnum } from '@/src/enums';

export type ChildrenProps = { children: ReactNode };

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;

// ---

export type Role = AuthRoleEnum.Admin | AuthRoleEnum.User | '';

// --- Tokens:

export type User = {
  createdAt: Date;
  email: string;
  emailVerified: Date;
  id: string;
  image: string | null;
  name: string;
  password: string;
  role: AuthRoleEnum;
  updatedAt: Date;
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
