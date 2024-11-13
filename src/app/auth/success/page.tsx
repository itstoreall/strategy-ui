'use client';

import PageWrapperContainer from '@/src/components/Container/PageWrapper';
import AuthSuccess from '@/src/components/Pages/AuthSuccess';
// import InfoStatusBlock from '@/src/components/InfoStatusBlock';
// import InfoTextLinkBlock from '@/src/components/InfoTextLinkBlock';

// const config = {
//   formHeadingMsg: 'Success! Please check your email',
//   formBottomMsg: 'Did not receive an email? ',
// };

const AuthSuccessPage: React.FC = () => {
  return (
    <PageWrapperContainer>
      <AuthSuccess />
      {/* <div className="auth-success-page">
        <div className="auth-success-card">
          <InfoStatusBlock status="success" text={config.formHeadingMsg} />

          <InfoTextLinkBlock
            text={config.formBottomMsg}
            url={'/api/auth/signin'}
            linkTitle={'Try again'}
          />
        </div>
      </div> */}
    </PageWrapperContainer>
  );
};

export default AuthSuccessPage;
