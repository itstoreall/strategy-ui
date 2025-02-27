import { usePathname } from 'next/navigation';
import { GoPeople } from 'react-icons/go';
import { Role } from '@/src/types';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';

type Props = {
  /*
  isAdmin?: boolean;
  */

  // Left side:
  title: string;
  assetPrice?: number;
  isAdminButton?: boolean;
  adminButtonText?: string;
  isAdminButtonDisabled?: boolean;
  adminButtonFn?: () => void;

  // Right side:
  role?: Role;
  buttonText?: string;
  isButtonDisabled?: boolean;
  handleModal?: () => void;
};

export const headingConfig = {
  create: 'Create',
  addAsset: 'Add Asset',
  addTarget: 'Add Target',
};

const PageHeading = ({
  /*
  isAdmin,
  */

  // Left side:
  title,
  assetPrice,
  isAdminButton,
  adminButtonText,
  isAdminButtonDisabled,
  adminButtonFn,

  // Right side:
  buttonText,
  role = '',
  isButtonDisabled,
  handleModal,
}: Props) => {
  const path = usePathname();

  const isDashboard = path === '/dashboard';
  const isStrategy = path.includes('/strategy/');
  const isButton = buttonText && (isDashboard || isStrategy);

  // console.log('CurrentUserRole:', currentUserRole);

  return (
    <div className="main-heading">
      <span className="main-heading-title-block">
        <Title tag={'h2'} text={title} />

        {assetPrice && (
          <span className={'main-heading-price'}>{assetPrice}</span>
        )}
      </span>

      {role && <span className="user-role">{role}</span>}

      {isAdminButton && (
        <div className="admin-heading-button-block">
          <Button
            className="admin-heading-button"
            clickContent={adminButtonFn}
            disabled={isAdminButtonDisabled}
          >
            <GoPeople size={22} />
          </Button>

          <span className={'admin-heading-button-userId'}>
            {adminButtonText}
          </span>
        </div>
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
