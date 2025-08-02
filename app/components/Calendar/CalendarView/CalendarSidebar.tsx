import { Card, Text, Checkbox, Flex, Heading, Badge } from '@radix-ui/themes';
import { useState } from 'react';
import { groupSchedulesByDate } from '../../../utils/scheduleUtils';
import { sampleSchedules } from '../../../data/schedules';
import { WORK_TYPES, WORK_TYPE_COLORS, WorkType } from '../../../constants/workTypes';

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
  onWorkTypeFilterChange?: (filters: Record<WorkType, boolean>) => void;
}

export default function CalendarSidebar({ onWorkTypeFilterChange }: CalendarSidebarProps) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = getDaysArray(year, month);
  
  // 체크박스 상태 관리
  const [workTypeFilters, setWorkTypeFilters] = useState<Record<WorkType, boolean>>({
    [WORK_TYPES.VISITING_CARE]: true,
    [WORK_TYPES.DAY_NIGHT_CARE]: true,
    [WORK_TYPES.RESPITE_CARE]: true,
    [WORK_TYPES.VISITING_BATH]: true,
    [WORK_TYPES.IN_HOME_SUPPORT]: true,
    [WORK_TYPES.VISITING_NURSING]: true
  });
  
  // 해당 월의 스케줄만 필터링
  const monthSchedules = sampleSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.date);
    return scheduleDate.getFullYear() === year && scheduleDate.getMonth() === month;
  });
  
  // 날짜별로 스케줄 그룹화
  const schedulesByDate = groupSchedulesByDate(monthSchedules);
  
  // 근무 유형별 통계
  const workTypeStats = Object.values(WORK_TYPES).reduce((acc, workType) => {
    acc[workType] = monthSchedules.filter(s => s.workType === workType).length;
    return acc;
  }, {} as Record<string, number>);
  
  // 상태별 통계
  const statusStats = {
    '배정됨': monthSchedules.filter(s => s.status === '배정됨').length,
    '미배정': monthSchedules.filter(s => s.status === '미배정').length,
    '완료': monthSchedules.filter(s => s.status === '완료').length,
  };

  const handleWorkTypeFilterChange = (workType: WorkType, checked: boolean) => {
    const newFilters = { ...workTypeFilters, [workType]: checked };
    setWorkTypeFilters(newFilters);
    if (onWorkTypeFilterChange) {
      onWorkTypeFilterChange(newFilters);
    }
  };

  return (
    <Card style={{ width: 280, minHeight: 500, background: 'var(--gray-3)', padding: 20 }}>
      <Heading size="3" mb="4">근무 현황</Heading>
      
      {/* 근무 유형별 필터 */}
      <Text size="2" weight="bold">근무 유형</Text>
      <Flex direction="column" gap="2" mt="2" mb="4">
        {Object.values(WORK_TYPES).map(workType => (
          <Flex key={workType} align="center" justify="between">
            <Flex align="center" gap="2">
              <Checkbox 
                checked={workTypeFilters[workType]}
                onCheckedChange={(checked) => handleWorkTypeFilterChange(workType, checked as boolean)}
                id={workType} 
              />
              <label htmlFor={workType}><Text size="2">{workType}</Text></label>
            </Flex>
            <Badge 
              color={WORK_TYPE_COLORS[workType] as "blue" | "purple" | "green" | "orange" | "yellow" | "red"} 
              size="1"
            >
              {workTypeStats[workType]}
            </Badge>
          </Flex>
        ))}
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
              const isToday = d && d === today.getDate();
              const dateStr = d ? formatDate(year, month, d) : '';
              const hasSchedule = d && schedulesByDate[dateStr] && schedulesByDate[dateStr].length > 0;
              
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 24,
                    borderRadius: 4,
                    background: isToday ? 'var(--accent-9)' : 'none',
                    color: isToday ? 'white' : 'var(--gray-12)',
                    textAlign: 'center',
                    lineHeight: '24px',
                    fontWeight: isToday ? 700 : 400,
                    fontSize: 14,
                    position: 'relative',
                  }}
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