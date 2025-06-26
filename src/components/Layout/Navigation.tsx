'use client';

import { useEffect } from 'react';
import { SessionContextValue } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GoProject } from 'react-icons/go';
import { GoUnlock } from 'react-icons/go';
import { GoLock } from 'react-icons/go';
import { GoGraph } from 'react-icons/go';
import { GoGear } from 'react-icons/go';
import useGlobalState from '@/src/hooks/useGlobalState';
import { AuthRoleEnum } from '@/src/enums';

type Props = { session: SessionContextValue; className?: string };

const c = {
  admin: 'admin',
  chart: 'chart',
  dashboard: 'dashboard',
  settings: 'settings',
};

const navLinks = [
  { label: c.admin, href: '/admin' },
  { label: c.chart, href: '/chart' },
  { label: c.dashboard, href: '/dashboard' },
  { label: c.settings, href: '/settings' },
];

const Navigation: React.FC<Props> = ({ session, className }) => {
  const { userRole } = useGlobalState();
  const pathname = usePathname();

  useEffect(() => {
    if (!session.status) console.log('no user!');
  }, [session]);

  return (
    <nav className={`nav ${className}`}>
      {navLinks.map(({ label, href }) => {
        const isActive = pathname === href;
        const isAdmin = userRole === AuthRoleEnum.Admin;

        const linkItem =
          label === c.admin ? (
            isAdmin ? (
              <GoUnlock size={'20.8px'} />
            ) : (
              <GoLock size={'20.8px'} />
            )
          ) : label === c.chart ? (
            <GoGraph size={'20.8px'} />
          ) : label === c.dashboard ? (
            <GoProject size={'20.8px'} />
          ) : label === c.settings ? (
            <GoGear size={'20.8px'} />
          ) : (
            label
          );

        const isDisabled = label === c.admin && !isAdmin;
        const activeStyle = isActive ? 'active' : '';
        const rotateStyle = label === c.dashboard ? 'rotate' : '';
        const disabledStyle = isDisabled ? 'disable' : '';
        const linkStyle = `${activeStyle} ${rotateStyle} ${disabledStyle}`;

        return isDisabled ? (
          <span key={label} className={`link ${linkStyle}`}>
            {linkItem}
          </span>
        ) : (
          <Link
            key={label}
            href={href}
            className={`link ${linkStyle}`}
            prefetch={false}
          >
            {linkItem}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
