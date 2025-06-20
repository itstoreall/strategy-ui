'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
// import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
import useGlobalState from '@/src/hooks/useGlobalState';
import useModal from '@/src/hooks/useModal';
import { Order, TradeStrategy } from '@/src/types';
import { AuthRoleEnum, QueryKeyEnum } from '@/src/enums';
import { getLSTradeStrategyData, deleteLSTradeStrategyData } from '@/src/utils';
import LSTradeStrategyModalSection from '@/src/components/Section/LSTradeStrategyModalSection';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import GradientProgressLoader from '@/src/assets/animation/GradientProgressLoader';
import RefetchTokensButtonBlock from '@/src/components/RefetchTokensButtonBlock';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import OrderListSection from '@/src/components/Section/OrderListSection';
import PageContainer, { Label } from '@/src/components/Container/Page';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import SectionsContainer from '@/src/components/Container/Sections';
import PricesSection from '@/src/components/Section/PricesSection';
import MainLoader from '@/src/components/MainLoader';

export type StoredData = TradeStrategy[] | null;

const c = {
  dashboardTitle: 'Dashboard',
};

const Dashboard = () => {
  const [currentProfit, setCurrentProfit] = useState<number | null>(null);
  const [LSStrategyData, setLSStrategyData] = useState<StoredData>(null);
  const [isRefetchButton, setIsRefetchButton] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [currentDeposit, setCurrentDeposit] = useState<number>(0);
  const [usingDeposit, setUsingDeposit] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [usingTokens, setUsingTokens] = useState<number>(0);
  const [isProcess, setIsProcess] = useState<boolean>(true);
  // const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { data: session } = useSession();
  const userId = session?.user?.id || null;
  // const ordersParam = { enabled: !!userId };
  const ordersParam = { enabled: true };

  const { userOrders } = useFetchAllUserOrders(currentUser, ordersParam);
  const { updatedTokens, users, userRole, fetchTokens } = useGlobalState();
  const path = useParams();

  const {
    RenderModal,
    openModal,
    isFormModal,
    isLSStrategyDataModal,
    closeModal,
    // ModalContentEnum,
  } = useModal();

  const currentUserId = currentUser ? currentUser : (userId as string);

  useEffect(() => {
    if (!updatedTokens) {
      setTimeout(() => {
        setIsRefetch(true);
      }, 15000);
    }

    // ---

    const lsTradeStrategyData = getLSTradeStrategyData();
    if (lsTradeStrategyData) {
      if (lsTradeStrategyData.length) {
        setLSStrategyData(lsTradeStrategyData);
      } else {
        deleteLSTradeStrategyData();
      }
    }
  }, []);

  useEffect(() => {
    if (isRefetch && !updatedTokens) {
      setIsRefetchButton(true);
      setIsRefetch(false);
    }
  }, [isRefetch]);

  useEffect(() => {
    if (userId) {
      setCurrentUser(userId);
    }
  }, [userId]);

  // useEffect(() => {
  //   if (!userId) return;
  //   getUserRole(userId).then((res) => {
  //     const _isAdmin = res?.role === AuthRoleEnum.Admin;
  //     setIsAdmin(_isAdmin);
  //   });
  // }, [currentUser]);

  useEffect(() => {
    if (!userOrders) return;
    if (userOrders?.buy.length) {
      let totalDeposit = 0;
      const customAssets = userOrders.custom.map((order: Order) => {
        totalDeposit = totalDeposit + order.fiat;
        return order.symbol;
      });
      const otherAssets = userOrders.buy.map((order: Order) => {
        totalDeposit = totalDeposit + order.fiat;
        return order.symbol;
      });
      const uniqueSymbols = new Set([...customAssets, ...otherAssets]);
      setUsingDeposit(totalDeposit);
      setUsingTokens(uniqueSymbols.size);
    } else {
      setUsingDeposit(0);
      setUsingTokens(0);
      setCurrentProfit(0);
    }
  }, [userOrders, path]);

  useEffect(() => {
    if (!userOrders || !updatedTokens) {
      return;
    } else {
      setIsRefetchButton(false);
      setIsRefetch(false);
    }

    // --- Deposit and Profit

    let totalProfit = 0;
    let currentDeposit = 0;
    const updateDepositAndProfit = (order: Order) => {
      const token = updatedTokens.find((t) => t.symbol === order.symbol);
      if (token) {
        currentDeposit = order.amount * token.price + currentDeposit;
        const unrealizedProfit = (token.price - order.price) * order.amount;
        if (!unrealizedProfit.toString().includes('-')) {
          totalProfit += unrealizedProfit;
        }
      }
    };
    for (let i = 0; i < userOrders.custom.length; i++) {
      const order = userOrders.custom[i];
      updateDepositAndProfit(order);
    }
    for (let i = 0; i < userOrders.buy.length; i++) {
      const order = userOrders.buy[i];
      updateDepositAndProfit(order);
    }
    setCurrentDeposit(+currentDeposit.toFixed());
    setCurrentProfit(+totalProfit.toFixed(1));
    setIsProcess(false);
  }, [updatedTokens, userOrders]);

  const handleLSStrategyData = (data: TradeStrategy[] | null) => {
    setLSStrategyData(data);
  };

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

  const refetchTokens = () => {
    setIsRefetchButton(false);
    setIsRefetch(false);
    fetchTokens();
  };

  /*
  const d = [
    { symbol: 'VIRTUAL' },
    { symbol: 'VIRTUAL' },
    { symbol: 'VIRTUAL' },
    { symbol: 'VIRTUAL' },
    { symbol: 'VIRTUAL' },
    { symbol: 'VIRTUAL' },
    { symbol: 'VIRTUAL' },
    { symbol: 'VIRTUAL' },
    { symbol: 'VIRTUAL' },
    { symbol: 'VIRTUAL' },
    { symbol: 'VIRTUAL' },
  ];
  // */

  return (
    <PageContainer label={Label.Main}>
      {updatedTokens && (
        <GradientProgressLoader
          trigger={
            updatedTokens.find((token) => token.symbol === 'BTC')?.price ?? 0
          }
        />
      )}

      <main className="main">
        <PageHeading
          title={c.dashboardTitle}
          // title={`${c.dashboardTitle} ${count}`}
          isAdminButton={userRole === AuthRoleEnum.Admin && !!users && !!userId}
          // isAdminButton={isAdmin && !!users && !!userId}
          adminButtonText={currentUserId ? currentUserId.slice(-4) : ''}
          adminButtonFn={() => toggleUser(currentUserId)}
          storedStrategyData={LSStrategyData}
          // storedStrategyData={d}
          mainButtonText={heading.c.create}
          handleModal={(cont) => openModal(cont)}
          isButtonDisabled={!updatedTokens}
        />

        {userOrders && updatedTokens?.length ? (
          <div className="main-content">
            <SectionsContainer>
              <AccountSnapshotSection
                tokenAmount={usingTokens}
                assetAmount={userOrders?.buy.length}
                depositAmount={usingDeposit}
                currentDeposit={currentDeposit}
                profitAmount={currentProfit}
                isProcess={isProcess}
              />

              {/* <MainDividerSection
                className="order-list-devider"
                title={'Prices'}
              /> */}

              <PricesSection tokens={updatedTokens} />

              {userOrders.custom.length ? (
                <OrderListSection
                  data={userOrders.custom}
                  tokens={updatedTokens}
                  userId={userId}
                  isCustom={true}
                />
              ) : null}

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
        ) : isRefetchButton ? (
          <RefetchTokensButtonBlock refetchTokens={refetchTokens} />
        ) : (
          <MainLoader />
        )}

        {isFormModal && updatedTokens && (
          <RenderModal>
            <AddOrderForm
              tokens={updatedTokens}
              invalidateQuery={[
                QueryKeyEnum.UserOrders,
                QueryKeyEnum.UserStrategyOrders,
              ]}
              buyTargets={userOrders?.sell}
            />
          </RenderModal>
        )}

        {/* {isLSStrategyDataModal && d && ( */}
        {isLSStrategyDataModal && LSStrategyData && (
          <RenderModal>
            <LSTradeStrategyModalSection
              data={LSStrategyData.slice(0, 9)}
              // data={d.slice(0, 9)}
              resetState={() => handleLSStrategyData(null)}
              closeModal={closeModal}
            />
          </RenderModal>
        )}
      </main>
    </PageContainer>
  );
};

export default Dashboard;
