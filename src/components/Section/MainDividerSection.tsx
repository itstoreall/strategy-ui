import { Dispatch, SetStateAction } from 'react';
import SwitchIcon from '@/src/assets/icons/SwitchIcon';
import Button from '@/src/components/Button/Button';

type Props = {
  isDisabled: boolean;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
};

const MainDividerSection = ({ isDisabled, setIsDisabled }: Props) => {
  const toggleSwitch = () => {
    setIsDisabled((prev) => (prev === true ? false : true));
  };

  return (
    <div className="switch-button-block">
      <span className="switch-button-block-title">Account management</span>
      <span className="switch-button-block-divider" />
      <Button className="switch-button" clickContent={toggleSwitch}>
        <SwitchIcon isDisabled={isDisabled} />
      </Button>
    </div>
  );
};

export default MainDividerSection;
