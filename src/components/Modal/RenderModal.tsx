import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import FormModal from '@/src/components/Modal/FormModal';
import StrategyModal from '@/src/components/Modal/StrategyModal';
import LSStrategyDataModal from '@/src/components/Modal/LSStrategyDataModal';
import StrategyOrderDetailsModal from '@/src/components/Modal/StrategyOrderDetailsModal';

const RenderModal = ({ children }: ChildrenProps) => {
  const {
    isFormModal,
    isStrategyModal,
    isLSStrategyDataModal,
    isStrategyOrderDetails,
  } = useModal();

  switch (true) {
    case isFormModal:
      return <FormModal>{children}</FormModal>;
    case isStrategyModal:
      return <StrategyModal>{children}</StrategyModal>;
    case isLSStrategyDataModal:
      return <LSStrategyDataModal>{children}</LSStrategyDataModal>;
    case isStrategyOrderDetails:
      return <StrategyOrderDetailsModal>{children}</StrategyOrderDetailsModal>;
    default:
      return <></>;
  }
};

export default RenderModal;
