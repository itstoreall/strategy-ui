import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthenticated';
import { SignUpPage } from '@/src/app/auth/sign-up/signup';

const SignUp: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect('/dashboard');
  } else {
    return <SignUpPage />;
  }
};

export default SignUp;
