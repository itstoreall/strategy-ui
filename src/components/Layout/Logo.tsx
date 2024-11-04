import Link from 'next/link';
import { IoIosPaw } from 'react-icons/io';

const Logo = () => {
  return (
    <div className="logo-block">
      <IoIosPaw size={'1.3rem'} />
      <Link href={'/'}>
        <h1 className="logo">strategy</h1>
      </Link>
    </div>
  );
};

export default Logo;
