'use client';

import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardProvider } from '@/src/context/dashboard.context';
import { ModalProvider } from '@/src/context/modal.context';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <DashboardProvider>
          <ModalProvider>{children}</ModalProvider>
        </DashboardProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
