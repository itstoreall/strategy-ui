/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { SessionContextValue } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProgressLoader from '@/src/assets/animation/ProgressLoader';
import Logo from '@/src/components/Layout/Logo';

type Props = { session: SessionContextValue };

const Home = ({ session }: Props) => {
  const router = useRouter();

  useEffect(() => {
    console.log(session && 'strategy');

    // /*
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
    // */
  }, [router]);

  return (
    <div className="home-page">
      <Logo className="home-page-logo" iconSize={'7.5rem'} />
      <ProgressLoader duration={3000} />
    </div>
  );
};

export default Home;
