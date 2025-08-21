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

// --- Strategy

export type SortedOrder = {
  percent: number;
  priority: number;
  id: number;
  type: string;
  symbol: string;
  amount: number;
  price: number;
  fiat: number;
  status: OrderStatusEnum;
  userId: string;
  strategy: {
    target: number;
    data: JSON;
  };
  exchange: ExchangeEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type StrategySnapshot = {
  totalAmount: number;
  positiveOrders: number;
  successOrders: number | null;
  deposit: number;
  profit: number | null;
};

export type TradeStrategy = {
  date: number;
  symbol: string;
  exchange: ExchangeEnum;
  amount: number;
  avgBuyPrice: number;
  sellPrice: number;
  invested: number;
  total: number;
  profit: number;
  orders: string;
};

export type HistoryEntry = {
  d: number; // Date of the creation of the Entry
  // e: string; // exchange
  a: number; // amount
  b: number; // Buy Price
  s: number; // Sell Price
};

export type UpdatedSrategyData = {
  history?: HistoryEntry[];
  hodlTargets?: HodlTargetsEntry[];
};

// --- DCA

export type CurrentValues = {
  avg: number;
  percent: number;
  stopLoss: number;
};

export type TradeValues = {
  amount: string;
  price: string;
  isActive: boolean;
};

// export type TradeStrategy = {
//   symbol: string;
//   exchange: ExchangeEnum;
//   amount: string;
//   price: string;
//   invested: string;
//   total: string;
//   profit: string;
//   orders: string;
// };

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
  strategy: {
    target: number;
    data: JSON; // TradeStrategy
  };
  exchange: ExchangeEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderData = {
  data: Order[];
};

export type OrderStrategyData = {
  orders: Order[];
  strategy: Strategy;
};

export type Strategy = {
  symbol: string;
  id: number;
  type: string;
  status: OrderStatusEnum;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  target: number;
  data: string; // TradeStrategy
};

export type StrategyOrders = {
  DCAP: Order[];
  custom: Order[];
  buy: Order[];
  sell: Order[];
};

/*
export type OrdersRes = {
  data: OrderData;
};
*/

export type AggregatedOrderListAcc = {
  id: number;
  symbol: string;
  price: number;
  totalAmount: number;
  totalFiat: number;
  orders: number;
  percent: number;
  unrealized: number | null;
  orderDate: string;
};

// --- Hodl Targets

export type HodlTargets = {
  v25: number;
  v50: number;
  v75: number;
  v100: number;
};

export type HodlTargetsData = { symbol: string; hodlTargets: HodlTargets };

export type HodlTargetsEntry = {
  volume25: number;
  volume50: number;
  volume75: number;
  volume100: number;
};
