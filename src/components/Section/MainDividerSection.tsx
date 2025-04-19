import { Dispatch, SetStateAction } from 'react';
import { InputEvent } from '@/src/types';
import { SortEnum } from '@/src/enums';
import { uniNumberFormatter } from '@/src/utils';
import SwitchIcon from '@/src/assets/icons/SwitchIcon';
import Button from '@/src/components/Button/Button';

type Props = {
  className?:
    | 'admin-main-content-devider'
    | 'prices-devider'
    | 'order-list-devider'
    | 'settings-devider';
  title?: string;
  subTitle?: string | null;
  filterSymbol?: string;
  avgBuyPrice?: number;
  currentPrice?: number;
  ordersNumber?: number;
  handleFilterChange?: (event: InputEvent) => void;
  resetFilter?: () => void;
  sortField?: SortEnum;
  handleSortToggle?: () => void;
  isSwitchButton?: boolean;
  isDisabled?: boolean;
  setIsDisabled?: Dispatch<SetStateAction<boolean>>;
};

const config = {
  avg: 'AVG',
  filterPlaceholder: 'Filter...',
};

const MainDividerSection = (props: Props) => {
  const {
    className,
    title = '',
    subTitle = '',
    filterSymbol,
    avgBuyPrice = 0,
    currentPrice = 0,
    ordersNumber = 0,
    handleFilterChange,
    resetFilter,
    sortField,
    handleSortToggle,
    isDisabled,
    setIsDisabled,
    isSwitchButton = false,
  } = props;

  const displayAvgBuyPrice = () => {
    alert(`${config.avg}: ${uniNumberFormatter(avgBuyPrice)}`);
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
  const avgColor = currentPrice >= avgBuyPrice ? 'color-green' : 'color-grey';
  const avgStyle = `main-divider-section-average-price-button ${avgColor}`;

  return (
    <section className={`main-divider ${className}`}>
      {title && <span className="main-divider-section-title">{title}</span>}
      {subTitle && <span className={subTitleStyle}>{subTitle}</span>}

      {ordersNumber > 1 && (
        <Button className={avgStyle} clickContent={displayAvgBuyPrice}>
          {config.avg}
        </Button>
      )}

      {handleFilterChange && (
        <div className="main-divider-section-filter-input-block">
          <input
            type="text"
            className="main-divider-section-filter-input"
            placeholder={config.filterPlaceholder}
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
            <span>
              <span>Sorting by</span>
              {sortField}
            </span>
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
