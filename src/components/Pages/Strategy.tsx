'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
import useModal from '@/src/hooks/useModal';
import {
  OrderStatusEnum,
  OrderTypeDisplayEnum,
  OrderTypeEnum,
  QueryKeyEnum,
} from '@/src/enums';
import StrategyOrderListSection from '@/src/components/Section/StrategyOrderListSection';
import StrategySnapshotSection from '@/src/components/Section/StrategySnapshotSection';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import PageContainer, { Label } from '@/src/components/Container/Page';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import MainLoader from '@/src/components/MainLoader';
import DotsLoader from '@/src/components/DotsLoader';

const Strategy = () => {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isEditMenu, setIsEditMenu] = useState(false);

  const { data: session } = useSession();
  const { updatedTokens } = useFetchAllTokens();
  const pathname = usePathname();
  // const queryClient = useQueryClient();

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

  type Snapshot = {
    positiveOrders: number;
    successOrders: number | null;
    deposit: number;
    profit: number | null;
  };

  const snapshot: Snapshot = {
    positiveOrders: 0,
    successOrders: null,
    deposit: 0,
    profit: null,
  };

  // if (userOrders) console.log('userOrders:', userOrders);

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

  const target = 100;

  useEffect(() => {
    if (!updatedTokens || !userOrders) return;
    const price = (
      updatedTokens?.find((token) => {
        return token?.symbol === userOrders[0]?.symbol;
      }) ?? { price: 0 }
    ).price;
    setCurrentPrice(price);
  }, [updatedTokens, userOrders]);

  const classifyOrder = (percent: number) => {
    if (percent >= target) return { priority: 0 };
    if (percent >= 0 && percent < target) return { priority: 1 };
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

      if (percent >= target) {
        if (snapshot.successOrders === null) {
          snapshot.successOrders = 1;
        } else {
          snapshot.successOrders += 1;
        }
        // snapshot.profit += order.amount * currentPrice;
      }

      if (snapshot.positiveOrders === null) {
        snapshot.positiveOrders = 1;
      } else {
        snapshot.positiveOrders += 1;
      }
      // snapshot.positiveOrders += 1;
    }

    // console.log('-->', positiveOrders);

    const { priority } = classifyOrder(percent);
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
                    title={'Orders'}
                    isSwitchButton={true}
                    isDisabled={!isEditMenu}
                    setIsDisabled={setIsEditMenu}
                  />

                  <StrategyOrderListSection
                    sortedOrders={sortedOrders ?? []}
                    target={target}
                    currentPrice={currentPrice}
                    isEditMenu={isEditMenu}
                    // tokens={updatedTokens}
                    // orders={userOrders}
                  />
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
