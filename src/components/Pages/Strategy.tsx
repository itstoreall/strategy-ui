'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
/*
import useTxn from '@/src/hooks/useTxn';
import useUpdateStrategy from '@/src/hooks/strategy/useUpdateStrategy';
// */
import useGlobalState from '@/src/hooks/useGlobalState';
import useModal from '@/src/hooks/useModal';
import * as enm from '@/src/enums';
import * as t from '@/src/types';
import StrategyOrderListSection from '@/src/components/Section/StrategyOrderListSection';
import StrategySnapshotSection from '@/src/components/Section/StrategySnapshotSection';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import PageContainer, { Label } from '@/src/components/Container/Page';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import MainLoader from '@/src/components/MainLoader';
import DotsLoader from '@/src/components/DotsLoader';
import TradeStrategySection from '../Section/TradeStrategySection';
/*
import Button from '@/src/components/Button/Button';
// */

type Snapshot = {
  totalAmount: number;
  positiveOrders: number;
  successOrders: number | null;
  deposit: number;
  profit: number | null;
};

const c = {
  listLoaderColor: '#3a3f46',
  loading: 'Loading',
  dividerTitle: 'Orders',
};

const {
  OrderStatusEnum,
  OrderTypeDisplayEnum,
  OrderTypeEnum,
  QueryKeyEnum,
  ExchangeEnum,
} = enm;

const Strategy = () => {
  const [filterExchange, setFilterExchange] = useState(enm.ExchangeEnum.All);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [avgBuyPrice, setAvgBuyPrice] = useState(0);
  const [isEditMenu, setIsEditMenu] = useState(false);

  /*
  const { mutateAsync: updateStrategy } = useUpdateStrategy();
  const { isPending, txn } = useTxn();
  // */

  const { updatedTokens } = useGlobalState();
  const { data: session } = useSession();
  const pathname = usePathname();

  const userId = session?.user?.id || null;
  const path = pathname.split('/')[2];
  const type = path.split('-')[0];
  const symbol = path.split('-')[1];
  const token = updatedTokens?.find((token) => token?.symbol === symbol);

  const { RenderModal, openModal, ModalContentEnum } = useModal();
  const { userOrderData } = useFetchAllUserStrategyOrders(
    userId,
    type,
    symbol,
    OrderStatusEnum.Active,
    '', // ExchangeEnum
    { enabled: !!userId }
  );

  // /*
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

  useEffect(() => {
    if (!updatedTokens || !userOrderData) return;
    const price = (token ?? { price: 0 }).price;
    // const price = (
    //   updatedTokens?.find((token) => {
    //     return token?.symbol === symbol;
    //     // return token?.symbol === userOrderData.orders[0]?.symbol;
    //   }) ?? { price: 0 }
    // ).price;
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

  const handleAVG = (orders: t.Order[]) => {
    const averagePrice = calculateAveragePrice(orders);
    setAvgBuyPrice(averagePrice);
  };

  const calculateAveragePrice = (orders: t.Order[]) => {
    if (!orders?.length) return 0;
    const totalPrice = orders.reduce((acc, order) => {
      return acc + order.price * order.amount;
    }, 0);
    const totalAmount = orders.reduce((acc, order) => {
      return acc + order.amount;
    }, 0);
    return totalAmount ? totalPrice / totalAmount : 0;
  };

  const classifyOrder = (percent: number, strategy: t.Strategy) => {
    if (userOrderData && percent >= userOrderData.strategy.target)
      return { priority: 0 };

    if (percent >= 0 && percent < strategy.target) return { priority: 1 };
    if (percent <= 0 && percent > -50) return { priority: 2 };
    if (percent <= -50) return { priority: 3 };
    return { priority: 4 };
  };

  const classifiedOrders = userOrderData?.orders?.map((order) => {
    const percent = ((currentPrice - order.price) / order.price) * 100;
    snapshot.deposit += order.fiat;

    if (!exchanges.includes(order.exchange)) {
      exchanges.push(order.exchange);
    }

    if (order.exchange === filterExchange) {
      snapshot.totalAmount += order.amount;
    } else if (filterExchange === ExchangeEnum.All) {
      snapshot.totalAmount += order.amount;
    }

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

    const { priority } = classifyOrder(percent, userOrderData.strategy);
    return { ...order, percent, priority };
  });

  const sortedOrders = classifiedOrders?.sort((a, b) => {
    if (a.priority === b.priority) {
      return b.percent - a.percent;
    } else return a.priority - b.priority;
  });

  // ---

  const handleModal = () => openModal(ModalContentEnum.Form);

  /*
  const handleUpdateStrategy = async () => {
    if (!userOrderData?.strategy.id) return;
    txn(() =>
      updateStrategy({
        strategyId: userOrderData?.strategy.id,
        params: { data: { value: 'a-17' } },
      })
    );
  };
  // */

  /*
  const calculateStrategyPercent = () => {
    const { deposit, profit } = snapshot;
    const percent = profit ? ((profit - deposit) / deposit) * 100 : -100;
    const signPlus = !percent.toString().includes('-') ? '+' : '';
    return `${signPlus}${percent.toFixed()}%`;
  };
  */

  const ListLoader = () => {
    return (
      <span
        style={{
          display: 'flex',
          paddingTop: '12px',
          fontSize: '0.9rem',
          color: c.listLoaderColor,
          whiteSpace: 'nowrap',
        }}
      >
        {c.loading}
        <DotsLoader inlineStyle={{ color: c.listLoaderColor }} />
      </span>
    );
  };

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading
          title={symbol}
          assetPrice={currentPrice}
          buttonText={
            type === OrderTypeEnum.Buy
              ? heading.headingConfig.addAsset
              : heading.headingConfig.addTarget
          }
          handleModal={handleModal}
          isButtonDisabled={!updatedTokens}
        />

        {/* <Button clickContent={handleUpdateStrategy} disabled={isPending}>
          {isPending ? 'Updating...' : 'Update'}
        </Button> */}

        {userOrderData?.orders ? (
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

              {token && userOrderData && (
                <TradeStrategySection token={token} orderData={userOrderData} />
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
                    />
                  </div>
                </>
              ) : (
                <ListLoader />
              )}
            </SectionsContainer>
          </div>
        ) : (
          <MainLoader />
        )}

        {updatedTokens && (
          <RenderModal>
            <AddOrderForm
              tokens={updatedTokens}
              initType={
                type === OrderTypeEnum.Buy
                  ? OrderTypeDisplayEnum.Asset
                  : OrderTypeDisplayEnum.BuyTarget
              }
              initSymbol={symbol}
              invalidateQuery={[
                QueryKeyEnum.UserOrders,
                QueryKeyEnum.UserStrategyOrders,
              ]}
            />
          </RenderModal>
        )}
      </main>
    </PageContainer>
  );
};

export default Strategy;
