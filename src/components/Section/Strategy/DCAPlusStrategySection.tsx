import { Dispatch, SetStateAction } from 'react';
import useModal from '@/src/hooks/useModal';
import * as enm from '@/src/enums';
import { OrderStrategyData, StrategySnapshot, Token } from '@/src/types';
import TradeStrategySection from '@/src/components/Section/Strategy/TradeStrategySection';
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

  const twoPercent = (lowestPrice as number) * 0.02;
  const buyPrice = (lowestPrice as number) - twoPercent;
  const buyAmount = (lowestPriceAmount as number) * 1.2;

  console.log(' ');
  console.log('lowestPrice:', lowestPrice);
  console.log('lowestPriceAmount:', lowestPriceAmount);
  console.log('2%:', twoPercent.toFixed());

  console.log('price:', buyPrice.toFixed());
  console.log('amount:', buyAmount.toFixed(6));
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
            <TradeStrategySection
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
