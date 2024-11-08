import useModal from '@/src/hooks/useModal';
import { ChildrenProps } from '@/src/types';
import SettingsModal from '@/src/components/Modal/FormModal';

const RenderModal = ({ children }: ChildrenProps) => {
  const { isSettingsModal } = useModal();

  switch (true) {
    case isSettingsModal:
      return <SettingsModal>{children}</SettingsModal>;
    default:
      return <></>;
  }
};

export default RenderModal;
