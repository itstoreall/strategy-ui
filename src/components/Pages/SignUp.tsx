import PageContainer, { Label } from '@/src/components/Container/Page';
import InfoTextLinkBlock from '@/src/components/InfoTextLinkBlock';
import SignUpForm from '@/src/components/Form/SignUpForm';

const config = {
  goToSignInText: 'Already have an account? ',
};

const SignUp = () => {
  return (
    <PageContainer label={Label.Auth}>
      <main className="main auth">
        <SignUpForm />

        <InfoTextLinkBlock
          text={config.goToSignInText}
          url={'/auth/sign-in'}
          linkTitle={'Sign In'}
        />
      </main>
    </PageContainer>
  );
};

export default SignUp;
