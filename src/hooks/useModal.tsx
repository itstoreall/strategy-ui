import { useContext } from 'react';
import ModalsContext from '@/src/context/modal.context';

const useModal = () => {
  const context = useContext(ModalsContext);
  if (!context) throw new Error('ERROR in useModals');
  return context;
};

export default useModal;
