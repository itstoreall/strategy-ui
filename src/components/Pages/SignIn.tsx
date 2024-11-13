import PageContainer, { Label } from '@/src/components/Container/Page';
import InfoTextLinkBlock from '@/src/components/InfoTextLinkBlock';
import SignInForm from '@/src/components/Form/SignInForm';

const config = {
  goToSignUpText: 'Do not have an account? ',
};

const SignIn = () => {
  return (
    <PageContainer label={Label.Auth}>
      <main className="main auth">
        <SignInForm />

        <InfoTextLinkBlock
          text={config.goToSignUpText}
          url={'/auth/sign-up'}
          linkTitle={'Sign Up'}
        />
      </main>
    </PageContainer>
  );
};

export default SignIn;
