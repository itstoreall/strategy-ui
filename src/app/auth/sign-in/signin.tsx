'use client';

import InfoTextLinkBlock from '@/src/components/InfoTextLinkBlock';
import SignIpForm from '@/src/components/SignInForm';

const config = {
  goToSignUpText: 'Did not have an account? ',
};

export const SignInPage: React.FC = () => {
  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>Sign In</h2>
        <SignIpForm />
      </div>

      <InfoTextLinkBlock
        text={config.goToSignUpText}
        url={'/auth/sign-up'}
        linkTitle={'Sign Up'}
      />
    </div>
  );
};
