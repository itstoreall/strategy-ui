import { Dispatch, SetStateAction } from 'react';
import useModal from '@/src/hooks/useModal';
import * as enm from '@/src/enums';
// import { numberCutter } from '@/src/utils';
import { OrderStrategyData, StrategySnapshot, Token } from '@/src/types';
import TradeStrategyDCAPlusSection from '@/src/components/Section/Strategy/TradeStrategyDCAPlusSection';
import StrategyOrderListSection from '@/src/components/Section/StrategyOrderListSection';
import StrategySnapshotSection from '@/src/components/Section/StrategySnapshotSection';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import { SortedOrders } from '@/src/components/Pages/Strategy';
import ListLoader from '@/src/components/ListLoader';

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
  isTakeProfit: boolean;
  isEditMenu: boolean;
  handleFilterExchange: (val: enm.ExchangeEnum) => void;
  setIsEditMenu: Dispatch<SetStateAction<boolean>>;
};

const c = {
  dividerTitle: 'Orders',
  loading: 'Loading',
};

const DCAPlusStrategySection = (props: Props) => {
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
    isTakeProfit,
    isEditMenu,
    handleFilterExchange,
    setIsEditMenu,
  } = props;

  /*
  const lowestPriceOrder = sortedOrders?.reduce((acc, order) =>
    order.price < acc.price ? order : acc
  );
  const lowestPrice = lowestPriceOrder?.price;
  const lowestPriceAmount = lowestPriceOrder?.amount;

  const twoPercentLow = (lowestPrice as number) * 0.02;
  const buyPrice = (lowestPrice as number) - twoPercentLow;
  const buyAmount = (lowestPriceAmount as number) * 1.2;

  const fourPercentAVG = avgBuyPrice * 0.04;
  const sellPrice = (avgBuyPrice as number) + fourPercentAVG;
  const sellAmount = snapshot.totalAmount;

  const fivePercentAVG = avgBuyPrice * 0.05;
  const stopLoss = avgBuyPrice - fivePercentAVG;

  const buy = {
    amount: buyAmount.toFixed(6),
    price: numberCutter(buyPrice, 0),
    isBuyAllowed: currentPrice <= buyPrice,
  };

  const sell = {
    amount: sellAmount.toFixed(6),
    price: numberCutter(sellPrice, 0),
    isSellAllowed: currentPrice >= sellPrice,
  };

  const basic = {
    stopLoss: numberCutter(stopLoss, 0),
  };

  console.log(' ');
  console.log('buy:', buy);
  console.log('sell:', sell);
  console.log('basic:', basic);
  // */

  const { RenderModal, isFormModal } = useModal();

  // no scss styles!
  return (
    <section>
      <div className="main-content">
        <SectionsContainer>
          <StrategySnapshotSection
            /*
            sortedOrders={sortedOrders ?? null}
            */
            orderNumber={sortedOrders?.length ?? 0}
            totalAmount={snapshot.totalAmount}
            positiveOrders={snapshot.positiveOrders}
            successOrders={snapshot.successOrders}
            depositAmount={snapshot.deposit}
            profitAmount={snapshot.profit}
          />

          {userId && isTakeProfit && token && userOrderData && (
            <TradeStrategyDCAPlusSection
              userId={userId}
              token={token}
              orderData={userOrderData}
              filterExchange={filterExchange}
              handleFilterExchange={handleFilterExchange}
              // exchanges={exchanges}
            />
          )}

          {updatedTokens ? (
            <>
              <MainDividerSection
                className="order-list-devider"
                title={c.dividerTitle}
                /*
                subTitle={calculateStrategyPercent()}
                */
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

      {updatedTokens && isFormModal && (
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
    </section>
  );
};

export default DCAPlusStrategySection;
