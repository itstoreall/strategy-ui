import useModal from '@/src/hooks/useModal';
import CommonModal from './CommonModal';

import { GoXCircleFill } from 'react-icons/go';
import Button from '@/src/components/Button/Button';
import { ChildrenProps } from '@/src/types';

const SettingsModal = ({ children }: ChildrenProps) => {
  const { closeModal, ModalContentEnum } = useModal();

  const CloseButton = () => {
    return (
      <Button className="settings-modal-close-button" clickContent={closeModal}>
        <GoXCircleFill size={'1.5rem'} />
      </Button>
    );
  };

  return (
    <CommonModal className={ModalContentEnum.Settings}>
      <div className={'settings-modal-content'}>
        <CloseButton />
        {children}
      </div>
    </CommonModal>
  );
};

export default SettingsModal;
