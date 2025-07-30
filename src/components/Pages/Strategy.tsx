'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from 'react';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
import useStrategy from '@/src/hooks/strategy/useStrategy';
import useModal from '@/src/hooks/useModal';
import * as enm from '@/src/enums';
import * as t from '@/src/types';
import * as confirmMsg from '@/src/messages/confirm';
import GradientProgressLoader from '@/src/assets/animation/GradientProgressLoader';
import StrategyHistoryModalSection from '@/src/components/Section/StrategyHistoryModalSection';
import DCAPStrategySection from '@/src/components/Section/Strategy/DCAPStrategySection';
import DCAStrategySection from '@/src/components/Section/Strategy/DCAStrategySection';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import PageContainer, { Label } from '@/src/components/Container/Page';
import MainLoader from '@/src/components/MainLoader';

export type SortedOrders = t.SortedOrder[] | null;

const c = {
  lsTakeProfitKey: 'takeProfit',
  triggerSymbol: 'BTC',
};

const { OrderTypeEnum } = enm;

const Strategy = () => {
  const [isTakeProfit, setIsTakeProfit] = useState(false);
  const [isEditMenu, setIsEditMenu] = useState(false);

  const { mutate: updStg, isSuccess: isSuccessUpdStg } = useUpdateStrategy();

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

  const {
    RenderModal,
    openModal,
    // isFormModal,
    isStrategyHistoryModal,
    // isStrategyModal,
    // closeModal,
    // ModalContentEnum,
  } = useModal();

  const isBTC = symbol === 'BTC';
  const isETH = symbol === 'ETH';

  // ---

  useLayoutEffect(() => {
    const takeProfit = localStorage.getItem(c.lsTakeProfitKey) === 'true';
    setIsTakeProfit(takeProfit);
  }, []);

  useEffect(() => {
    if (isSuccessUpdStg) {
      console.log('isSuccessUpdStg:', isSuccessUpdStg);
    }
  }, [isSuccessUpdStg]);

  // ---

  const deleteTradeHistoryElement = (tradeId: number) => {
    const isDelete = confirm(confirmMsg.deleteTradeHistoryElement(tradeId));
    if (!userOrderData || !isDelete) return;
    const strategyData = JSON.parse(userOrderData.strategy.data);
    const updatedHistory = strategyData.history.filter(
      (el: t.HistoryEntry) => el.d !== tradeId
    );
    const newStrategyData = {
      ...strategyData,
      history: updatedHistory,
    };
    updStg({
      strategyId: userOrderData.strategy.id,
      newStrategyData,
      // newStrategyData: null,
    });
  };

  // ---

  const mainButtonText =
    type === OrderTypeEnum.Buy ? heading.c.addAsset : heading.c.addTarget;

  const progressTrigger =
    updatedTokens?.find((t) => t.symbol === c.triggerSymbol)?.price ?? 0;

  return (
    <PageContainer label={Label.Main}>
      {updatedTokens && <GradientProgressLoader trigger={progressTrigger} />}

      <main className="main">
        <PageHeading
          title={symbol}
          assetPrice={currentPrice}
          mainButtonText={mainButtonText}
          handleModal={(cont) => openModal(cont)}
          // handleModal={handleModal}
          isDCAP={(isBTC || isETH) && !!userOrderData?.strategy.data}
          isButtonDisabled={!updatedTokens}
        />

        {userId && token && userOrderData?.orders && sortedOrders ? (
          isBTC || isETH ? (
            <DCAPStrategySection
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

        {isStrategyHistoryModal && userOrderData && (
          <RenderModal>
            <StrategyHistoryModalSection
              strategyData={userOrderData.strategy.data}
              deleteTradeHistoryElement={deleteTradeHistoryElement}
            />
          </RenderModal>
        )}
      </main>
    </PageContainer>
  );
};

export default Strategy;
