'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SessionContextValue } from 'next-auth/react';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';
import Button from './Button';

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
  { label: 'account', href: '/account' },
];

const Navigation: React.FC<Props> = ({ session }) => {
  const pathname = usePathname();

  const isAuth = session.status === 'authenticated';

  useEffect(() => {
    console.log('user:', session.status);
  }, [session]);

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.label}
            href={link.href}
            className={isActive ? 'active' : ''}
          >
            {link.label}
          </Link>
        );
      })}
      {isAuth && <Button clickContent={handleSignOut}>Log Out</Button>}
    </>
  );
};

export default Navigation;
