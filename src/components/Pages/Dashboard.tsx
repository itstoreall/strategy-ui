'use client';

import { useSession } from 'next-auth/react';
import useModal from '@/src/hooks/useModal';
import { useQueryClient } from '@tanstack/react-query';
import { deleteOrder } from '@/src/lib/api/deleteOrderServerAction';
import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import OrderListSection from '@/src/components/Section/OrderListSection';
import PageContainer, { Label } from '@/src/components/Container/Page';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import MainLoader from '@/src/components/MainLoader';

const Dashboard = () => {
  const { data: session } = useSession();
  const { updatedTokens } = useFetchAllTokens();
  const queryClient = useQueryClient();

  const userId = session?.user?.id || null;

  const { userOrders } = useFetchAllUserOrders(userId, { enabled: !!userId });
  const { RenderModal, openModal, ModalContentEnum } = useModal();

  const handleModal = () => openModal(ModalContentEnum.Form);

  const removeOrder = async (id: number) => {
    const isDeleted = await deleteOrder(id);
    if (isDeleted) queryClient.invalidateQueries({ queryKey: ['userOrders'] });
  };

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading
          title={'Dashboard'}
          buttonText={updatedTokens ? heading.headingConfig.addOrder : ''}
          handleModal={handleModal}
        />

        {updatedTokens ? (
          <div className="main-content">
            <SectionsContainer>
              <AccountSnapshotSection />

              {userOrders && (
                <>
                  <OrderListSection
                    data={userOrders.buy}
                    removeOrder={removeOrder}
                  />

                  <OrderListSection
                    data={userOrders.sell}
                    removeOrder={removeOrder}
                  />
                </>
              )}
            </SectionsContainer>
          </div>
        ) : (
          <MainLoader />
        )}

        {updatedTokens && (
          <RenderModal>
            <AddOrderForm tokens={updatedTokens} />
          </RenderModal>
        )}

        {/* <button onClick={handleModal}>Add Order</button> */}

        {/* <button onClick={addOrder}>Add Order</button> */}

        {/* <MockDataList items={120} /> */}
      </main>
    </PageContainer>
  );
};

export default Dashboard;
