'use client';

import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalProvider } from '@/src/context/global.context';
import { ModalProvider } from '@/src/context/modal.context';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <ModalProvider>{children}</ModalProvider>
        </GlobalProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
