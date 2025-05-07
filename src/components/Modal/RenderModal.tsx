import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import FormModal from '@/src/components/Modal/FormModal';
import StrategyModal from '@/src/components/Modal/StrategyModal';

const RenderModal = ({ children }: ChildrenProps) => {
  const { isFormModal, isStrategyModal } = useModal();

  switch (true) {
    case isFormModal:
      return <FormModal>{children}</FormModal>;
    case isStrategyModal:
      return <StrategyModal>{children}</StrategyModal>;
    default:
      return <></>;
  }
};

export default RenderModal;
