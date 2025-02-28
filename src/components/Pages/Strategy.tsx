'use client';

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
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import PageContainer, { Label } from '@/src/components/Container/Page';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import MainLoader from '@/src/components/MainLoader';
import MainDividerSection from '../Section/MainDividerSection';
import { useEffect, useState } from 'react';

const Strategy = () => {
  // const [successAssets, setSuccessAssets] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

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

  // if (userOrders) console.log('userOrders:', userOrders);

  // ---

  const target = 100;

  useEffect(() => {
    if (!updatedTokens || !userOrders) return;
    const price = (
      updatedTokens?.find((token) => {
        return token.symbol === userOrders[0].symbol;
      }) ?? { price: 0 }
    ).price;
    setCurrentPrice(price);
  }, [updatedTokens, userOrders]);

  // console.log('currentPrice:', currentPrice);

  // const currentPrice = (
  //   updatedTokens?.find((token) => {
  //     return token.symbol === userOrders[0].symbol;
  //   }) ?? { price: 0 }
  // ).price;

  const classifyOrder = (percent: number) => {
    // if (percent >= target / 2 && percent < target) return { priority: 1 };
    // if (percent > -25 && percent < target / 2) return { priority: 2 };
    // if (percent <= -25 && percent > -50) return { priority: 3 };
    // if (percent <= -50) return { priority: 4 };
    if (percent >= target) return { priority: 0 };
    if (percent >= 0 && percent < target) return { priority: 1 };
    if (percent <= 0 && percent > -50) return { priority: 2 };
    if (percent <= -50) return { priority: 3 };
    return { priority: 4 };
  };

  const snapshot = {
    positiveOrders: 0,
    successOrders: 0,
    deposit: 0,
  };

  const classifiedOrders = userOrders?.map((order) => {
    const percent = ((currentPrice - order.price) / order.price) * 100;
    // console.log('===>', order.fiat);
    snapshot.deposit += order.fiat;
    if (!percent.toString().includes('-')) {
      if (percent >= target) snapshot.successOrders += 1;
      snapshot.positiveOrders += 1;
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

  const handleModal = () => openModal(ModalContentEnum.Form);

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

        {userOrders && updatedTokens ? (
          <div className="main-content">
            <SectionsContainer>
              <StrategySnapshotSection
                orderNumber={sortedOrders?.length ?? 0}
                positiveOrders={snapshot.positiveOrders}
                successOrders={snapshot.successOrders}
                depositAmount={snapshot.deposit}
              />

              <MainDividerSection
                className="order-list-devider"
                title={'Orders'}
                // isSwitchButton={isToggle}
                // isDisabled={!isExpanded}
                // setIsDisabled={toggleList}
              />

              <StrategyOrderListSection
                sortedOrders={sortedOrders ?? []}
                target={target}
                currentPrice={currentPrice}
                // tokens={updatedTokens}
                // orders={userOrders}
              />
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
