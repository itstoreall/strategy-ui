import { Dispatch, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaBitcoin } from 'react-icons/fa';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import useDCAPStatus from '@/src/hooks/useDCAPStatus';
import { ExchangeEnum, SortEnum } from '@/src/enums';
import { numberCutter } from '@/src/utils';
import { InputEvent, Order } from '@/src/types';
import SwitchIcon from '@/src/assets/icons/SwitchIcon';
import SelectMulti from '@/src/components/Form/SelectMulti';
import Button from '@/src/components/Button/Button';
import ETHLogo from '@/src/assets/logos/ETHLogo';

type Props = {
  className?:
    | 'admin-main-content-devider'
    | 'prices-devider'
    | 'order-list-devider'
    | 'settings-devider';
  title?: string;
  subTitle?: string | null;
  filterSymbol?: string;
  exchanges?: ExchangeEnum[] | null;
  filterExchange?: ExchangeEnum | null;
  avgBuyPrice?: number;
  currentPrice?: number;
  ordersNumber?: number;
  handleFilterChange?: ((event: InputEvent) => void) | null;
  handleFilterExchange?: (val: ExchangeEnum) => void;
  resetFilter?: () => void;
  sortField?: SortEnum;
  handleSortToggle?: () => void;
  orders?: Order[];
  isBTCButton?: boolean;
  isETHButton?: boolean;
  isSwitchButton?: boolean;
  isDisabled?: boolean;
  setIsDisabled?: Dispatch<SetStateAction<boolean>>;
};

const c = {
  symbolBTC: 'BTC',
  symbolETH: 'ETH',
  avg: 'AVG',
  placeholderExchange: 'Exchange',
  selectFieldExchange: 'exchange',
  filterPlaceholder: 'Filter...',
  percent: 'perc',
  date: 'date',
  symbol: 'symb',
};

const MainDividerSection = (props: Props) => {
  const {
    className,
    title = '',
    subTitle = '',
    filterSymbol,
    exchanges,
    filterExchange,
    avgBuyPrice = 0,
    currentPrice = 0,
    ordersNumber = 0,
    handleFilterChange,
    handleFilterExchange,
    resetFilter,
    sortField,
    handleSortToggle,
    orders,
    isDisabled,
    setIsDisabled,
    isBTCButton,
    isETHButton,
    isSwitchButton = false,
  } = props;

  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const { getSpecStatus } = useDCAPStatus();
  const pathname = usePathname();

  const isBTC = pathname.includes(`-${c.symbolBTC}`);
  const isETH = pathname.includes(`-${c.symbolETH}`);

  // const isBTC = avgBuyPrice > 32000;
  // const isCustom = title === 'Trading';

  const displayAvgBuyPrice = () => {
    alert(`${c.avg}: ${numberCutter(avgBuyPrice, isBTC || isETH ? 0 : 3)}`);
  };

  const handleSelectChange = (field: string, value: string) => {
    if (field && handleFilterExchange) {
      handleFilterExchange(value as ExchangeEnum);
    }
  };

  const toggleSwitch = () => {
    if (!setIsDisabled) return;
    setIsDisabled((prev) => (prev === true ? false : true));
  };

  const nextSortValue =
    sortField === SortEnum.Percent
      ? c.date
      : sortField === SortEnum.Date
      ? c.symbol
      : c.percent;

  // ---

  const subTitleColor = !subTitle?.includes('-') ? 'color-green' : 'color-blue';
  const subTitleStyle = `main-divider-section-subtitle ${subTitleColor}`;
  const isPrices = currentPrice && avgBuyPrice;
  const avgColor = isPrices && currentPrice >= avgBuyPrice ? 'color-green' : '';
  const avgStyle = `main-divider-section-average-price-button ${avgColor}`;
  const btcStatus = getSpecStatus('BTC', orders ?? []);
  const ethStatus = getSpecStatus('ETH', orders ?? []);
  const btcBtnStyle = `main-divider-btc-link ${btcStatus}`;
  const ethBtnStyle = `main-divider-eth-icon-box ${ethStatus}`;

  return (
    <section className={`main-divider ${className}`}>
      {title && <span className="main-divider-section-title">{title}</span>}
      {subTitle && <span className={subTitleStyle}>{subTitle}</span>}

      {ordersNumber > 1 && !isBTC && !isETH && (
        <Button className={avgStyle} clickContent={displayAvgBuyPrice}>
          {c.avg}
        </Button>
      )}

      {isBTCButton && (
        <div className="main-divider-section-btc-link-box">
          <Link
            className={btcBtnStyle}
            href={'/strategy/BUY-BTC'}
            prefetch={false}
          >
            <FaBitcoin size={31} />
          </Link>
        </div>
      )}

      {isETHButton && (
        <div className="main-divider-section-eth-link-box">
          <Link
            className={'main-divider-eth-link'}
            href={'/strategy/BUY-ETH'}
            prefetch={false}
          >
            <span className={ethBtnStyle}>
              <ETHLogo />
              {/* <SiEthereum size={20} /> */}
            </span>
          </Link>
        </div>
      )}

      {handleFilterExchange && exchanges && exchanges.length > 2 && (
        <SelectMulti
          className="main-divider-section-filter-select"
          options={exchanges.filter((opt) => opt !== filterExchange)}
          placeholder={c.placeholderExchange}
          onSelect={(value) => handleSelectChange(c.selectFieldExchange, value)}
          initialOption={ExchangeEnum.All}
          isOpen={openDropdownId === filterExchange}
          onToggle={() => toggleDropdown(filterExchange ?? '')}
          isReset={filterExchange === ExchangeEnum.All}
        />
      )}

      {handleFilterChange && (
        <div className="main-divider-section-filter-input-block">
          <input
            type="text"
            className="main-divider-section-filter-input"
            placeholder={c.filterPlaceholder}
            value={filterSymbol}
            onChange={handleFilterChange}
            onFocus={resetFilter}
          />
        </div>
      )}

      <span className="main-divider-section-divider" />

      {sortField && handleSortToggle && (
        <Button
          clickContent={handleSortToggle}
          className="main-divider-section-sort-toggle-button"
        >
          <span>
            <span>{sortField}</span>
            <span>{nextSortValue}</span>
          </span>
        </Button>
      )}

      {isSwitchButton && (
        <Button className="switch-button" clickContent={toggleSwitch}>
          <SwitchIcon isDisabled={isDisabled ?? true} />
        </Button>
      )}
    </section>
  );
};

export default MainDividerSection;
