import { DashboardIcon, PersonIcon, CalendarIcon, GearIcon } from '@radix-ui/react-icons';

export const MENU = [
  { key: 'dashboard', label: '현황판', icon: <DashboardIcon width={24} height={24} /> },
  { key: 'caregiver', label: '요양보호사', icon: <PersonIcon width={24} height={24} /> },
  { key: 'calendar', label: '캘린더', icon: <CalendarIcon width={24} height={24} /> },
  { key: 'settings', label: '설정', icon: <GearIcon width={24} height={24} /> },
]; 