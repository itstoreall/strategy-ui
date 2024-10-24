'use client';

import InfoTextLinkBlock from '@/src/components/InfoTextLinkBlock';
import SignUpForm from '@/src/components/SignUpForm';

const config = {
  goToSignInText: 'Already have an account? ',
};

export const SignUpPage: React.FC = () => {
  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>Sign Up</h2>
        <SignUpForm />
      </div>

      <InfoTextLinkBlock
        text={config.goToSignInText}
        url={'/auth/sign-in'}
        linkTitle={'Sign In'}
      />
    </div>
  );
};
