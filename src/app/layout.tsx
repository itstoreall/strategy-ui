import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import '@/src/sass/globals.scss';

type ChildrenProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Strategy PWA',
  description: 'Crypto market strategies',
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>{children}</body>
      </SessionProvider>
    </html>
  );
}
