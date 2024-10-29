import { auth } from '@/src/lib/auth/authConfig';
import Navigation from '@/src/components/Navigation';

export const AccountPage: React.FC = async () => {
  const session = await auth();

  console.log('session:', session);

  return (
    <>
      <Navigation />
      <p>{`Account of ${session?.user?.name}`}</p>
    </>
  );
};
