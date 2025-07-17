import { useState } from 'react';
import Layout from '../components/Layout';
import DashboardPage from '../components/Dashboard/DashboardPage';
import UsersPage from '../components/Users/UsersPage';
import CalendarPage from '../components/Calendar/CalendarPage';
import SettingsPage from '../components/Settings/SettingsPage';

const MENU = {
  DASHBOARD: '대시보드',
  USERS: '사용자',
  CALENDAR: '캘린더',
  SETTINGS: '설정',
};

export default function AdminAppShell() {
  const [selected, setSelected] = useState(MENU.DASHBOARD);
  const handleMenuClick = (label: string) => setSelected(label);

  let content = null;
  if (selected === MENU.DASHBOARD) content = <DashboardPage />;
  else if (selected === MENU.USERS) content = <UsersPage />;
  else if (selected === MENU.CALENDAR) content = <CalendarPage />;
  else if (selected === MENU.SETTINGS) content = <SettingsPage />;

  return (
    <Layout selected={selected} onMenuClick={handleMenuClick}>
      {content}
    </Layout>
  );
}
