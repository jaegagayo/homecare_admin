import { Card, Text, Checkbox, Flex } from '@radix-ui/themes';

function getDaysArray(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= lastDate; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

interface CalendarSidebarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function CalendarSidebar({ selectedDate, onDateChange }: CalendarSidebarProps) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const days = getDaysArray(year, month);
  return (
    <Card style={{ width: 240, minHeight: 500, background: 'var(--gray-3)', padding: 20 }}>
      <Text size="3" weight="bold" mb="3">캘린더</Text>
      <Flex direction="column" gap="2" mb="4">
        <Flex align="center" gap="2">
          <Checkbox defaultChecked id="todo" />
          <label htmlFor="todo"><Text size="2">할 일</Text></label>
        </Flex>
        <Flex align="center" gap="2">
          <Checkbox defaultChecked color="purple" id="family" />
          <label htmlFor="family"><Text size="2">가족 생일</Text></label>
        </Flex>
        <Flex align="center" gap="2">
          <Checkbox defaultChecked color="blue" id="holiday" />
          <label htmlFor="holiday"><Text size="2">공휴일</Text></label>
        </Flex>
      </Flex>
      <Text size="2" weight="bold" mb="2">{year}년 {month + 1}월</Text>
      <Flex gap="1" mb="1">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <Text key={d} size="1" style={{ flex: 1, textAlign: 'center', color: 'var(--gray-10)' }}>{d}</Text>
        ))}
      </Flex>
      <Flex direction="column" gap="1">
        {Array.from({ length: days.length / 7 }).map((_, weekIdx) => (
          <Flex key={weekIdx} gap="1">
            {days.slice(weekIdx * 7, weekIdx * 7 + 7).map((d, i) => {
              const isSelected = d && d === selectedDate.getDate();
              return (
                <div
                  key={i}
                  role={d ? 'button' : undefined}
                  tabIndex={d ? 0 : -1}
                  onClick={() => d && onDateChange(new Date(year, month, d))}
                  onKeyDown={e => {
                    if ((e.key === 'Enter' || e.key === ' ') && d) {
                      onDateChange(new Date(year, month, d));
                    }
                  }}
                  style={{
                    flex: 1,
                    height: 24,
                    borderRadius: 4,
                    background: isSelected ? 'var(--accent-9)' : 'none',
                    color: isSelected ? 'white' : 'var(--gray-12)',
                    textAlign: 'center',
                    lineHeight: '24px',
                    fontWeight: isSelected ? 700 : 400,
                    cursor: d ? 'pointer' : 'default',
                    fontSize: 14,
                    transition: 'background 0.15s',
                    outline: 'none',
                  }}
                  aria-label={d ? `${year}년 ${month + 1}월 ${d}일` : undefined}
                >
                  {d || ''}
                </div>
              );
            })}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
} 