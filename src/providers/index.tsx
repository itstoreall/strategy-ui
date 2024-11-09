'use client';

import { SessionProvider } from 'next-auth/react';
import { ModalProvider } from '../components/Modal/context';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ModalProvider>{children}</ModalProvider>
    </SessionProvider>
  );
};

export default Providers;
