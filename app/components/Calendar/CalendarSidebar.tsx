import { Card, Text, Checkbox, Flex, Heading, Badge } from '@radix-ui/themes';
import { sampleSchedules, groupSchedulesByDate } from '../../data/schedules';

function getDaysArray(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= lastDate; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

// 날짜를 YYYY-MM-DD 형식으로 변환
function formatDate(year: number, month: number, day: number): string {
  const monthStr = (month + 1).toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');
  return `${year}-${monthStr}-${dayStr}`;
}

interface CalendarSidebarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function CalendarSidebar({ selectedDate, onDateChange }: CalendarSidebarProps) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const days = getDaysArray(year, month);
  
  // 해당 월의 스케줄만 필터링
  const monthSchedules = sampleSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.date);
    return scheduleDate.getFullYear() === year && scheduleDate.getMonth() === month;
  });
  
  // 날짜별로 스케줄 그룹화
  const schedulesByDate = groupSchedulesByDate(monthSchedules);
  
  // 근무 유형별 통계
  const workTypeStats = {
    '센터': monthSchedules.filter(s => s.workType === '센터').length,
    '재가': monthSchedules.filter(s => s.workType === '재가').length,
    '방문': monthSchedules.filter(s => s.workType === '방문').length,
  };
  
  // 상태별 통계
  const statusStats = {
    '배정됨': monthSchedules.filter(s => s.status === '배정됨').length,
    '미배정': monthSchedules.filter(s => s.status === '미배정').length,
    '완료': monthSchedules.filter(s => s.status === '완료').length,
  };

  return (
    <Card style={{ width: 280, minHeight: 500, background: 'var(--gray-3)', padding: 20 }}>
      <Heading size="3" mb="4">근무 현황</Heading>
      
      {/* 근무 유형별 필터 */}
      <Text size="2" weight="bold">근무 유형</Text>
      <Flex direction="column" gap="2" mt="2" mb="4">
        <Flex align="center" justify="between">
          <Flex align="center" gap="2">
            <Checkbox defaultChecked id="center" />
            <label htmlFor="center"><Text size="2">센터</Text></label>
          </Flex>
          <Badge color="blue" size="1">{workTypeStats['센터']}</Badge>
        </Flex>
        <Flex align="center" justify="between">
          <Flex align="center" gap="2">
            <Checkbox defaultChecked id="home" />
            <label htmlFor="home"><Text size="2">재가</Text></label>
          </Flex>
          <Badge color="purple" size="1">{workTypeStats['재가']}</Badge>
        </Flex>
        <Flex align="center" justify="between">
          <Flex align="center" gap="2">
            <Checkbox defaultChecked id="visit" />
            <label htmlFor="visit"><Text size="2">방문</Text></label>
          </Flex>
          <Badge color="orange" size="1">{workTypeStats['방문']}</Badge>
        </Flex>
      </Flex>
      
      {/* 상태별 통계 */}
      <Text size="2" weight="bold">근무 상태</Text>
      <Flex direction="column" gap="2" mt="2" mb="4">
        <Flex align="center" justify="between">
          <Text size="2">배정됨</Text>
          <Badge color="green" size="1">{statusStats['배정됨']}</Badge>
        </Flex>
        <Flex align="center" justify="between">
          <Text size="2">미배정</Text>
          <Badge color="yellow" size="1">{statusStats['미배정']}</Badge>
        </Flex>
        <Flex align="center" justify="between">
          <Text size="2">완료</Text>
          <Badge color="blue" size="1">{statusStats['완료']}</Badge>
        </Flex>
      </Flex>
      
      {/* 미니 캘린더 */}
      <Text size="2" weight="bold">{year}년 {month + 1}월</Text>
      <Flex gap="1" mt="2" mb="4">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <Text key={d} size="1" style={{ flex: 1, textAlign: 'center', color: 'var(--gray-10)' }}>{d}</Text>
        ))}
      </Flex>
      <Flex direction="column" gap="1">
        {Array.from({ length: days.length / 7 }).map((_, weekIdx) => (
          <Flex key={weekIdx} gap="1">
            {days.slice(weekIdx * 7, weekIdx * 7 + 7).map((d, i) => {
              const isSelected = d && d === selectedDate.getDate();
              const dateStr = d ? formatDate(year, month, d) : '';
              const hasSchedule = d && schedulesByDate[dateStr] && schedulesByDate[dateStr].length > 0;
              
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
                    position: 'relative',
                  }}
                  aria-label={d ? `${year}년 ${month + 1}월 ${d}일` : undefined}
                >
                  {d || ''}
                  {hasSchedule && (
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: 'var(--accent-9)',
                    }} />
                  )}
                </div>
              );
            })}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
} 