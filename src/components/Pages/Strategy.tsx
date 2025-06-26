'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
import useGlobalState from '@/src/hooks/useGlobalState';
import useModal from '@/src/hooks/useModal';
import * as enm from '@/src/enums';
import * as t from '@/src/types';
import * as u from '@/src/utils';
import GradientProgressLoader from '@/src/assets/animation/GradientProgressLoader';
import DCAPlusStrategySection from '@/src/components/Section/Strategy/DCAPlusStrategySection';
import DCAStrategySection from '@/src/components/Section/Strategy/DCAStrategySection';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import PageContainer, { Label } from '@/src/components/Container/Page';
import MainLoader from '@/src/components/MainLoader';

export type Snapshot = {
  totalAmount: number;
  positiveOrders: number;
  successOrders: number | null;
  deposit: number;
  profit: number | null;
};

type SortedOrder = {
  percent: number;
  priority: number;
  id: number;
  type: string;
  symbol: string;
  amount: number;
  price: number;
  fiat: number;
  status: enm.OrderStatusEnum;
  userId: string;
  strategy: {
    target: number;
    data: JSON;
  };
  exchange: enm.ExchangeEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type SortedOrders = SortedOrder[] | null;

const c = {
  lsTakeProfitKey: 'takeProfit',
};

const { OrderStatusEnum, OrderTypeEnum, ExchangeEnum } = enm;

const Strategy = () => {
  const [filterExchange, setFilterExchange] = useState(enm.ExchangeEnum.All);
  const [isTakeProfit, setIsTakeProfit] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [avgBuyPrice, setAvgBuyPrice] = useState(0);
  const [isEditMenu, setIsEditMenu] = useState(false);

  const { updatedTokens } = useGlobalState();
  const { data: session } = useSession();
  const pathname = usePathname();

  const userId = session?.user?.id || null;
  const path = pathname.split('/')[2];
  const type = path.split('-')[0];
  const symbol = path.split('-')[1];
  const token = updatedTokens?.find((token) => token?.symbol === symbol);

  const { openModal, ModalContentEnum } = useModal();

  const { userOrderData } = useFetchAllUserStrategyOrders(
    userId,
    type,
    symbol,
    OrderStatusEnum.Active,
    '', // ExchangeEnum
    { enabled: !!userId }
  );

  /*
  useEffect(() => {
    if (!userOrderData) {
      console.log('->', userOrderData);
    }
  }, [userOrderData]);
  // */

  // ---

  const exchanges: enm.ExchangeEnum[] = [ExchangeEnum.All];
  const snapshot: Snapshot = {
    totalAmount: 0,
    positiveOrders: 0,
    successOrders: null,
    deposit: 0,
    profit: null,
  };

  // ---

  useLayoutEffect(() => {
    const takeProfit = localStorage.getItem(c.lsTakeProfitKey) === 'true';
    setIsTakeProfit(takeProfit);
  }, []);

  useEffect(() => {
    if (!updatedTokens || !userOrderData) return;
    const price = (token ?? { price: 0 }).price;
    setCurrentPrice(price);
    handleAVG(userOrderData.orders);
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

  // --

  const handleFilterExchange = (val: enm.ExchangeEnum) => {
    setFilterExchange(val);
  };

  const handleModal = () => {
    openModal(ModalContentEnum.Form);
  };

  const handleAVG = (orders: t.Order[]) => {
    const averagePrice = u.calculateAVGPrice(orders);
    setAvgBuyPrice(averagePrice);
  };

  const classifyOrder = (percent: number, strategy: t.Strategy) => {
    if (userOrderData && percent >= userOrderData.strategy.target)
      return { priority: 0 };

    if (percent >= 0 && percent < strategy.target) return { priority: 1 };
    if (percent <= 0 && percent > -50) return { priority: 2 };
    if (percent <= -50) return { priority: 3 };
    return { priority: 4 };
  };

  const classifiedOrders: SortedOrder[] | null = userOrderData?.orders
    ? userOrderData?.orders?.map((order) => {
        const percent = ((currentPrice - order.price) / order.price) * 100;
        if (!exchanges.includes(order.exchange)) {
          exchanges.push(order.exchange);
        }

        const calculateSnapshotValues = (order: t.Order, percent: number) => {
          snapshot.totalAmount += order.amount;
          snapshot.deposit += order.fiat;
          if (!percent.toString().includes('-')) {
            if (snapshot.profit === null) {
              snapshot.profit = 0 + order.amount * currentPrice;
            } else {
              snapshot.profit += order.amount * currentPrice;
            }
            if (percent >= userOrderData.strategy.target) {
              if (snapshot.successOrders === null) {
                snapshot.successOrders = 1;
              } else {
                snapshot.successOrders += 1;
              }
            }
            if (snapshot.positiveOrders === null) {
              snapshot.positiveOrders = 1;
            } else {
              snapshot.positiveOrders += 1;
            }
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

  // ---

  const mainButtonText =
    type === OrderTypeEnum.Buy ? heading.c.addAsset : heading.c.addTarget;

  return (
    <PageContainer label={Label.Main}>
      {updatedTokens && (
        <GradientProgressLoader
          trigger={
            updatedTokens.find((token) => token.symbol === 'BTC')?.price ?? 0
          }
        />
      )}

      <main className="main">
        <PageHeading
          title={symbol}
          assetPrice={currentPrice}
          mainButtonText={mainButtonText}
          handleModal={handleModal}
          isButtonDisabled={!updatedTokens}
        />

        {userId && token && userOrderData?.orders && sortedOrders ? (
          symbol === 'BTC' ? (
            <DCAPlusStrategySection
              userId={userId}
              symbol={symbol}
              type={type}
              token={token}
              currentPrice={currentPrice}
              avgBuyPrice={avgBuyPrice}
              filterExchange={filterExchange}
              updatedTokens={updatedTokens}
              userOrderData={userOrderData}
              sortedOrders={sortedOrders}
              exchanges={exchanges}
              snapshot={snapshot}
              isTakeProfit={isTakeProfit}
              isEditMenu={isEditMenu}
              handleFilterExchange={handleFilterExchange}
              setIsEditMenu={setIsEditMenu}
            />
          ) : (
            <DCAStrategySection
              userId={userId}
              symbol={symbol}
              type={type}
              token={token}
              currentPrice={currentPrice}
              avgBuyPrice={avgBuyPrice}
              filterExchange={filterExchange}
              updatedTokens={updatedTokens}
              userOrderData={userOrderData}
              sortedOrders={sortedOrders}
              exchanges={exchanges}
              snapshot={snapshot}
              isTakeProfit={isTakeProfit}
              isEditMenu={isEditMenu}
              handleFilterExchange={handleFilterExchange}
              setIsEditMenu={setIsEditMenu}
            />
          )
        ) : (
          <MainLoader />
        )}
      </main>
    </PageContainer>
  );
};

export default Strategy;
