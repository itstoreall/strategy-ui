import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import SettingsModal from '@/src/components/Modal/FormModal';

const RenderModal = ({ children }: ChildrenProps) => {
  const { isFormModal } = useModal();

  switch (true) {
    case isFormModal:
      return <SettingsModal>{children}</SettingsModal>;
    default:
      return <></>;
  }
};

export default RenderModal;
