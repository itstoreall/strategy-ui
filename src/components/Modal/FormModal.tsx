import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import CommonModal from './CommonModal';

const FormModal = ({ children }: ChildrenProps) => {
  const { ModalContentEnum } = useModal();

  return (
    <CommonModal className={ModalContentEnum.Form}>
      <div className={'form-modal-content'}>{children}</div>
    </CommonModal>
  );
};

export default FormModal;
