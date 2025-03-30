import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosPaw } from 'react-icons/io';
import Title from './Title';

type Props = {
  className?: string;
  iconSize?: string;
};

const Logo = ({ className, iconSize = '20.8px' }: Props) => {
  const path = usePathname();

  const isHomePage = path === '/';

  return (
    <div className={`logo-block ${className}`}>
      <IoIosPaw size={iconSize} />
      <Link href={'/'}>
        <Title text="strategy" className={className} />
        {isHomePage && <span className="logo-pwa">PWA</span>}
      </Link>
    </div>
  );
};

export default Logo;
