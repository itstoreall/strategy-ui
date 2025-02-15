import { usePathname } from 'next/navigation';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';

type Props = {
  title: string;
  role?: 'USER' | 'ADMIN' | '';
  handleModal?: () => void;
};

const config = {
  addOrder: 'Add Order',
};

const PageHeading = ({ title, role = '', handleModal }: Props) => {
  const path = usePathname();

  return (
    <div className="main-heading">
      <Title tag={'h2'} text={title} />

      {role && <span className="user-role">{role}</span>}

      {path === '/dashboard' && (
        <Button className="main-heading-button" clickContent={handleModal}>
          {config.addOrder}
        </Button>
      )}
    </div>
  );
};

export default PageHeading;
