import { ReactNode } from 'react';
import { OrderStatusEnum } from '../enums';

export type ChildrenProps = { children: ReactNode };

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;

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
  createdAt: Date;
  updatedAt: Date;
};

export type OrderData = {
  data: Order[];
};

// export type OrdersRes = {
//   data: OrderData;
// };
