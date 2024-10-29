import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthenticated';
import { AccountPage } from '@/src/app/account/account';

const Account: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <AccountPage />;
  }
};

export default Account;
