'use client';

import { useEffect, useState } from 'react';
import { SessionContextValue } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GoProject } from 'react-icons/go';
import { GoUnlock } from 'react-icons/go';
import { GoGraph } from 'react-icons/go';
import { GoGear } from 'react-icons/go';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';

type Props = { session: SessionContextValue; className?: string };

const navLinks = [
  { label: 'admin', href: '/admin' },
  { label: 'chart', href: '/chart' },
  { label: 'dashboard', href: '/dashboard' },
  { label: 'settings', href: '/settings' },
];

const Navigation: React.FC<Props> = ({ session, className }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    getUserRole().then((res) => {
      if (res?.role === 'ADMIN') {
        setIsAdmin(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!session.status) console.log('no user!');
  }, [session]);

  /*
   */

  return (
    <nav className={`nav ${className}`}>
      {navLinks.map(({ label, href }) => {
        const isActive = pathname === href;

        const linkItem =
          label === 'admin' ? (
            <GoUnlock size={'1.3rem'} />
          ) : label === 'chart' ? (
            <GoGraph size={'1.3rem'} />
          ) : label === 'dashboard' ? (
            <GoProject size={'1.3rem'} />
          ) : label === 'settings' ? (
            <GoGear size={'1.3rem'} />
          ) : (
            label
          );

        const isDisabled = label === 'admin' && !isAdmin;
        const activeStyle = isActive ? 'active' : '';
        const rotateStyle = label === 'dashboard' ? 'rotate' : '';
        const disabledStyle = isDisabled ? 'disable' : '';
        const linkStyle = `${activeStyle} ${rotateStyle} ${disabledStyle}`;

        return isDisabled ? (
          <span key={label} className={`link ${linkStyle}`}>
            {linkItem}
          </span>
        ) : (
          <Link key={label} href={href} className={`link ${linkStyle}`}>
            {linkItem}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
