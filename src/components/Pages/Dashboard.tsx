'use client';

// import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
// import { OrderTypeEnum } from '@/src/enums';
import useModal from '@/src/hooks/useModal';
// import useCreateOrder from '@/src/hooks/order/useCreateOrder';
import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageContainer, { Label } from '@/src/components/Container/Page';
import AddOrderForm from '@/src/components/Form/Order/AddOrderForm';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '@/src/components/MainLoader';

const Dashboard = () => {
  const { data: session } = useSession();
  const { updatedTokens } = useFetchAllTokens();
  const userId = session?.user?.id || null;

  const { userOrders } = useFetchAllUserOrders(userId, { enabled: !!userId });
  // const { mutate: createOrder, isSuccess, isError } = useCreateOrder();

  const { RenderModal, openModal, ModalContentEnum } = useModal();

  const handleModal = () => openModal(ModalContentEnum.Form);

  /*
  useEffect(() => {
    console.log('userOrders data:', userOrders);
  }, [userOrders]);
  // */

  // useEffect(() => {
  //   console.log('useCreateOrder isSuccess:', isSuccess);
  //   console.log('useCreateOrder isError:', isError);
  // }, [isSuccess, isError]);

  // const addOrder = () => {
  //   if (!session?.user || !userId) return;
  //   const payload = {
  //     type: OrderTypeEnum.Buy,
  //     symbol: 'BTC',
  //     amount: 1,
  //     price: 100222,
  //     userId: userId,
  //   };
  //   createOrder(payload);
  // };

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Dashboard'} />

        {updatedTokens ? (
          <div className="main-content">
            <AccountSnapshotSection />

            <ul>
              {updatedTokens?.map((token) => (
                <li key={token.id}>{`${token.symbol}: ${token.price}`}</li>
              ))}
            </ul>

            <ul>
              {userOrders?.map((order) => (
                <li
                  key={order.symbol}
                >{`${order.symbol}: ${order.amount} - ${order.price}`}</li>
              ))}
            </ul>
          </div>
        ) : (
          <MainLoader />
        )}

        {updatedTokens && (
          <RenderModal>
            <AddOrderForm tokens={updatedTokens} />
          </RenderModal>
        )}

        <button onClick={handleModal}>Add Order</button>

        {/* <button onClick={addOrder}>Add Order</button> */}

        {/* <MockDataList items={120} /> */}
      </main>
    </PageContainer>
  );
};

export default Dashboard;
