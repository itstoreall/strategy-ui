import Link from 'next/link';
import { IoIosPaw } from 'react-icons/io';

type Props = {
  className?: string;
  iconSize?: string;
};

const Logo = ({ className, iconSize = '1.3rem' }: Props) => {
  return (
    <div className={`logo-block ${className}`}>
      <IoIosPaw size={iconSize} />
      <Link href={'/'}>
        <h1 className="logo">strategy</h1>
      </Link>
    </div>
  );
};

export default Logo;
