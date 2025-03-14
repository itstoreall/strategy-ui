import { Dispatch, SetStateAction } from 'react';
import SwitchIcon from '@/src/assets/icons/SwitchIcon';
import { InputEvent } from '@/src/types';
import { SortEnum } from '@/src/enums';
import Button from '@/src/components/Button/Button';

type Props = {
  className?: 'order-list-devider' | 'settings-devider';
  title?: string;
  subTitle?: string | null;
  filterSymbol?: string;
  handleFilterChange?: (event: InputEvent) => void;
  resetFilter?: () => void;
  sortField?: SortEnum;
  handleSortToggle?: () => void;
  isSwitchButton?: boolean;
  isDisabled?: boolean;
  setIsDisabled?: Dispatch<SetStateAction<boolean>>;
};

const MainDividerSection = ({
  className,
  title = '',
  subTitle = '',
  filterSymbol,
  handleFilterChange,
  resetFilter,
  sortField,
  handleSortToggle,
  isDisabled,
  setIsDisabled,
  isSwitchButton = false,
}: Props) => {
  const toggleSwitch = () => {
    if (!setIsDisabled) return;
    setIsDisabled((prev) => (prev === true ? false : true));
  };

  // ---

  const subTitleColor = !subTitle?.includes('-') ? 'color-green' : 'color-blue';
  const subTitleStyle = `main-divider-section-subtitle ${subTitleColor}`;

  return (
    <section className={`main-divider ${className}`}>
      {title && <span className="main-divider-section-title">{title}</span>}

      {subTitle && <span className={subTitleStyle}>{subTitle}</span>}

      {handleFilterChange && (
        <div className="main-divider-section-filter-input-block">
          <input
            type="text"
            className="main-divider-section-filter-input"
            placeholder="Filter..."
            value={filterSymbol}
            onChange={handleFilterChange}
          />
          <Button
            className="main-divider-section-filter-reset-button"
            clickContent={resetFilter}
          >
            {''}
          </Button>
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
