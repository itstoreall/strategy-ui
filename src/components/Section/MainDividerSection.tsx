import { Dispatch, SetStateAction } from 'react';
import { InputEvent } from '@/src/types';
import { ExchangeEnum, SortEnum } from '@/src/enums';
import { uniNumberFormatter } from '@/src/utils';
import SwitchIcon from '@/src/assets/icons/SwitchIcon';
import Button from '@/src/components/Button/Button';
import SelectMulti from '../Form/SelectMulti';
import useSelectMulti from '@/src/hooks/useSelectMulti';

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
  isSwitchButton?: boolean;
  isDisabled?: boolean;
  setIsDisabled?: Dispatch<SetStateAction<boolean>>;
};

const c = {
  avg: 'AVG',
  placeholderExchange: 'Exchange',
  selectFieldExchange: 'exchange',
  filterPlaceholder: 'Filter...',
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
    isDisabled,
    setIsDisabled,
    isSwitchButton = false,
  } = props;

  const { openDropdownId, toggleDropdown } = useSelectMulti();

  const displayAvgBuyPrice = () => {
    alert(`${c.avg}: ${uniNumberFormatter(avgBuyPrice)}`);
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
      ? SortEnum.Date
      : sortField === SortEnum.Date
      ? SortEnum.Symbol
      : SortEnum.Percent;

  // ---

  const subTitleColor = !subTitle?.includes('-') ? 'color-green' : 'color-blue';
  const subTitleStyle = `main-divider-section-subtitle ${subTitleColor}`;
  const isPrices = currentPrice && avgBuyPrice;
  const avgColor = isPrices && currentPrice >= avgBuyPrice ? 'color-green' : '';
  const avgStyle = `main-divider-section-average-price-button ${avgColor}`;

  return (
    <section className={`main-divider ${className}`}>
      {title && <span className="main-divider-section-title">{title}</span>}
      {subTitle && <span className={subTitleStyle}>{subTitle}</span>}

      {ordersNumber > 1 && (
        <Button className={avgStyle} clickContent={displayAvgBuyPrice}>
          {c.avg}
        </Button>
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
          <SwitchIcon isDisabled={isDisabled ?? false} />
        </Button>
      )}
    </section>
  );
};

export default MainDividerSection;
