import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import CommonModal from '@/src/components/Modal/CommonModal';

const StrategyOrderDetailsModal = ({ children }: ChildrenProps) => {
  const { ModalContentEnum } = useModal();

  return (
    <CommonModal className={ModalContentEnum.OrderDetails}>
      <div className={'strategy-order-details-modal-content'}>{children}</div>
    </CommonModal>
  );
};

export default StrategyOrderDetailsModal;
