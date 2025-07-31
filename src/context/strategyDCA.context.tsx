/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import useGlobalState from '@/src/hooks/useGlobalState';
import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
import * as enm from '@/src/enums';
import * as t from '@/src/types';
import * as u from '@/src/utils';
import { usePathname } from 'next/navigation';

type DCAPCurrentState = t.CurrentValues | null;
type DCAPTradeState = t.TradeValues | null;

export type StrategyDCAContext = {
  currentDCAP: DCAPCurrentState;
  buyDCAP: DCAPTradeState;
  sellDCAP: DCAPTradeState;
  getSpecStatus: (symbol: string, orders: t.Order[]) => string;
  getStatus: () => string;
};

const c = {
  symbolBTC: 'BTC',
  symbolETH: 'ETH',
  stopLoss: 'stop-loss',
  buy: 'buy',
  sell: 'sell',
};

// --- Context

const initContext: StrategyDCAContext = {
  currentDCAP: null,
  buyDCAP: null,
  sellDCAP: null,
  getSpecStatus: () => '',
  getStatus: () => '',
};

const StrategyDCAContext = createContext<StrategyDCAContext>(initContext);

export const StrategyDCAProvider = ({ children }: t.ChildrenProps & {}) => {
  const [currentDCAP, setCurrentDCAP] = useState<DCAPCurrentState>(null);
  const [buyDCAP, setBuyDCAP] = useState<DCAPTradeState>(null);
  const [sellDCAP, setSellDCAP] = useState<DCAPTradeState>(null);

  const { updatedTokens } = useGlobalState();
  const { data: session } = useSession();
  const pathname = usePathname();

  const userId = session?.user?.id || null;
  const type = enm.OrderTypeEnum.Buy;
  const isBTCStrategyPage = pathname.includes(`/BUY-${c.symbolBTC}`);
  const isETHStrategyPage = pathname.includes(`/BUY-${c.symbolETH}`);
  const curDCAPSymbol = isBTCStrategyPage
    ? c.symbolBTC
    : isETHStrategyPage
    ? c.symbolETH
    : '';

  const tokenDCAP = updatedTokens?.find((el) => el?.symbol === curDCAPSymbol);

  const { userOrderData: orderData } = useFetchAllUserStrategyOrders(
    userId,
    type,
    curDCAPSymbol,
    enm.OrderStatusEnum.Active,
    '', // ExchangeEnum
    { enabled: !!userId }
  );

  // ---

  useEffect(() => {
    if (!orderData) return;
    handleDCAPValues(orderData.orders);
  }, [orderData, tokenDCAP]);

  const handleDCAPValues = (orders: t.Order[]) => {
    if (orders.length && tokenDCAP) {
      const avg = u.calculateAVGPrice(orders);
      const ordersDCAP = orders.filter((el) => el.symbol === curDCAPSymbol);
      if (ordersDCAP) {
        const totalAmount = ordersDCAP.reduce((acc: number, order: t.Order) => {
          acc += order.amount;
          return acc;
        }, 0);
        const curValues = getCurrentValues(avg);
        const buyValues = getBuyValues(orders);
        const sellValues = getSellValues(totalAmount, avg);
        if (curValues && buyValues && sellValues) {
          setCurrentDCAP({
            avg: Number(u.numberCutter(avg, 0)),
            percent: Number(u.numberCutter(curValues.percent)),
            stopLoss: Number(curValues.stopLoss),
          });
          setBuyDCAP({
            amount: buyValues.buyAmount.toFixed(6),
            price: u.numberCutter(buyValues.buyPrice, 0),
            isActive: tokenDCAP.price <= buyValues.buyPrice,
          });
          setSellDCAP({
            amount: sellValues.sellAmount.toFixed(6),
            price: u.numberCutter(sellValues.sellPrice, 0),
            isActive: tokenDCAP.price >= sellValues.sellPrice,
          });
        }
      }
    }
  };

  const getCurrentValues = (avg: number) => {
    if (!tokenDCAP) return;
    const percent = ((tokenDCAP.price - avg) / avg) * 100;
    const fivePercentAVG = avg * 0.05;
    const stopLoss = u.numberCutter(avg - fivePercentAVG, 0);
    return { percent, stopLoss };
  };

  const getBuyValues = (orders: t.Order[]) => {
    const lowestPriceOrder = orders?.reduce((acc, order) =>
      order.price < acc.price ? order : acc
    );
    const lowestPrice = lowestPriceOrder.price;
    const lowestPriceAmount = lowestPriceOrder.amount;
    const twoPercentLow = lowestPrice * 0.02;
    const buyPrice = lowestPrice - twoPercentLow;
    const buyAmount = lowestPriceAmount * 1.2;
    return { buyPrice, buyAmount };
  };

  const getSellValues = (totalAmount: number, avg: number) => {
    const fourPercentAVG = avg * 0.04;
    const sellPrice = avg + fourPercentAVG;
    const sellAmount = totalAmount;
    return { sellPrice, sellAmount };
  };

  const getStatus = () => {
    if (!tokenDCAP || !currentDCAP || !buyDCAP || !sellDCAP) return '';
    const status =
      tokenDCAP.price < currentDCAP.stopLoss
        ? c.stopLoss
        : buyDCAP.isActive
        ? c.buy
        : sellDCAP.isActive
        ? c.sell
        : '';
    return status;
  };

  const getSpecStatus = (symbol: string, orders: t.Order[]) => {
    let status = '';
    if (!symbol || !orders) return '';
    const token = updatedTokens?.find((el) => el?.symbol === symbol);
    const _orders = orders.filter((order) => order.symbol === symbol);
    if (token && _orders.length) {
      const avg = u.calculateAVGPrice(_orders);
      const totalAmount = _orders.reduce((acc: number, order: t.Order) => {
        acc += order.amount;
        return acc;
      }, 0);
      const curValues = getCurrentValues(avg);
      const buyValues = getBuyValues(orders);
      const sellValues = getSellValues(totalAmount, avg);
      if (!token || !curValues || !buyValues || !sellValues) return '';
      status =
        token.price < +curValues.stopLoss
          ? c.stopLoss
          : token.price <= buyValues.buyPrice
          ? c.buy
          : token.price >= sellValues.sellPrice
          ? c.sell
          : '';
    }
    return status;
  };

  const values = useMemo(() => {
    return {
      currentDCAP,
      buyDCAP,
      sellDCAP,
      getSpecStatus,
      getStatus,
    };
  }, [currentDCAP, buyDCAP, sellDCAP]);

  return (
    <StrategyDCAContext.Provider value={values}>
      {children}
    </StrategyDCAContext.Provider>
  );
};

export default StrategyDCAContext;
