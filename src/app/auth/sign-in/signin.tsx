'use client';

// import InfoTextLinkBlock from '@/src/components/InfoTextLinkBlock';
// import SignIpForm from '@/src/components/Form/SignInForm';
import PageWrapperContainer from '@/src/components/Container/PageWrapper';
import SignIn from '@/src/components/Pages/SignIn';

// const config = {
//   goToSignUpText: 'Did not have an account? ',
// };

export const SignInPage: React.FC = () => {
  return (
    <PageWrapperContainer>
      <SignIn />
      {/* <div className="signin-page"> */}
      {/* <div className="signin-card"> */}
      {/* <h2>Sign In</h2>
      <SignIpForm /> */}
      {/* </div> */}

      {/* <InfoTextLinkBlock
        text={config.goToSignUpText}
        url={'/auth/sign-up'}
        linkTitle={'Sign Up'}
      /> */}
      {/* </div> */}
    </PageWrapperContainer>
  );
};
