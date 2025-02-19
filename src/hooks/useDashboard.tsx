import { useContext } from 'react';
import DashboardContext from '@/src/context/dashboard.context';

const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('ERROR in useDashboard');
  return context;
};

export default useDashboard;
