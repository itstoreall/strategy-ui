/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import useGlobalState from '@/src/hooks/useGlobalState';
import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
import * as enm from '@/src/enums';
import * as t from '@/src/types';
import * as u from '@/src/utils';

type DCAPlusCurrentState = t.CurrentValues | null;
type DCAPlusTradeState = t.TradeValues | null;

export type StrategyDCAContext = {
  currentBTC: DCAPlusCurrentState;
  buyBTC: DCAPlusTradeState;
  sellBTC: DCAPlusTradeState;
  getStatus: () => string;
};

const c = {
  symbolBTC: 'BTC',
  stopLoss: 'stop-loss',
  buy: 'buy',
  sell: 'sell',
};

// --- Context

const initContext: StrategyDCAContext = {
  currentBTC: null,
  buyBTC: null,
  sellBTC: null,
  getStatus: () => '',
};

const StrategyDCAContext = createContext<StrategyDCAContext>(initContext);

export const StrategyDCAProvider = ({ children }: t.ChildrenProps & {}) => {
  const [currentBTC, setCurrentBTC] = useState<DCAPlusCurrentState>(null);
  const [buyBTC, setBuyBTC] = useState<DCAPlusTradeState>(null);
  const [sellBTC, setSellBTC] = useState<DCAPlusTradeState>(null);
  // const [statusBTC, setStatusBTC] = useState<string>('');

  const { updatedTokens } = useGlobalState();
  const { data: session } = useSession();

  const userId = session?.user?.id || null;
  const type = enm.OrderTypeEnum.Buy;
  const tokenBTC = updatedTokens?.find((el) => el?.symbol === c.symbolBTC);

  const { userOrderData: orderData } = useFetchAllUserStrategyOrders(
    userId,
    type,
    c.symbolBTC,
    enm.OrderStatusEnum.Active,
    '', // ExchangeEnum
    { enabled: !!userId }
  );

  // ---

  useEffect(() => {
    if (!orderData) return;
    if (orderData.orders.length && tokenBTC) {
      const { orders } = orderData;
      const avg = u.calculateAVGPrice(orders);
      const orderBTC = orders.filter((el) => el.symbol === c.symbolBTC);
      if (orderBTC) {
        const totalAmount = orderBTC.reduce((acc: number, order: t.Order) => {
          acc += order.amount;
          return acc;
        }, 0);
        handleCurrentValues(avg);
        handleBuyValues(orders, tokenBTC.price);
        handleSellValues(totalAmount, avg, tokenBTC.price);
      }
    }
  }, [orderData, tokenBTC]);

  const handleCurrentValues = (avg: number) => {
    if (!tokenBTC) return;
    const percent = ((tokenBTC.price - avg) / avg) * 100;
    const fivePercentAVG = avg * 0.05;
    const stopLoss = u.numberCutter(avg - fivePercentAVG, 0);
    setCurrentBTC({
      avg: Number(u.numberCutter(avg, 0)),
      percent: Number(u.numberCutter(percent)),
      stopLoss: Number(stopLoss),
    });
  };

  const handleBuyValues = (orders: t.Order[], currentPrice: number) => {
    const lowestPriceOrder = orders?.reduce((acc, order) =>
      order.price < acc.price ? order : acc
    );
    const lowestPrice = lowestPriceOrder.price;
    const lowestPriceAmount = lowestPriceOrder.amount;
    const twoPercentLow = lowestPrice * 0.02;
    const buyPrice = lowestPrice - twoPercentLow;
    const buyAmount = lowestPriceAmount * 1.2;
    setBuyBTC({
      amount: buyAmount.toFixed(6),
      price: u.numberCutter(buyPrice, 0),
      isActive: currentPrice <= buyPrice,
    });
  };

  const handleSellValues = (
    totalAmount: number,
    avg: number,
    currentPrice: number
  ) => {
    const fourPercentAVG = avg * 0.04;
    const sellPrice = avg + fourPercentAVG;
    const sellAmount = totalAmount;
    setSellBTC({
      amount: sellAmount.toFixed(6),
      price: u.numberCutter(sellPrice, 0),
      isActive: currentPrice >= sellPrice,
    });
  };

  const getStatus = () => {
    if (!tokenBTC || !currentBTC || !buyBTC || !sellBTC) return '';
    const status =
      tokenBTC.price < currentBTC.stopLoss
        ? c.stopLoss
        : buyBTC.isActive
        ? c.buy
        : sellBTC.isActive
        ? c.sell
        : '';
    return status;
  };

  const values = useMemo(() => {
    return {
      currentBTC,
      buyBTC,
      sellBTC,
      getStatus,
    };
  }, [currentBTC, buyBTC, sellBTC]);

  return (
    <StrategyDCAContext.Provider value={values}>
      {children}
    </StrategyDCAContext.Provider>
  );
};

export default StrategyDCAContext;
