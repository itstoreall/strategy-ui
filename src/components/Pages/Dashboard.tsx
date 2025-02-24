'use client';

import useModal from '@/src/hooks/useModal';
import useDashboard from '@/src/hooks/useDashboard';
import { QueryKeyEnum } from '@/src/enums';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import OrderListSection from '@/src/components/Section/OrderListSection';
import PageContainer, { Label } from '@/src/components/Container/Page';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import MainLoader from '@/src/components/MainLoader';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id || null;

  const { RenderModal, openModal, ModalContentEnum } = useModal();
  const {
    users,
    currentUser,
    updatedTokens,
    userOrders,
    usingTokens,
    usingDeposit,
    toggleUser,
  } = useDashboard();

  // const removeOrder = async (id: number) => {
  //   const isDeleted = await deleteOrder(id);
  //   if (isDeleted) queryClient.invalidateQueries({ queryKey: ['userOrders'] });
  // };

  const currentUserId = currentUser ? currentUser : (userId as string);

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading
          title={'Dashboard'}
          isAdminButton={!!users && !!userId}
          adminButtonText={currentUserId ? currentUserId.slice(-4) : ''}
          adminButtonFn={() => toggleUser(currentUserId)}
          buttonText={heading.headingConfig.create}
          handleModal={() => openModal(ModalContentEnum.Form)}
          isButtonDisabled={!updatedTokens}
        />

        {userOrders ? (
          <div className="main-content">
            <SectionsContainer>
              <AccountSnapshotSection
                tokenAmount={usingTokens}
                assetAmount={userOrders?.buy.length}
                depositAmount={usingDeposit}
              />

              {userOrders?.buy.length ? (
                <OrderListSection
                  data={userOrders.buy}
                  // removeOrder={removeOrder}
                />
              ) : null}

              {userOrders?.sell.length ? (
                <OrderListSection
                  data={userOrders.sell}
                  // removeOrder={removeOrder}
                />
              ) : null}
            </SectionsContainer>
          </div>
        ) : (
          <MainLoader />
        )}

        {updatedTokens && (
          <RenderModal>
            <AddOrderForm
              tokens={updatedTokens}
              invalidateQuery={[QueryKeyEnum.UserOrders]}
            />
          </RenderModal>
        )}
      </main>
    </PageContainer>
  );
};

export default Dashboard;
