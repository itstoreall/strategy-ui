import PageContainer, { Label } from '@/src/components/Container/Page';
import InfoStatusBlock from '@/src/components/InfoStatusBlock';
import InfoTextLinkBlock from '@/src/components/InfoTextLinkBlock';

const config = {
  formHeadingMsg: 'Something went wrong',
  formBottomMsg: 'To try signing in again, ',
};

const AuthError = () => {
  return (
    <PageContainer label={Label.Auth}>
      <main className="main auth-error">
        <InfoStatusBlock status="error" text={config.formHeadingMsg} />

        <InfoTextLinkBlock
          text={config.formBottomMsg}
          url={'/api/auth/signin'}
          linkTitle={'click here'}
        />
      </main>
    </PageContainer>
  );
};

export default AuthError;
