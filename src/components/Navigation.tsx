'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { handleSignOut } from '../lib/auth/signOutServerAction';
import Button from './Button';

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

const Navigation = () => {
  const pathname = usePathname();
  const session = useSession();

  console.log(111);

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
      {session && <Button clickContent={handleSignOut}>Log Out</Button>}
    </>
  );
};

export default Navigation;
