'use client';

import { useSession } from 'next-auth/react';
import PageWrapper from '../components/Container/PageWrapper';
import Logo from '../components/Layout/Logo';
import Navigation from '../components/Layout/Navigation';

export default function HomePage() {
  const session = useSession();

  return (
    <PageWrapper>
      <div className="home-page">
        <Logo className="home-page-logo" iconSize={'5.5rem'} />
        <Navigation session={session} className={'home-page-nav'} />
      </div>
    </PageWrapper>
  );
}
