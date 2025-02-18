'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import useModal from '@/src/hooks/useModal';
import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import PageContainer, { Label } from '@/src/components/Container/Page';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
// import RenderModal from '@/src/components/Modal/RenderModal';
import MainLoader from '@/src/components/MainLoader';
import { OrderStatusEnum } from '@/src/enums';

const Strategy = () => {
  const { updatedTokens } = useFetchAllTokens();
  const { data: session } = useSession();
  const pathname = usePathname();
  // const queryClient = useQueryClient();

  const userId = session?.user?.id || null;
  const path = pathname.split('/')[2];
  const type = path.split('-')[0];
  const symbol = path.split('-')[1];

  // console.log('userId:', userId);
  // console.log('type:', type);
  // console.log('symbol:', symbol);

  const { userOrders } = useFetchAllUserStrategyOrders(
    userId,
    type,
    symbol,
    OrderStatusEnum.Active,
    '', // ExchangeEnum
    { enabled: !!userId }
  );
  const { RenderModal, openModal, ModalContentEnum } = useModal(); // RenderModal,

  // if (userOrders) console.log('userOrders:', userOrders);

  const handleModal = () => openModal(ModalContentEnum.Form);

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading
          title={'Strategy'}
          buttonText={heading.headingConfig.addOrder}
          handleModal={handleModal}
          isButtonDisabled={!updatedTokens}
        />

        {userOrders ? (
          <div className="main-content">
            <SectionsContainer>{`${type} - ${symbol} - ${userOrders.length} orders`}</SectionsContainer>
          </div>
        ) : (
          <MainLoader />
        )}

        {updatedTokens && (
          <RenderModal>
            <AddOrderForm
              tokens={updatedTokens}
              initType={type}
              initSymbol={symbol}
              invalidateQuery={'userStrategyOrders'}
            />
          </RenderModal>
        )}
      </main>
    </PageContainer>
  );
};

export default Strategy;
