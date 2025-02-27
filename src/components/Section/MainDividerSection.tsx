import { Dispatch, SetStateAction } from 'react';
import SwitchIcon from '@/src/assets/icons/SwitchIcon';
import Button from '@/src/components/Button/Button';

type Props = {
  className?: 'order-list-devider' | 'settings-devider';
  title?: string;
  isSwitchButton?: boolean;
  isDisabled?: boolean;
  setIsDisabled?: Dispatch<SetStateAction<boolean>>;
};

const MainDividerSection = ({
  className,
  title = '',
  isSwitchButton = false,
  isDisabled,
  setIsDisabled,
}: Props) => {
  const toggleSwitch = () => {
    if (!setIsDisabled) return;
    setIsDisabled((prev) => (prev === true ? false : true));
  };

  return (
    <section className={`main-divider ${className}`}>
      {title && <span className="main-divider-section-title">{title}</span>}

      <span className="main-divider-section-divider" />

      {isSwitchButton && (
        <Button className="switch-button" clickContent={toggleSwitch}>
          <SwitchIcon isDisabled={isDisabled ?? false} />
        </Button>
      )}
    </section>
  );
};

export default MainDividerSection;
