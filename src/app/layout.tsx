import type { Metadata } from 'next';
import Providers from '@/src/providers';
import { ChildrenProps } from '@/src/types';
import '@/src/sass/globals.scss';

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Strategy PWA',
  description: 'Crypto market strategies',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <head>
        <title>Strategy PWA</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="format-detection" content="email=no" />
      </head>

      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
