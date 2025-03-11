'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
import useGlobalState from '@/src/hooks/useGlobalState';
import useModal from '@/src/hooks/useModal';
import * as enums from '@/src/enums';
import { Order } from '@/src/types';
import StrategyOrderListSection from '@/src/components/Section/StrategyOrderListSection';
import StrategySnapshotSection from '@/src/components/Section/StrategySnapshotSection';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import PageContainer, { Label } from '@/src/components/Container/Page';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import MainLoader from '@/src/components/MainLoader';
import DotsLoader from '@/src/components/DotsLoader';

type Snapshot = {
  positiveOrders: number;
  successOrders: number | null;
  deposit: number;
  profit: number | null;
};

const { OrderStatusEnum, OrderTypeDisplayEnum, OrderTypeEnum, QueryKeyEnum } =
  enums;

const Strategy = () => {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isEditMenu, setIsEditMenu] = useState(false);

  const { updatedTokens, fetchTokens } = useGlobalState();
  const { data: session } = useSession();
  const pathname = usePathname();

  const userId = session?.user?.id || null;
  const path = pathname.split('/')[2];
  const type = path.split('-')[0];
  const symbol = path.split('-')[1];

  // console.log('userId:', userId);
  // console.log('type:', type);
  // console.log('symbol:', symbol);

  const { RenderModal, openModal, ModalContentEnum } = useModal();
  const { userOrders } = useFetchAllUserStrategyOrders(
    userId,
    type,
    symbol,
    OrderStatusEnum.Active,
    '', // ExchangeEnum
    { enabled: !!userId }
  );

  // ---

  const snapshot: Snapshot = {
    positiveOrders: 0,
    successOrders: null,
    deposit: 0,
    profit: null,
  };

  /*
  useEffect(() => {
    // console.log('profitAmount:', profitAmount);
    // console.log('successOrders:', successOrders);

    setTimeout(() => {
      if (!snapshot.successOrders && !snapshot.positiveOrders) {
        snapshot.successOrders = 0;
        snapshot.positiveOrders = 0;
        console.log('e:', 222);
      }
    }, 10000);
  }, []);
  */

  // ---

  useEffect(() => {
    if (!updatedTokens || !userOrders) return;
    const price = (
      updatedTokens?.find((token) => {
        return token?.symbol === userOrders[0]?.symbol;
      }) ?? { price: 0 }
    ).price;
    setCurrentPrice(price);
  }, [updatedTokens, userOrders]);

  const classifyOrder = (percent: number, order: Order) => {
    if (percent >= order.target) return { priority: 0 };
    if (percent >= 0 && percent < order.target) return { priority: 1 };
    if (percent <= 0 && percent > -50) return { priority: 2 };
    if (percent <= -50) return { priority: 3 };
    return { priority: 4 };
  };

  const classifiedOrders = userOrders?.map((order) => {
    const percent = ((currentPrice - order.price) / order.price) * 100;
    snapshot.deposit += order.fiat;

    if (!percent.toString().includes('-')) {
      if (snapshot.profit === null) {
        snapshot.profit = 0 + order.amount * currentPrice;
      } else {
        snapshot.profit += order.amount * currentPrice;
      }

      if (percent >= order.target) {
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

    const { priority } = classifyOrder(percent, order);
    return { ...order, percent, priority };
  });

  const sortedOrders = classifiedOrders?.sort((a, b) => {
    if (a.priority === b.priority) {
      return b.percent - a.percent;
    } else return a.priority - b.priority;
  });

  // ---

  // console.log('snapshot:', snapshot);

  const handleModal = () => openModal(ModalContentEnum.Form);

  const ListLoader = () => {
    const color = '#3a3f46';
    return (
      <span
        style={{
          display: 'flex',
          paddingTop: '12px',
          fontSize: '0.9rem',
          color: color,
          whiteSpace: 'nowrap',
        }}
      >
        {'Loading'}
        <DotsLoader inlineStyle={{ color: color }} />
      </span>
    );
  };

  // console.log('sortedOrders:', sortedOrders);

  const calculateStrategyPercent = () => {
    const { deposit, profit } = snapshot;

    // console.log('deposit, profit:', deposit, profit);
    // console.log('userOrders:', userOrders?.length);

    /*
    if (userOrders && userOrders?.length < 2) {
      return '';
    }
    */

    const percent = profit ? ((profit - deposit) / deposit) * 100 : -100;
    const signPlus = !percent.toString().includes('-') ? '+' : '';
    return `${signPlus}${percent.toFixed()}%`;
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
          fetchTokens={fetchTokens}
        />

        {userOrders ? (
          <div className="main-content">
            <SectionsContainer>
              <StrategySnapshotSection
                orderNumber={sortedOrders?.length ?? 0}
                positiveOrders={snapshot.positiveOrders}
                successOrders={snapshot.successOrders}
                depositAmount={snapshot.deposit}
                profitAmount={snapshot.profit}
              />

              {updatedTokens ? (
                <>
                  <MainDividerSection
                    className="order-list-devider"
                    title={'Total:'} // Allocations
                    subTitle={calculateStrategyPercent()}
                    isSwitchButton={!!sortedOrders?.length}
                    isDisabled={!isEditMenu}
                    setIsDisabled={setIsEditMenu}
                  />

                  <div className="sections-container-strategy-order-list-block">
                    <StrategyOrderListSection
                      sortedOrders={sortedOrders ?? []}
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
