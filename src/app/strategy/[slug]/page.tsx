import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthenticated';
import { StrategyPage } from '@/src/app/strategy/[slug]/strategy';

const Strategy: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <StrategyPage />;
  }
};

export default Strategy;
