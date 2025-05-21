import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import FormModal from '@/src/components/Modal/FormModal';
import StrategyModal from '@/src/components/Modal/StrategyModal';
import LSStrategyDataModal from '@/src/components/Modal/LSStrategyDataModal';

const RenderModal = ({ children }: ChildrenProps) => {
  const { isFormModal, isStrategyModal, isLSStrategyDataModal } = useModal();

  switch (true) {
    case isFormModal:
      return <FormModal>{children}</FormModal>;
    case isStrategyModal:
      return <StrategyModal>{children}</StrategyModal>;
    case isLSStrategyDataModal:
      return <LSStrategyDataModal>{children}</LSStrategyDataModal>;
    default:
      return <></>;
  }
};

export default RenderModal;
