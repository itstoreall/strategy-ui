'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { GoGear } from 'react-icons/go';
import { GoUnlock } from 'react-icons/go';
import { GoProject } from 'react-icons/go';
import { usePathname } from 'next/navigation';
import { SessionContextValue } from 'next-auth/react';

type Props = { session: SessionContextValue };

/*
type NavLink = {
  label: string;
  href: string;
};

type Props = {
  navLinks: NavLink[];
};
*/

const navLinks = [
  { label: 'dashboard', href: '/dashboard' },
  { label: 'admin', href: '/admin' },
  { label: 'settings', href: '/settings' },
];

const Navigation: React.FC<Props> = ({ session }) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log('user:', session.status);
  }, [session]);

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        const linkItem =
          link.label === 'dashboard' ? (
            <GoProject size={30} />
          ) : link.label === 'admin' ? (
            <GoUnlock size={30} />
          ) : link.label === 'settings' ? (
            <GoGear size={30} />
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
    </>
  );
};

export default Navigation;
