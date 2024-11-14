'use client';

import PageWrapperContainer from '@/src/components/Container/PageWrapper';
import AuthSuccess from '@/src/components/Pages/AuthSuccess';

const AuthSuccessPage: React.FC = () => {
  return (
    <PageWrapperContainer>
      <AuthSuccess />
    </PageWrapperContainer>
  );
};

export default AuthSuccessPage;
