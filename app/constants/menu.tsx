import { DashboardIcon, PersonIcon, CalendarIcon, GearIcon } from '@radix-ui/react-icons';

// 원화 기호가 포함된 커스텀 아이콘
const WonIcon = () => (
  <div style={{
    width: 24,
    height: 24,
    borderRadius: '50%',
    color: 'var(--gray-11)',
    border: '1.5px solid currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  }}>
    ₩
  </div>
);

export const MENU = [
  { key: 'dashboard', label: '현황판', icon: <DashboardIcon width={24} height={24} /> },
  { key: 'caregiver', label: '요양보호사', icon: <PersonIcon width={24} height={24} /> },
  { key: 'calendar', label: '캘린더', icon: <CalendarIcon width={24} height={24} /> },
  { key: 'settlement', label: '정산 관리', icon: <WonIcon /> },
  { key: 'settings', label: '설정', icon: <GearIcon width={24} height={24} /> },
]; 