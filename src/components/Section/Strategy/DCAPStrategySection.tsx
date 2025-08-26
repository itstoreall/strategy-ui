/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useModal from '@/src/hooks/useModal';
import * as enm from '@/src/enums';
import { OrderStrategyData, StrategySnapshot, Token } from '@/src/types';
import TradeStrategyDCAPSection from '@/src/components/Section/Strategy/TradeStrategyDCAPSection';
import StrategyOrderListSection from '@/src/components/Section/StrategyOrderListSection';
import StrategySnapshotSection from '@/src/components/Section/StrategySnapshotSection';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import { SortedOrders } from '@/src/components/Pages/Strategy';
import ListLoader from '@/src/components/ListLoader';
import ClosePriceForm from '../../Form/Order/ClosePriceForm';

type Props = {
  userId: string;
  symbol: string;
  type: string;
  token: Token;
  currentPrice: number;
  avgBuyPrice: number;
  filterExchange: enm.ExchangeEnum;
  updatedTokens: Token[] | null;
  userOrderData: OrderStrategyData;
  sortedOrders: SortedOrders;
  exchanges: enm.ExchangeEnum[];
  snapshot: StrategySnapshot;
  isEditMenu: boolean;
  handleFilterExchange: (val: enm.ExchangeEnum) => void;
  setIsEditMenu: Dispatch<SetStateAction<boolean>>;
};

const c = {
  dividerTitle: 'Orders',
  loading: 'Loading',
};

const DCAPStrategySection = (props: Props) => {
  const [closePrice, setClosePrice] = useState<string | null>(null);
  const [isClosePrice, setIsClosePrice] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const {
    userId,
    symbol,
    type,
    token,
    currentPrice,
    avgBuyPrice,
    filterExchange,
    updatedTokens,
    userOrderData,
    sortedOrders,
    exchanges,
    snapshot,
    isEditMenu,
    handleFilterExchange,
    setIsEditMenu,
  } = props;

  const { RenderModal, isFormModal } = useModal();

  useEffect(() => {
    if (!isFormModal && isClosePrice) {
      setIsClosePrice(false);
    }
  }, [isFormModal]);

  // const isBTC = token.symbol === 'BTC';
  // const isETH = token.symbol === 'ETH';

  const openClosePriceModal = () => {
    setClosePrice(token.price.toString());
    setIsClosePrice(true);
  };

  const handleClosePrice = (price: string) => {
    let value = price.replace(/,/g, '.');
    if (/^\d*\.?\d*$/.test(value)) {
      if (value.startsWith('.')) {
        value = `0${value}`;
      }
      setClosePrice(value);
    } else {
      setClosePrice(value.slice(0, -1));
    }
  };

  const confirmCloseOrdersSubmit = () => setIsSubmit(true);

  // no scss styles!
  return (
    <section>
      <div className="main-content">
        <SectionsContainer>
          <StrategySnapshotSection
            // isBTC={isBTC}
            // isETH={isETH}
            isDCAP={true}
            orderNumber={sortedOrders?.length ?? 0}
            totalAmount={snapshot.totalAmount}
            positiveOrders={snapshot.positiveOrders}
            successOrders={snapshot.successOrders}
            depositAmount={snapshot.deposit}
            total={snapshot.profit}
          />

          {userId && token && userOrderData && (
            <TradeStrategyDCAPSection
              userId={userId}
              token={token}
              snapshot={snapshot}
              orderData={userOrderData}
              closePrice={closePrice}
              isSubmit={isSubmit}
              openClosePriceModal={openClosePriceModal}
              // exchanges={exchanges}
            />
          )}

          {updatedTokens ? (
            <>
              <MainDividerSection
                className="order-list-devider"
                title={c.dividerTitle}
                avgBuyPrice={avgBuyPrice}
                exchanges={exchanges}
                filterExchange={filterExchange}
                currentPrice={currentPrice}
                ordersNumber={sortedOrders?.length}
                handleFilterExchange={handleFilterExchange}
                isSwitchButton={!!sortedOrders?.length}
                isDisabled={!isEditMenu}
                setIsDisabled={setIsEditMenu}
              />

              <div className="sections-container-strategy-order-list-block">
                <StrategyOrderListSection
                  sortedOrders={sortedOrders ?? []}
                  strategy={userOrderData.strategy}
                  filterExchange={filterExchange}
                  currentPrice={currentPrice}
                  isEditMenu={isEditMenu}
                  handleFilterExchange={handleFilterExchange}
                />
              </div>
            </>
          ) : (
            <ListLoader text={c.loading} />
          )}
        </SectionsContainer>
      </div>

      {updatedTokens && isFormModal && !isClosePrice && (
        <RenderModal>
          <AddOrderForm
            tokens={updatedTokens}
            initType={
              type === enm.OrderTypeEnum.Buy
                ? enm.OrderTypeDisplayEnum.Asset
                : enm.OrderTypeDisplayEnum.BuyTarget
            }
            initSymbol={symbol}
            invalidateQuery={[
              enm.QueryKeyEnum.UserOrders,
              enm.QueryKeyEnum.UserStrategyOrders,
            ]}
          />
        </RenderModal>
      )}

      {isClosePrice && (
        <RenderModal>
          <ClosePriceForm
            closePrice={closePrice || ''}
            isSubmit={isSubmit}
            handleClosePrice={handleClosePrice}
            confirmCloseOrdersSubmit={confirmCloseOrdersSubmit}
            // setIsSubmit={setIsSubmit}
          />
        </RenderModal>
      )}
    </section>
  );
};

export default DCAPStrategySection;
