import PageContainer, { Label } from '@/src/components/Container/Page';
import InfoStatusBlock from '@/src/components/InfoStatusBlock';
import InfoTextLinkBlock from '@/src/components/InfoTextLinkBlock';

const config = {
  formHeadingMsg: 'Please check your email',
  formBottomMsg: 'Did not receive an email? ',
};

const AuthSuccess = () => {
  return (
    <PageContainer label={Label.Auth}>
      <main className="main auth-success">
        <InfoStatusBlock status="success" text={config.formHeadingMsg} />

        <InfoTextLinkBlock
          text={config.formBottomMsg}
          url={'/api/auth/signin'}
          linkTitle={'Try again'}
        />
      </main>
    </PageContainer>
  );
};

export default AuthSuccess;
