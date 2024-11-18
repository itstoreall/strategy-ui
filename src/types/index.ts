import { ReactNode } from 'react';

export type ChildrenProps = { children: ReactNode };

export type FormEvent = React.FormEvent<HTMLFormElement>;

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
