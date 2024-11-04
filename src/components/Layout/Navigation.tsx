'use client';

import { useEffect } from 'react';
import { SessionContextValue } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GoProject } from 'react-icons/go';
import { GoUnlock } from 'react-icons/go';
import { GoGear } from 'react-icons/go';

type Props = { session: SessionContextValue };

const navLinks = [
  { label: 'admin', href: '/admin' },
  { label: 'dashboard', href: '/dashboard' },
  { label: 'settings', href: '/settings' },
];

const Navigation: React.FC<Props> = ({ session }) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log('user:', session.status);
  }, [session]);

  return (
    <nav className="nav">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        const linkItem =
          link.label === 'admin' ? (
            <GoUnlock size={'1.3rem'} />
          ) : link.label === 'dashboard' ? (
            <GoProject size={'1.3rem'} />
          ) : link.label === 'settings' ? (
            <GoGear size={'1.3rem'} />
          ) : (
            link.label
          );

        return (
          <Link
            key={link.label}
            href={link.href}
            className={isActive ? 'active' : ''}
          >
            {linkItem}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
