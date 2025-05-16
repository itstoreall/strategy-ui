import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import CommonModal from '@/src/components/Modal/CommonModal';

const CustomPriceModal = ({ children }: ChildrenProps) => {
  const { ModalContentEnum } = useModal();

  return (
    <CommonModal className={ModalContentEnum.CustomPrice}>
      <div className={'custom-price-modal-content'}>{children}</div>
    </CommonModal>
  );
};

export default CustomPriceModal;
