import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import CommonModal from '@/src/components/Modal/CommonModal';

const StrategyHistoryModal = ({ children }: ChildrenProps) => {
  const { ModalContentEnum } = useModal();

  return (
    <CommonModal className={ModalContentEnum.StrategyHistory}>
      <div className={'ls-trade-strategy-modal-content'}>{children}</div>
    </CommonModal>
  );
};

export default StrategyHistoryModal;
