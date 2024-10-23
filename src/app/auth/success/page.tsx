/*
import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthenticated';
*/
import AuthSuccessPage from './success';

const Success: React.FC = async () => {
  return <AuthSuccessPage />;

  /*
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    console.log(1, 'isAuthenticated --->', isAuthenticated);
    return <AuthSuccessPage />;
  } else {
    console.log(2, 'isAuthenticated --->', isAuthenticated);
    redirect('/dashboard');
  }
  */
};

export default Success;
