import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import FormModal from '@/src/components/Modal/FormModal';
import StrategyModal from '@/src/components/Modal/StrategyModal';
import CustomPriceModal from '@/src/components/Modal/CustomPriceModal';

const RenderModal = ({ children }: ChildrenProps) => {
  const { isFormModal, isStrategyModal, isCustomPriceModal } = useModal();

  switch (true) {
    case isFormModal:
      return <FormModal>{children}</FormModal>;
    case isStrategyModal:
      return <StrategyModal>{children}</StrategyModal>;
    case isCustomPriceModal:
      return <CustomPriceModal>{children}</CustomPriceModal>;
    default:
      return <></>;
  }
};

export default RenderModal;
