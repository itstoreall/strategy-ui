import Link from 'next/link';
import { IoIosPaw } from 'react-icons/io';
import Title from './Title';

type Props = {
  className?: string;
  iconSize?: string;
};

const Logo = ({ className, iconSize = '1.3rem' }: Props) => {
  return (
    <div className={`logo-block ${className}`}>
      <IoIosPaw size={iconSize} />
      <Link href={'/'}>
        <Title text="strategy" className={className} />
      </Link>
    </div>
  );
};

export default Logo;
