'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
// import useDashboard from '@/src/hooks/useDashboard';
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
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import PageContainer, { Label } from '@/src/components/Container/Page';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import MainLoader from '@/src/components/MainLoader';

const Strategy = () => {
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

  const handleModal = () => openModal(ModalContentEnum.Form);

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading
          title={'Strategy'}
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
              <StrategyOrderListSection
                tokens={updatedTokens}
                orders={userOrders}
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
