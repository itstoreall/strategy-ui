import { redirect } from 'next/navigation';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { AdminPage } from '@/src/app/admin/admin';

const Admin: React.FC = async () => {
  const roleRes = await getUserRole();

  if (roleRes?.role === 'ADMIN') {
    return <AdminPage />;
  } else {
    redirect('/dashboard');
  }
};

export default Admin;
