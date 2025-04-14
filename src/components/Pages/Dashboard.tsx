'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
import useGlobalState from '@/src/hooks/useGlobalState';
import useModal from '@/src/hooks/useModal';
import { AuthRoleEnum, OrderTypeDisplayEnum, QueryKeyEnum } from '@/src/enums';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import OrderListSection from '@/src/components/Section/OrderListSection';
import PageContainer, { Label } from '@/src/components/Container/Page';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import SectionsContainer from '@/src/components/Container/Sections';
import PricesSection from '@/src/components/Section/PricesSection';
import MainLoader from '@/src/components/MainLoader';

const config = {
  dashboardTitle: 'Dashboard',
};

const Dashboard = () => {
  const [currentProfit, setCurrentProfit] = useState<number | null>(null);
  const [usingDeposit, setUsingDeposit] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [usingTokens, setUsingTokens] = useState<number>(0);
  const [isProcess, setIsProcess] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { data: session } = useSession();
  const userId = session?.user?.id || null;
  const ordersParam = { enabled: !!userId };

  const { userOrders } = useFetchAllUserOrders(currentUser, ordersParam);
  const { RenderModal, openModal, ModalContentEnum } = useModal();
  const { updatedTokens, users } = useGlobalState();

  const currentUserId = currentUser ? currentUser : (userId as string);

  const [i, setI] = useState<number>(0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setI((prev) => prev + 1);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [i]);

  useEffect(() => {
    if (userId) {
      setCurrentUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    getUserRole(userId).then((res) => {
      const _isAdmin = res?.role === AuthRoleEnum.Admin;
      setIsAdmin(_isAdmin);
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

  // console.log('userOrders:', userOrders);
  // console.log('updatedTokens:', updatedTokens);

  return (
    <PageContainer label={Label.Main}>
      <div
        style={{
          position: 'absolute',
          top: '15px',
          left: '120px',
          color: 'red',
          zIndex: 100,
        }}
      >
        {i}
      </div>
      <main className="main">
        <PageHeading
          title={config.dashboardTitle}
          isAdminButton={isAdmin && !!users && !!userId}
          adminButtonText={currentUserId ? currentUserId.slice(-4) : ''}
          adminButtonFn={() => toggleUser(currentUserId)}
          buttonText={heading.headingConfig.create}
          handleModal={() => openModal(ModalContentEnum.Form)}
          isButtonDisabled={!updatedTokens}
        />

        {userOrders && updatedTokens?.length ? (
          <div className="main-content">
            <SectionsContainer>
              <AccountSnapshotSection
                tokenAmount={usingTokens}
                assetAmount={userOrders?.buy.length}
                depositAmount={usingDeposit}
                profitAmount={currentProfit}
                isProcess={isProcess}
              />

              {/* <MainDividerSection
                className="order-list-devider"
                title={'Prices'}
              /> */}

              <PricesSection tokens={updatedTokens} />

              {userOrders.buy.length ? (
                <OrderListSection
                  data={userOrders.buy}
                  tokens={updatedTokens}
                  userId={userId}
                />
              ) : null}

              {userOrders.sell.length ? (
                <OrderListSection
                  data={userOrders.sell}
                  tokens={updatedTokens}
                  userId={userId}
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
              initType={OrderTypeDisplayEnum.Asset}
              invalidateQuery={[
                QueryKeyEnum.UserOrders,
                QueryKeyEnum.UserStrategyOrders,
              ]}
              buyTargets={userOrders?.sell}
            />
          </RenderModal>
        )}
      </main>
    </PageContainer>
  );
};

export default Dashboard;
