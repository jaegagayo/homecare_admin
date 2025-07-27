import { useState } from 'react';
import Layout from '../components/Layout';
import DashboardPage from '../components/Dashboard/DashboardPage';
import CaregiversPage from '../components/Caregivers/CaregiversPage';
import CalendarPage from '../components/Calendar/CalendarPage';
import SettingsPage from '../components/Settings/SettingsPage';

const MENU = {
  DASHBOARD: '현황판',
  USERS: '요양보호사',
  CALENDAR: '캘린더',
  SETTINGS: '설정',
};

export default function AdminAppShell() {
  const [selected, setSelected] = useState(MENU.DASHBOARD);
  const handleMenuClick = (label: string) => setSelected(label);

  let content = null;
  if (selected === MENU.DASHBOARD) content = <DashboardPage />;
  else if (selected === MENU.USERS) content = <CaregiversPage />;
  else if (selected === MENU.CALENDAR) content = <CalendarPage />;
  else if (selected === MENU.SETTINGS) content = <SettingsPage />;

  return (
    <Layout selected={selected} onMenuClick={handleMenuClick}>
      {content}
    </Layout>
  );
}
