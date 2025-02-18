'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import useModal from '@/src/hooks/useModal';
import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
import PageHeading, * as heading from '@/src/components/Layout/PageHeading';
import PageContainer, { Label } from '@/src/components/Container/Page';
import SectionsContainer from '@/src/components/Container/Sections';
import MainLoader from '@/src/components/MainLoader';

const Strategy = () => {
  const { updatedTokens } = useFetchAllTokens();
  const { data: session } = useSession();
  const pathname = usePathname();
  // const queryClient = useQueryClient();

  const userId = session?.user?.id || null;
  const path = pathname.split('/')[2];
  const strategy = path.split('-')[0];
  const symbol = path.split('-')[1];

  // console.log('userId:', userId);
  // console.log('strategy:', strategy);
  // console.log('symbol:', symbol);

  const { openModal, ModalContentEnum } = useModal(); // RenderModal,

  const handleModal = () => openModal(ModalContentEnum.Form);

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading
          title={'Strategy'}
          buttonText={updatedTokens ? heading.headingConfig.addOrder : ''}
          handleModal={handleModal}
        />

        {updatedTokens ? (
          <div className="main-content">
            <SectionsContainer>{`${userId} - ${strategy} - ${symbol}`}</SectionsContainer>
          </div>
        ) : (
          <MainLoader />
        )}

        {/* {updatedTokens && (
          <RenderModal>
            <AddOrderForm tokens={updatedTokens} />
          </RenderModal>
        )} */}
      </main>
    </PageContainer>
  );
};

export default Strategy;
