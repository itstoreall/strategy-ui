'use client';

import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from '@/src/components/Modal/context';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>{children}</ModalProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
