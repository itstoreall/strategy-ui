import { usePathname, useRouter } from 'next/navigation';
import { IoArrowUndoSharp } from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import useGlobalState from '@/src/hooks/useGlobalState';
import { OrderTypeEnum } from '@/src/enums';
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
  mainButtonText?: string;
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
  mainButtonText,
  role = '',
  isButtonDisabled,
  handleModal,
}: Props) => {
  const { fearAndGreed } = useGlobalState();

  const path = usePathname();
  const router = useRouter();

  const isChart = path === '/chart';
  const isDashboard = path === '/dashboard';
  const isStrategy = path.includes('/strategy/');
  const isBear = path.includes(`/strategy/${OrderTypeEnum.Sell}-`);
  const isButton = mainButtonText && (isDashboard || isStrategy);

  const price = assetPrice ? `$${assetPrice}` : null;

  const returnFn = () => {
    router.push('/dashboard');
  };

  /*
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
  */

  // ---

  const pageStyle = isStrategy ? 'strategy-page' : '';
  const titleBlockStyle = `${'main-heading-title-block'} ${pageStyle}`;

  return (
    <div className="main-heading">
      <div className={'main-heading-left-side-block'}>
        <span className={titleBlockStyle}>
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

          {isChart && fearAndGreed > 0 && (
            <span
              className={`main-heading-fear-and-greed-index ${
                fearAndGreed <= 50 ? 'fear' : 'greed'
              }`}
            >
              {`${fearAndGreed < 50 ? 'Fear' : 'Greed'}: ${fearAndGreed}`}
            </span>
          )}

          <span className={'main-heading-price'}>{price}</span>
        </span>

        {/* {role && <span className="user-role">{role}</span>} */}

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
      </div>

      <div className="main-heading-right-side-block">
        {role && <span className="user-role">{role}</span>}

        {/* <Button
          className={'main-heading-ls-trade-strategy-button'}
          clickContent={'handleTemporaryStorage'}
        >
          <GoClock
            className="trade-strategy-calculating-element-button-icon"
            size={20}
          />
        </Button> */}

        {isButton && !isBear && (
          <Button
            className="main-heading-main-button"
            clickContent={handleModal}
            disabled={isButtonDisabled}
          >
            {mainButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeading;
