'use client';

import PageWrapperContainer from '@/src/components/Container/PageWrapper';
import AuthError from '@/src/components/Pages/AuthError';

const AuthErrorPage: React.FC = () => {
  return (
    <PageWrapperContainer>
      <AuthError />
    </PageWrapperContainer>
  );
};

export default AuthErrorPage;
