'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
import useGlobalState from '@/src/hooks/useGlobalState';
import useModal from '@/src/hooks/useModal';
// import { QueryKeyEnum } from '@/src/enums';
import { HodlTargetsData, TradeStrategy } from '@/src/types';
import HodlTargetsSnapshotSection from '@/src/components/Section/HodlTargetsSnapshotSection';
import GradientProgressLoader from '@/src/assets/animation/GradientProgressLoader';
import RefetchTokensButtonBlock from '@/src/components/RefetchTokensButtonBlock';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import HodlTargetListSection from '@/src/components/Section/HodlTargets/HodlTargetListSection';
import PageContainer, { Label } from '@/src/components/Container/Page';
import AddHodlTargetsForm from '../Form/HodlTarget/AddHodlTargetsForm';
// import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import SectionsContainer from '@/src/components/Container/Sections';
import MainLoader from '@/src/components/MainLoader';
// import useFetchAllUserStrategyOrders from '@/src/hooks/order/useFetchAllUserStrategyOrders';
// import { OrderStatusEnum, OrderTypeEnum } from '@/src/enums';
import useFetchAllUserHodlTargets from '@/src/hooks/hodlTargets/useFetchAllUserHodlTargets';
import { ModalContentEnum } from '@/src/enums';

export type StoredData = TradeStrategy[] | null;
export type Strategy = TradeStrategy | null;

const c = {
  hodlTargetsTitle: 'Hodl Targets',
  deleteLSStrategy: 'LS Strategy will be deleted!',
  triggerSymbol: 'BTC',
};

const HodlTargets = () => {
  const [isRefetchButton, setIsRefetchButton] = useState<boolean>(false);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  // const [currentDeposit, setCurrentDeposit] = useState<number>(0);
  // const [currentProfit, setCurrentProfit] = useState<number | null>(null);
  // const [usingDeposit, setUsingDeposit] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [editTargets, setEditTargets] = useState<HodlTargetsData | null>(null);
  // const [usingTokens, setUsingTokens] = useState<number>(0);
  // const [isProcess, setIsProcess] = useState<boolean>(true);
  // const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // const [storedStrategy, setStoredStrategy] = useState<Strategy>(null);

  const { data: session } = useSession();
  const userId = session?.user?.id || null;
  // const ordersParam = { enabled: !!userId };
  const ordersParam = { enabled: true };

  // const { userOrderData } = useFetchAllUserStrategyOrders(
  //   userId,
  //   OrderTypeEnum.Buy,
  //   'BTC',
  //   OrderStatusEnum.Active,
  //   '', // ExchangeEnum
  //   { enabled: !!userId }
  // );

  const { hodlTargetsData } = useFetchAllUserHodlTargets(userId, {
    enabled: !!userId,
  });

  const { userOrders } = useFetchAllUserOrders(currentUser, ordersParam);
  const { updatedTokens, fetchTokens } = useGlobalState(); // users, userRole,
  // const path = useParams();

  const {
    RenderModal,
    openModal,
    isFormModal,
    // isStrategyHistoryModal,
    // isStrategyModal,
    // closeModal,
    // ModalContentEnum,
  } = useModal();

  // const currentUserId = currentUser ? currentUser : (userId as string);

  // ---

  // useEffect(() => {
  // if (!isStrategyHistoryModal && storedStrategy) {
  // setStoredStrategy(null);
  // }
  // }, [isStrategyHistoryModal]);

  // ---

  useEffect(() => {
    if (!updatedTokens) {
      setTimeout(() => {
        setIsRefetch(true);
      }, 15000);
    }

    // ---
  }, []);

  useEffect(() => {
    if (isRefetch && !updatedTokens) {
      setIsRefetchButton(true);
      setIsRefetch(false);
    }
  }, [isRefetch]);

  useEffect(() => {
    if (userId) {
      // getLSStrateguData();
      setCurrentUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (editTargets) {
      openModal(ModalContentEnum.Form);
    }
  }, [editTargets]);

  useEffect(() => {
    if (!isFormModal) {
      setEditTargets(null);
    }
  }, [isFormModal]);

  // useEffect(() => {
  //   console.log('hodlTargetsData:', hodlTargetsData);
  // }, [hodlTargetsData]);

  // useEffect(() => {
  //   if (!userId) return;
  //   getUserRole(userId).then((res) => {
  //     const _isAdmin = res?.role === AuthRoleEnum.Admin;
  //     setIsAdmin(_isAdmin);
  //   });
  // }, [currentUser]);

  // useEffect(() => {
  //   if (!userOrders) return;
  //   if (userOrders?.buy.length) {
  //     let totalDeposit = 0;
  //     const DCAPAssets = userOrders.DCAP.map((order: Order) => {
  //       totalDeposit = totalDeposit + order.fiat;
  //       return order.symbol;
  //     });
  //     const customAssets = userOrders.custom.map((order: Order) => {
  //       totalDeposit = totalDeposit + order.fiat;
  //       return order.symbol;
  //     });
  //     const otherAssets = userOrders.buy.map((order: Order) => {
  //       totalDeposit = totalDeposit + order.fiat;
  //       return order.symbol;
  //     });
  //     const uniqueSymbols = new Set([
  //       ...DCAPAssets,
  //       ...customAssets,
  //       ...otherAssets,
  //     ]);
  //     setUsingDeposit(totalDeposit);
  //     setUsingTokens(uniqueSymbols.size);
  //   } else {
  //     setUsingDeposit(0);
  //     setUsingTokens(0);
  //     setCurrentProfit(0);
  //   }
  // }, [userOrders, path]);

  // useEffect(() => {
  //   if (!userOrders || !updatedTokens) {
  //     return;
  //   } else {
  //     setIsRefetchButton(false);
  //     setIsRefetch(false);
  //   }

  //   // --- Deposit and Profit

  //   let totalProfit = 0;
  //   let currentDeposit = 0;
  //   const updateDepositAndProfit = (order: Order) => {
  //     const token = updatedTokens.find((t) => t.symbol === order.symbol);
  //     if (token) {
  //       currentDeposit = order.amount * token.price + currentDeposit;
  //       const unrealizedProfit = (token.price - order.price) * order.amount;
  //       if (!unrealizedProfit.toString().includes('-')) {
  //         totalProfit += unrealizedProfit;
  //       }
  //     }
  //   };
  //   for (let i = 0; i < userOrders.DCAP.length; i++) {
  //     const order = userOrders.DCAP[i];
  //     updateDepositAndProfit(order);
  //   }
  //   for (let i = 0; i < userOrders.custom.length; i++) {
  //     const order = userOrders.custom[i];
  //     updateDepositAndProfit(order);
  //   }
  //   for (let i = 0; i < userOrders.buy.length; i++) {
  //     const order = userOrders.buy[i];
  //     updateDepositAndProfit(order);
  //   }
  //   setCurrentDeposit(+currentDeposit.toFixed());
  //   setCurrentProfit(+totalProfit.toFixed(1));
  //   setIsProcess(false);
  // }, [updatedTokens, userOrders]);

  // const toggleUser = (currentUser: string) => {
  //   if (!users) return;
  //   for (let i = 0; i < users.length; i++) {
  //     const element = users[i];
  //     if (element.id === currentUser) {
  //       if (users.length - 1 === i) {
  //         const id = users[0].id;
  //         setCurrentUser(id);
  //       } else {
  //         const idx = users.findIndex((item) => item.id === element.id);
  //         const id = users[idx + 1].id;
  //         setCurrentUser(id);
  //       }
  //     }
  //   }
  // };

  const handleEditTargets = (args: HodlTargetsData | null) => {
    // console.log('handleEditTargets args:', args);
    // setEditTargets();
    setEditTargets(args);
  };

  const refetchTokens = () => {
    setIsRefetchButton(false);
    setIsRefetch(false);
    fetchTokens();
  };

  return (
    <PageContainer label={Label.Main}>
      {updatedTokens && (
        <GradientProgressLoader
          trigger={
            updatedTokens.find((t) => t.symbol === c.triggerSymbol)?.price ?? 0
          }
        />
      )}

      <main className="main">
        <PageHeading
          title={c.hodlTargetsTitle}
          // title={`${c.dashboardTitle} ${count}`}
          // isAdminButton={userRole === AuthRoleEnum.Admin && !!users && !!userId}
          // isAdminButton={isAdmin && !!users && !!userId}
          // adminButtonText={currentUserId ? currentUserId.slice(-4) : ''}
          // adminButtonFn={() => toggleUser(currentUserId)}
          // storedStrategyData={LSStrategyData}
          // storedStrategyData={d}
          mainButtonText={heading.c.addTarget}
          handleModal={(cont) => openModal(cont)}
          isButtonDisabled={!updatedTokens}
        />

        {userOrders && updatedTokens?.length ? (
          <div className="main-content">
            <SectionsContainer>
              <HodlTargetsSnapshotSection
                value1={1}
                value2={2}
                value3={3}
                value4={4}
              />

              {hodlTargetsData?.length && userOrders.buy.length ? (
                <HodlTargetListSection
                  // hodlTargetsData={hodlTargetsData}
                  data={hodlTargetsData}
                  tokens={updatedTokens}
                  // userId={userId}
                  handleEditTargets={handleEditTargets}
                />
              ) : null}
            </SectionsContainer>
          </div>
        ) : isRefetchButton ? (
          <RefetchTokensButtonBlock refetchTokens={refetchTokens} />
        ) : (
          <MainLoader />
        )}

        {isFormModal && updatedTokens && userOrders && userId && (
          <RenderModal>
            <AddHodlTargetsForm
              userId={userId}
              tokens={updatedTokens}
              initialTargets={editTargets}

              // orders={[
              //   ...userOrders['DCAP'],
              //   ...userOrders['buy'],
              //   ...userOrders['custom'],
              // ]}
              // invalidateQuery={[
              //   QueryKeyEnum.UserOrders,
              //   QueryKeyEnum.UserStrategyOrders,
              // ]}
              // buyTargets={userOrders?.sell}
            />
          </RenderModal>
        )}
      </main>
    </PageContainer>
  );
};

export default HodlTargets;
