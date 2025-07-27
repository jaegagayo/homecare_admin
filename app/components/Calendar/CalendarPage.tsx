import { Flex } from '@radix-ui/themes';
import { useState } from 'react';
import CalendarSidebar from './CalendarSidebar';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

export default function CalendarPage() {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [view, setView] = useState('month');

  return (
    <Flex gap="6" p="6" style={{ minHeight: '100vh' }}>
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
  );
} 