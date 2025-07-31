/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
import useGlobalState from '@/src/hooks/useGlobalState';
import * as enm from '@/src/enums';
import * as t from '@/src/types';
import * as u from '@/src/utils';

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
        const curValues = u.getCurrentValues(tokenDCAP.price, avg);
        const buyValues = u.getBuyValues(orders);
        const sellValues = u.getSellValues(totalAmount, avg);
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

  const getStatus = () => {
    if (!tokenDCAP || !currentDCAP || !buyDCAP || !sellDCAP) return '';
    return u.handleDCAPStatus(
      tokenDCAP.price,
      currentDCAP.stopLoss,
      buyDCAP.isActive,
      sellDCAP.isActive
    );
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
