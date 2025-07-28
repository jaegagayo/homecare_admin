import { Flex } from '@radix-ui/themes';
import { useState } from 'react';
import PageHeader from '../Common/PageHeader';
import CalendarSidebar from './CalendarSidebar';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

export default function CalendarPage() {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [view, setView] = useState('month');
  const [tab, setTab] = useState('calendar');

  const tabs = [
    { key: 'calendar', label: '캘린더 보기' },
    { key: 'schedule', label: '스케줄 관리' },
  ];

  return (
    <Flex direction="column" gap="5" p="6" style={{ height: '100vh' }}>
      <PageHeader 
        tabs={tabs}
        selectedTab={tab}
        onTabChange={setTab}
      />

      {/* 탭별 내용 */}
      {tab === 'calendar' && (
        <Flex gap="6" style={{ flex: 1, minHeight: 0 }}>
          <CalendarSidebar selectedDate={date} onDateChange={setDate} />
          <Flex direction="column" style={{ flex: 1 }}>
            <CalendarHeader
              year={date.getFullYear()}
              month={date.getMonth()}
              onPrev={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
              onNext={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
              onToday={() => setDate(today)}
              view={view}
              setView={setView}
            />
            <CalendarGrid year={date.getFullYear()} month={date.getMonth()} />
          </Flex>
        </Flex>
      )}

      {tab === 'schedule' && (
        <Flex justify="center" align="center" style={{ flex: 1 }}>
          <div>스케줄 관리 화면 (구현 예정)</div>
        </Flex>
      )}
    </Flex>
  );
} 