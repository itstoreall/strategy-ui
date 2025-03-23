'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import useModal from '@/src/hooks/useModal';
import { AuthRoleEnum, OrderTypeDisplayEnum, QueryKeyEnum } from '@/src/enums';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import OrderListSection from '@/src/components/Section/OrderListSection';
import PageContainer, { Label } from '@/src/components/Container/Page';
import SectionsContainer from '@/src/components/Container/Sections';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import MainLoader from '@/src/components/MainLoader';
import useGlobalState from '@/src/hooks/useGlobalState';
import PricesSection from '../Section/PricesSection';

/*
const config = {
  loading: 'Loading...',
};
*/

const Dashboard = () => {
  const [currentProfit, setCurrentProfit] = useState<number | null>(null);
  const [usingDeposit, setUsingDeposit] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [usingTokens, setUsingTokens] = useState<number>(0);
  const [isProcess, setIsProcess] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { data: session } = useSession();
  const userId = session?.user?.id || null;

  const usersParam = { enabled: isAdmin };
  const ordersParam = { enabled: !!userId };

  const { users } = useFetchAllUsers(usersParam);
  const { userOrders } = useFetchAllUserOrders(currentUser, ordersParam);
  const { RenderModal, openModal, ModalContentEnum } = useModal();

  const { updatedTokens } = useGlobalState();

  const currentUserId = currentUser ? currentUser : (userId as string);

  useEffect(() => {
    if (userId) {
      setCurrentUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    getUserRole(currentUser).then((res) => {
      setIsAdmin(res?.role === AuthRoleEnum.Admin);
    });
  }, [currentUser]);

  useEffect(() => {
    if (userOrders?.buy.length) {
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
      setCurrentProfit(0);
    }
  }, [userOrders]);

  useEffect(() => {
    if (!userOrders || !updatedTokens) return;
    let totalProfit = 0;
    for (let i = 0; i < userOrders.buy.length; i++) {
      const order = userOrders.buy[i];
      const token = updatedTokens.find((t) => t.symbol === order.symbol);
      if (token) {
        const unrealizedProfit = (token.price - order.price) * order.amount;
        if (!unrealizedProfit.toString().includes('-')) {
          totalProfit += +unrealizedProfit.toFixed();
        }
      }
      setCurrentProfit(totalProfit);
    }
    setIsProcess(false);
  }, [updatedTokens, userOrders]);

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
                profitAmount={currentProfit}
                isProcess={isProcess}
              />

              <PricesSection tokens={updatedTokens} />

              {userOrders?.buy.length && updatedTokens?.length ? (
                <OrderListSection
                  data={userOrders.buy}
                  tokens={updatedTokens}
                  userId={userId}
                  // removeOrder={removeOrder}
                />
              ) : null}

              {/* {userOrders?.sell.length ? (
                <OrderListSection
                  data={userOrders.sell}
                  // removeOrder={removeOrder}
                />
              ) : null} */}
            </SectionsContainer>
          </div>
        ) : (
          <MainLoader />
        )}

        {updatedTokens && (
          <RenderModal>
            <AddOrderForm
              tokens={updatedTokens}
              initType={OrderTypeDisplayEnum.Asset}
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

export default Dashboard;
