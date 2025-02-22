import { usePathname } from 'next/navigation';
import { GoPeople } from 'react-icons/go';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';

type Props = {
  title: string;
  role?: 'USER' | 'ADMIN' | '';
  isAdminButton?: boolean;
  isAdminButtonDisabled?: boolean;
  adminButtonFn?: () => void;
  buttonText?: string;
  isButtonDisabled?: boolean;
  handleModal?: () => void;
};

export const headingConfig = {
  addAsset: 'Add Asset',
  addTarget: 'Add Target',
};

const PageHeading = ({
  title,
  role = '',
  isAdminButton,
  isAdminButtonDisabled,
  adminButtonFn,
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

      {isAdminButton && (
        <Button
          className="admin-heading-button"
          clickContent={adminButtonFn}
          disabled={isAdminButtonDisabled}
        >
          <GoPeople size={22} />
        </Button>
      )}

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
