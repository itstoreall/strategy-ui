import InfoStatusBlock from '@/src/components/InfoStatusBlock';
import InfoTextLinkBlock from '@/src/components/InfoTextLinkBlock';

const config = {
  formHeadingMsg: 'Oops, something went wrong.',
  formBottomMsg: 'To go back to the sign in page, ',
};

const AuthErrorPage: React.FC = () => {
  return (
    <div className="auth-error-page">
      <div className="auth-error-card">
        <InfoStatusBlock status="error" text={config.formHeadingMsg} />

        <InfoTextLinkBlock
          text={config.formBottomMsg}
          url={'/api/auth/signin'}
          linkTitle={'click here'}
        />
      </div>
    </div>
  );
};

export default AuthErrorPage;
