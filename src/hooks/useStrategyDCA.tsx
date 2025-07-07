import { useContext } from 'react';
import StrategyDCAContext from '@/src/context/strategyDCA.context';

const useStrategyDCA = () => {
  const context = useContext(StrategyDCAContext);
  if (!context) throw new Error('ERROR in useStrategyDCA');
  return context;
};

export default useStrategyDCA;
