'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import useModal from '@/src/hooks/useModal';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
import { AuthRoleEnum, QueryKeyEnum } from '@/src/enums';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import OrderListSection from '@/src/components/Section/OrderListSection';
import PageContainer, { Label } from '@/src/components/Container/Page';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import MainLoader from '@/src/components/MainLoader';

const Dashboard = () => {
  const [usingTokens, setUsingTokens] = useState(0);
  const [usingDeposit, setUsingDeposit] = useState(0);
  const [currentUser, setCurrentUser] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id || null;

  const usersParam = { enabled: isAdmin };
  const ordersParam = { enabled: !!userId };

  const { users } = useFetchAllUsers(usersParam);
  const { userOrders } = useFetchAllUserOrders(currentUser, ordersParam);
  const { RenderModal, openModal, ModalContentEnum } = useModal();
  const { updatedTokens } = useFetchAllTokens();

  // const removeOrder = async (id: number) => {
  //   const isDeleted = await deleteOrder(id);
  //   if (isDeleted) queryClient.invalidateQueries({ queryKey: ['userOrders'] });
  // };

  const currentUserId = currentUser ? currentUser : (userId as string);

  useEffect(() => {
    if (userId) setCurrentUser(userId);
  }, [userId]);

  useEffect(() => {
    getUserRole(currentUser).then((res) => {
      setIsAdmin(res?.role === AuthRoleEnum.Admin);
    });
  }, [currentUser]);

  useEffect(() => {
    if (userOrders) {
      let totalDeposit = 0;
      const assets = userOrders.buy.map((order) => {
        totalDeposit = totalDeposit + order.fiat;
        return order.symbol;
      });
      const uniqueSymbols = new Set([...assets]);
      setUsingDeposit(totalDeposit);
      setUsingTokens(uniqueSymbols.size);
    } else {
      setUsingDeposit(0);
      setUsingTokens(0);
    }
  }, [userOrders]);

  const toggleUser = (currentUser: string) => {
    if (!users) return;
    for (let i = 0; i < users.length; i++) {
      const element = users[i];
      if (element.id === currentUser) {
        if (users.length - 1 === i) {
          const id = users[0].id;
          setCurrentUser(id);
        } else {
          const idx = users.findIndex((item) => item.id === element.id);
          const id = users[idx + 1].id;
          setCurrentUser(id);
        }
      }
    }
  };

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
