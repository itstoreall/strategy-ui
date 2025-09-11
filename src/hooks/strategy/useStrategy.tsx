/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
import useGlobalState from '@/src/hooks/useGlobalState';
import { ExchangeEnum, OrderStatusEnum } from '@/src/enums';
import * as t from '@/src/types';
import * as u from '@/src/utils';

const useStrategy = () => {
  const [filterExchange, setFilterExchange] = useState(ExchangeEnum.All);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [avgBuyPrice, setAvgBuyPrice] = useState(0);

  const { updatedTokens } = useGlobalState();
  const { data: session } = useSession();
  const pathname = usePathname();

  const userId = session?.user?.id || null;
  const path = pathname.split('/')[2];
  const type = path.split('-')[0];
  const symbol = path.split('-')[1];
  const token = updatedTokens?.find((token) => token?.symbol === symbol);

  const { userOrderData } = useFetchAllUserStrategyOrders(
    userId,
    type,
    symbol,
    OrderStatusEnum.Active,
    '', // ExchangeEnum
    { enabled: !!userId }
  );

  // const isBTC = userOrderData?.orders[0]?.symbol === 'BTC';
  // const isETH = userOrderData?.orders[0]?.symbol === 'ETH';
  const isDCAP = u.checkDCAP(userOrderData?.orders[0]?.symbol ?? '');

  const exchanges: ExchangeEnum[] = [ExchangeEnum.All];
  const strategySnapshot: t.StrategySnapshot = {
    totalAmount: 0,
    positiveOrders: 0,
    successOrders: null,
    deposit: 0,
    profit: null,
  };

  // ---

  useEffect(() => {
    if (!updatedTokens || !userOrderData) return;
    const price = (token ?? { price: 0 }).price;
    setCurrentPrice(price);
    handleAVG(userOrderData.orders);
    handleFilterExchange(ExchangeEnum.All);
  }, [updatedTokens, userOrderData?.orders]);

  // AVG handling in accordance with the Exchange
  useEffect(() => {
    if (!userOrderData?.orders) return;
    const filteredOrders =
      filterExchange !== ExchangeEnum.All
        ? userOrderData.orders?.filter(
            (order) => order.exchange === filterExchange
          )
        : userOrderData.orders;
    handleAVG(filteredOrders);
  }, [filterExchange]);

  // ---

  const handleFilterExchange = (val: ExchangeEnum) => {
    console.log('handleFilterExchange val:', val);
    setFilterExchange(val);
  };

  const handleAVG = (orders: t.Order[]) => {
    const averagePrice = u.calculateAVGPrice(orders);
    setAvgBuyPrice(averagePrice);
  };

  const updateTotalProfit = (order: t.Order) => {
    if (strategySnapshot.profit === null) {
      strategySnapshot.profit = 0 + order.amount * currentPrice;
    } else {
      strategySnapshot.profit += order.amount * currentPrice;
    }
  };

  const classifyOrder = (percent: number, strategy: t.Strategy) => {
    if (userOrderData && percent >= userOrderData.strategy.target)
      return { priority: 0 };

    if (percent >= 0 && percent < strategy.target) return { priority: 1 };
    if (percent <= 0 && percent > -50) return { priority: 2 };
    if (percent <= -50) return { priority: 3 };
    return { priority: 4 };
  };

  const classifiedOrders: t.SortedOrder[] | null = userOrderData?.orders
    ? userOrderData?.orders?.map((order) => {
        const percent = ((currentPrice - order.price) / order.price) * 100;
        if (!exchanges.includes(order.exchange)) {
          exchanges.push(order.exchange);
        }

        const calculateSnapshotValues = (order: t.Order, percent: number) => {
          strategySnapshot.totalAmount += order.amount;
          strategySnapshot.deposit += order.fiat;
          if (!percent.toString().includes('-') && !isDCAP) {
            updateTotalProfit(order);
            /*
            if (strategySnapshot.profit === null) {
              strategySnapshot.profit = 0 + order.amount * currentPrice;
            } else {
              strategySnapshot.profit += order.amount * currentPrice;
            }
            */
            if (percent >= userOrderData.strategy.target) {
              if (strategySnapshot.successOrders === null) {
                strategySnapshot.successOrders = 1;
              } else {
                strategySnapshot.successOrders += 1;
              }
            }
            if (strategySnapshot.positiveOrders === null) {
              strategySnapshot.positiveOrders = 1;
            } else {
              strategySnapshot.positiveOrders += 1;
            }
          } else if (isDCAP) {
            updateTotalProfit(order);
            /*
            if (strategySnapshot.profit === null) {
              strategySnapshot.profit = 0 + order.amount * currentPrice;
            } else {
              strategySnapshot.profit += order.amount * currentPrice;
            }
            */
          }
        };

        if (order.exchange === filterExchange) {
          calculateSnapshotValues(order, percent);
        } else if (filterExchange === ExchangeEnum.All) {
          calculateSnapshotValues(order, percent);
        }

        const { priority } = classifyOrder(percent, userOrderData.strategy);
        return { ...order, percent, priority };
      })
    : null;

  const sortedOrders = classifiedOrders?.sort((a, b) => {
    if (a.priority === b.priority) {
      return b.percent - a.percent;
    } else return a.priority - b.priority;
  });

  console.log('filterExchange:', filterExchange);

  return {
    userId,
    type,
    symbol,
    currentPrice,
    avgBuyPrice,
    token,
    strategySnapshot,
    filterExchange,
    exchanges,
    updatedTokens,
    userOrderData,
    sortedOrders,
    handleFilterExchange,
  };
};

export default useStrategy;
