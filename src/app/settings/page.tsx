import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthenticated';
import { SettingsPage } from '@/src/app/settings/settings';

const Settings: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <SettingsPage />;
  }
};

export default Settings;
