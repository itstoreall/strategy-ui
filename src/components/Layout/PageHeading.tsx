import { usePathname } from 'next/navigation';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';

type Props = {
  title: string;
  role?: 'USER' | 'ADMIN' | '';
  buttonText?: string;
  isButtonDisabled?: boolean;
  handleModal?: () => void;
};

export const headingConfig = {
  addOrder: 'Add Order',
};

const PageHeading = ({
  title,
  role = '',
  buttonText,
  isButtonDisabled,
  handleModal,
}: Props) => {
  const path = usePathname();

  const isButton =
    buttonText && (path === '/dashboard' || path.includes('/strategy/'));

  return (
    <div className="main-heading">
      <Title tag={'h2'} text={title} />

      {role && <span className="user-role">{role}</span>}

      {isButton && (
        <Button
          className="main-heading-button"
          clickContent={handleModal}
          disabled={isButtonDisabled}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default PageHeading;
