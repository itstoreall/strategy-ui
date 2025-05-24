import { usePathname, useRouter } from 'next/navigation';
import { IoArrowUndoSharp } from 'react-icons/io5';
import { GoClock, GoPeople } from 'react-icons/go';
import useGlobalState from '@/src/hooks/useGlobalState';
import { ModalContentEnum, OrderTypeEnum } from '@/src/enums';
import { Role } from '@/src/types';
import { StoredData } from '@/src/components/Pages/Dashboard';
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
  storedStrategyData?: StoredData;
  // storedStrategyData?: { symbol: string }[] | null;
  mainButtonText?: string;
  role?: Role;
  isButtonDisabled?: boolean;
  handleModal?: (cont: ModalContentEnum) => void;
  // handleModal?: () => void;
};

export const c = {
  create: 'Create',
  addAsset: 'Add Asset',
  addTarget: 'Add Target',
  chart: '/chart',
  dashboard: '/dashboard',
  strategy: '/strategy',
  form: 'form',
  ls: 'ls',
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
  storedStrategyData,
  mainButtonText,
  role = '',
  isButtonDisabled,
  handleModal,
}: Props) => {
  const { fearAndGreed } = useGlobalState();

  const path = usePathname();
  const router = useRouter();

  const isChart = path === c.chart;
  const isDashboard = path === c.dashboard;
  const isStrategy = path.includes(`${c.strategy}/`);
  const isBear = path.includes(`${c.strategy}/${OrderTypeEnum.Sell}-`);
  const isButton = mainButtonText && (isDashboard || isStrategy);

  const price = assetPrice ? `$${assetPrice}` : null;

  const openModal = (content: string) => {
    if (handleModal) {
      handleModal(
        content === c.ls
          ? ModalContentEnum.LSStrategyData
          : ModalContentEnum.Form
      );
    }
  };

  const returnFn = () => {
    router.push(c.dashboard);
  };

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

        {isAdminButton && (
          <div className="admin-heading-button-block">
            <Button
              className="admin-heading-button"
              clickContent={adminButtonFn}
              disabled={isAdminButtonDisabled}
            >
              <GoPeople size={22} />
              {null}
            </Button>

            <span className={'admin-heading-button-userId'}>
              {adminButtonText}
            </span>
          </div>
        )}
      </div>

      <div className="main-heading-right-side-block">
        {isDashboard && !!storedStrategyData && (
          <Button
            className={'main-heading-ls-trade-strategy-button'}
            clickContent={() => openModal(c.ls)}
          >
            <GoClock
              className="trade-strategy-calculating-element-button-icon"
              size={20}
            />
          </Button>
        )}

        {isButton && !isBear && (
          <Button
            className="main-heading-main-button"
            clickContent={() => openModal(c.form)}
            disabled={isButtonDisabled}
          >
            {mainButtonText}
          </Button>
        )}

        {role && <span className="user-role">{role}</span>}
      </div>
    </div>
  );
};

export default PageHeading;
