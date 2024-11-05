'use client';

import { useSession } from 'next-auth/react';
import PageWrapper from '../components/Container/PageWrapper';
// import Button from '@/src/components/Button/Button';
import Logo from '../components/Layout/Logo';
import Navigation from '../components/Layout/Navigation';

const Home: React.FC = () => {
  const session = useSession();

  return (
    <PageWrapper>
      <div className="home-page">
        <Logo className="home-page-logo" iconSize={'4rem'} />
        <Navigation session={session} className={'home-page-nav'} />
      </div>
    </PageWrapper>
  );

  // return (
  //   <div className="home-page">
  //     <Logo />
  //     {/* <div className="button-block">
  //       <Button clickContent="/auth/sign-in">Sign In</Button>
  //     </div> */}
  //     <Navigation session={session} />
  //   </div>
  // );
};

export default Home;
