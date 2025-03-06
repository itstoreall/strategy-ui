import { useContext } from 'react';
import GlobalContext from '@/src/context/global.context';

const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('ERROR in useGlobalState');
  return context;
};

export default useGlobalState;
