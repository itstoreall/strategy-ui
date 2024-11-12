import PageContainer, { Label } from '@/src/components/Container/Page';
import InfoTextLinkBlock from '@/src/components/InfoTextLinkBlock';
import SignIpForm from '@/src/components/Form/SignInForm';
// import FormWrapper from '@/src/components/Container/FormWrapper';

const config = {
  goToSignUpText: 'Did not have an account? ',
};

const SignIn = () => {
  return (
    <PageContainer label={Label.Auth}>
      <main className="main auth">
        {/* <PageHeading title={config.pageTitle} /> */}
        {/* <FormWrapper className="signin-form-wrapper"> */}
        <SignIpForm />

        <InfoTextLinkBlock
          text={config.goToSignUpText}
          url={'/auth/sign-up'}
          linkTitle={'Sign Up'}
        />
        {/* </FormWrapper> */}
      </main>
    </PageContainer>
  );
};

export default SignIn;
