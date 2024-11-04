import type { Metadata } from 'next';
import Providers from '@/src/providers';
import { ChildrenProps } from '@/src/types';
import '@/src/sass/globals.scss';

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Strategy PWA',
  description: 'Crypto market strategies',
};

// export default function RootLayout() {
export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <Providers>
        {/* <body>
          <ul>
            {[...Array(120)].map((_, index) => (
              <li key={index}>{index + 1}</li>
            ))}
          </ul>
        </body> */}
        <body>{children}</body>
      </Providers>
    </html>
  );
}
