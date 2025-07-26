import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import FormModal from '@/src/components/Modal/FormModal';
import StrategyModal from '@/src/components/Modal/StrategyModal';
import StrategyHistoryModal from '@/src/components/Modal/StrategyHistoryModal';
import StrategyOrderDetailsModal from '@/src/components/Modal/StrategyOrderDetailsModal';

const RenderModal = ({ children }: ChildrenProps) => {
  const {
    isFormModal,
    isStrategyModal,
    isStrategyHistoryModal,
    isStrategyOrderDetails,
  } = useModal();

  switch (true) {
    case isFormModal:
      return <FormModal>{children}</FormModal>;
    case isStrategyModal:
      return <StrategyModal>{children}</StrategyModal>;
    case isStrategyHistoryModal:
      return <StrategyHistoryModal>{children}</StrategyHistoryModal>;
    case isStrategyOrderDetails:
      return <StrategyOrderDetailsModal>{children}</StrategyOrderDetailsModal>;
    default:
      return <></>;
  }
};

export default RenderModal;
