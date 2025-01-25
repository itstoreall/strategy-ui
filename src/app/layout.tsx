import type { Metadata } from 'next';
import Providers from '@/src/providers';
import { ChildrenProps } from '@/src/types';
import '@/src/sass/globals.scss';

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Strategy PWA',
  description: 'Crypto market strategies',
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <title>Strategy PWA</title>
      </head>

      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
