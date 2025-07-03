/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import * as t from '@/src/types';
import * as u from '@/src/utils';

type Props = {
  snapshot: t.StrategySnapshot;
  orderData: t.OrderStrategyData;
  token: t.Token;
};

type CurrentValues = {
  avg: number;
  percent: number;
  stopLoss: number;
};

type TradeValues = {
  amount: string;
  price: string;
  isActive: boolean;
};

const useTradeStrategyDCAPlus = ({ snapshot, orderData, token }: Props) => {
  const [current, setCurrent] = useState<CurrentValues | null>(null);
  const [buy, setBuy] = useState<TradeValues | null>(null);
  const [sell, setSell] = useState<TradeValues | null>(null);

  useEffect(() => {
    if (snapshot && orderData && token) {
      const avg = u.calculateAVGPrice(orderData.orders);
      handleCurrentValues(avg);
      handleBuyValues(orderData.orders, token.price);
      handleSellValues(snapshot, avg, token.price);
    }
  }, [snapshot, orderData, token]);

  const handleCurrentValues = (avg: number) => {
    const percent = ((token.price - avg) / avg) * 100;
    const fivePercentAVG = avg * 0.05;
    const stopLoss = u.numberCutter(avg - fivePercentAVG, 0);
    setCurrent({
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
    setBuy({
      amount: buyAmount.toFixed(6),
      price: u.numberCutter(buyPrice, 0),
      isActive: currentPrice <= buyPrice,
    });
  };

  const handleSellValues = (
    snapshot: t.StrategySnapshot,
    avg: number,
    currentPrice: number
  ) => {
    const fourPercentAVG = avg * 0.04;
    const sellPrice = avg + fourPercentAVG;
    const sellAmount = snapshot.totalAmount;
    setSell({
      amount: sellAmount.toFixed(6),
      price: u.numberCutter(sellPrice, 0),
      isActive: currentPrice >= sellPrice,
    });
  };

  return { currentValues: current, buyValues: buy, sellValues: sell };
};

export default useTradeStrategyDCAPlus;
