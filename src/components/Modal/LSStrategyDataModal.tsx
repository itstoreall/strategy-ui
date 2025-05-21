import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import CommonModal from '@/src/components/Modal/CommonModal';

const LSStrategyDataModal = ({ children }: ChildrenProps) => {
  const { ModalContentEnum } = useModal();

  return (
    <CommonModal className={ModalContentEnum.LSStrategyData}>
      <div className={'trade-strategy-modal-content'}>{children}</div>
    </CommonModal>
  );
};

export default LSStrategyDataModal;
