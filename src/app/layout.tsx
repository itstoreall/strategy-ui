import type { Metadata } from 'next';
import Providers from '../providers';
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
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
