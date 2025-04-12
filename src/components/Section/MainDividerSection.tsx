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
  handleFilterChange?: (event: InputEvent) => void;
  resetFilter?: () => void;
  sortField?: SortEnum;
  handleSortToggle?: () => void;
  isSwitchButton?: boolean;
  isDisabled?: boolean;
  setIsDisabled?: Dispatch<SetStateAction<boolean>>;
};

const MainDividerSection = (props: Props) => {
  const {
    className,
    title = '',
    subTitle = '',
    filterSymbol,
    avgBuyPrice = 0,
    handleFilterChange,
    resetFilter,
    sortField,
    handleSortToggle,
    isDisabled,
    setIsDisabled,
    isSwitchButton = false,
  } = props;

  // useEffect(() => {
  //   console.log('27.97528:', uniNumberFormatter(27.97528));
  //   console.log('0.03456:', uniNumberFormatter(0.03456));
  //   console.log('1.01234:', uniNumberFormatter(1.01234));
  //   console.log('0.0000034562:', uniNumberFormatter(0.0000034562));
  // }, []);

  const displayAvgBuyPrice = () => {
    alert(`AVG: ${uniNumberFormatter(avgBuyPrice)}`);
  };

  const toggleSwitch = () => {
    if (!setIsDisabled) return;
    setIsDisabled((prev) => (prev === true ? false : true));
  };

  // ---

  const subTitleColor = !subTitle?.includes('-') ? 'color-green' : 'color-blue';
  const subTitleStyle = `main-divider-section-subtitle ${subTitleColor}`;
  const avgColor = true ? 'color-green' : 'color-blue';
  const avgStyle = `main-divider-section-average-price-button ${avgColor}`;

  return (
    <section className={`main-divider ${className}`}>
      {title && <span className="main-divider-section-title">{title}</span>}
      {subTitle && <span className={subTitleStyle}>{subTitle}</span>}

      {subTitle && (
        <Button className={avgStyle} clickContent={displayAvgBuyPrice}>
          {'AVG'}
        </Button>
      )}

      {handleFilterChange && (
        <div className="main-divider-section-filter-input-block">
          <input
            type="text"
            className="main-divider-section-filter-input"
            placeholder="Filter..."
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
            {sortField === SortEnum.Percent
              ? SortEnum.Date
              : sortField === SortEnum.Date
              ? SortEnum.Symbol
              : SortEnum.Percent}
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
