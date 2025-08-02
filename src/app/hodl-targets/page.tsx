import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthenticated';
import { HodlTargetsPage } from '@/src/app/hodl-targets/hodlTargets';

const HodlTargets: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <HodlTargetsPage />;
  }
};

export default HodlTargets;
