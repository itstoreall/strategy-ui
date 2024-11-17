import { SessionContextValue } from 'next-auth/react';
import Logo from '@/src/components/Layout/Logo';
// import Navigation from '../Layout/Navigation';

type Props = { session: SessionContextValue };

const Home = ({ session }: Props) => {
  console.log(session && 'strategy');

  return (
    <div className="home-page">
      <Logo className="home-page-logo" iconSize={'8rem'} />
      {/* <Navigation session={session} className={'home-page-nav'} /> */}
    </div>
  );
};

export default Home;
