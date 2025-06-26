'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useState } from 'react';
import useStrategy from '@/src/hooks/strategy/useStrategy';
import useModal from '@/src/hooks/useModal';
import { SortedOrder } from '@/src/types';
import * as enm from '@/src/enums';
import GradientProgressLoader from '@/src/assets/animation/GradientProgressLoader';
import DCAPlusStrategySection from '@/src/components/Section/Strategy/DCAPlusStrategySection';
import DCAStrategySection from '@/src/components/Section/Strategy/DCAStrategySection';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import PageContainer, { Label } from '@/src/components/Container/Page';
import MainLoader from '@/src/components/MainLoader';

export type SortedOrders = SortedOrder[] | null;

const c = {
  lsTakeProfitKey: 'takeProfit',
};

const { OrderTypeEnum } = enm;

const Strategy = () => {
  const [isTakeProfit, setIsTakeProfit] = useState(false);
  const [isEditMenu, setIsEditMenu] = useState(false);

  const {
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
  } = useStrategy();

  const { openModal, ModalContentEnum } = useModal();

  // ---

  useLayoutEffect(() => {
    const takeProfit = localStorage.getItem(c.lsTakeProfitKey) === 'true';
    setIsTakeProfit(takeProfit);
  }, []);

  const handleModal = () => {
    openModal(ModalContentEnum.Form);
  };

  // ---

  const mainButtonText =
    type === OrderTypeEnum.Buy ? heading.c.addAsset : heading.c.addTarget;

  const progressTrigger =
    updatedTokens?.find((token) => token.symbol === 'BTC')?.price ?? 0;

  return (
    <PageContainer label={Label.Main}>
      {updatedTokens && <GradientProgressLoader trigger={progressTrigger} />}

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
              snapshot={strategySnapshot}
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
              snapshot={strategySnapshot}
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
