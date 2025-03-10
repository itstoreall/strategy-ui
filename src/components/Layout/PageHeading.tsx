import { usePathname, useRouter } from 'next/navigation';
import { IoArrowUndoSharp } from 'react-icons/io5';
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
  fetchTokens?: () => void;

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
  fetchTokens,

  // Right side:
  buttonText,
  role = '',
  isButtonDisabled,
  handleModal,
}: Props) => {
  const path = usePathname();
  const router = useRouter();

  const isDashboard = path === '/dashboard';
  const isStrategy = path.includes('/strategy/');
  const isButton = buttonText && (isDashboard || isStrategy);

  const price = assetPrice ? `$${assetPrice}` : null;

  /*
  console.log('CurrentUserRole:', currentUserRole);
  const isPrice = assetPrice !== null;
  const price = isPrice ? assetPrice : <DotsLoader />;
  */

  const returnFn = () => {
    router.push('/dashboard');
  };

  const updatePrice = () => {
    const key = 'lastFetchPriceTime';
    const now = Date.now();
    const lastFetchPriceTime = localStorage.getItem(key);
    const lastFetchTime = lastFetchPriceTime
      ? parseInt(lastFetchPriceTime, 10)
      : 0;
    if (now - lastFetchTime >= 60000) {
      localStorage.setItem(key, now.toString());
      if (fetchTokens) {
        fetchTokens();
      }
    }
  };

  return (
    <div className="main-heading">
      <span
        className={`${'main-heading-title-block'} ${
          isStrategy ? 'strategy-page' : ''
        }`}
      >
        {isStrategy && (
          <Button
            className="main-heading-return-button"
            clickContent={returnFn}
            disabled={isAdminButtonDisabled}
          >
            <IoArrowUndoSharp size={26} />
          </Button>
        )}

        <Title tag={'h2'} text={title} />

        <span onClick={updatePrice} className={'main-heading-price'}>
          {price}
        </span>
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
