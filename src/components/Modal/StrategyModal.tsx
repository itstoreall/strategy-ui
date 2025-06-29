import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import CommonModal from '@/src/components/Modal/CommonModal';

const StrategyModal = ({ children }: ChildrenProps) => {
  const { ModalContentEnum } = useModal();

  return (
    <CommonModal className={ModalContentEnum.Strategy}>
      <div className={'trade-strategy-modal-content'}>{children}</div>
    </CommonModal>
  );
};

export default StrategyModal;
