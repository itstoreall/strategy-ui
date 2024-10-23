'use client';

import Button from '@/src/components/Button';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';

export const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <div className="dashboard-card">
        <Button className="dashboard-page-button" clickContent={handleSignOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
};
