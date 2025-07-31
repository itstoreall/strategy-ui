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
  const isBTC = pathname.includes(`-${c.symbolBTC}`);
  // const isETH = pathname.includes(`-${c.symbolETH}`);
  const curDCAPSymbol = isBTC ? c.symbolBTC : c.symbolETH;

  const tokenDCAP = updatedTokens?.find(
    (el) => el?.symbol === curDCAPSymbol
    // (el) => el?.symbol === (isBTC ? c.symbolBTC : isETH && c.symbolETH)
  );
  // const tokenETH = updatedTokens?.find((el) => el?.symbol === c.symbolETH);

  const { userOrderData: orderData } = useFetchAllUserStrategyOrders(
    userId,
    type,
    // c.symbolBTC,
    curDCAPSymbol,
    enm.OrderStatusEnum.Active,
    '', // ExchangeEnum
    { enabled: !!userId }
  );

  // ---

  useEffect(() => {
    if (!orderData) return;
    if (orderData.orders.length && tokenDCAP) {
      const { orders } = orderData;
      const avg = u.calculateAVGPrice(orders);
      const orderDCAP = orders.filter((el) => el.symbol === curDCAPSymbol);
      // const orderBTC = orders.filter((el) => el.symbol === c.symbolBTC);
      if (orderDCAP) {
        const totalAmount = orderDCAP.reduce((acc: number, order: t.Order) => {
          acc += order.amount;
          return acc;
        }, 0);
        handleCurrentValues(avg);
        handleBuyValues(orders, tokenDCAP.price);
        handleSellValues(totalAmount, avg, tokenDCAP.price);
      }
    }
  }, [orderData, tokenDCAP]);

  const handleCurrentValues = (avg: number) => {
    if (!tokenDCAP) return;
    const percent = ((tokenDCAP.price - avg) / avg) * 100;
    const fivePercentAVG = avg * 0.05;
    const stopLoss = u.numberCutter(avg - fivePercentAVG, 0);
    setCurrentDCAP({
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
    setBuyDCAP({
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
    setSellDCAP({
      amount: sellAmount.toFixed(6),
      price: u.numberCutter(sellPrice, 0),
      isActive: currentPrice >= sellPrice,
    });
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

  const values = useMemo(() => {
    return {
      currentDCAP,
      buyDCAP,
      sellDCAP,
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
