import { Flex, Text, Button } from '@radix-ui/themes';
import { useState, useEffect, useRef } from 'react';
import { WorkSchedule } from '../../../data/schedules';
import { ClockIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons';
import { WORK_TYPE_COLORS } from '../../../constants/workTypes';

interface ScheduleGridProps {
  schedules: WorkSchedule[];
}

const HOUR_HEIGHT = 100; // px, 1시간당 높이
const GRID_TOP_OFFSET = 32; // px, 헤더(요일) 높이 - 줄임

export default function ScheduleGrid({ schedules }: ScheduleGridProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const gridRef = useRef<HTMLDivElement>(null);

  // 현재 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1분마다 업데이트
    return () => clearInterval(timer);
  }, []);

  // 주간 날짜 배열 생성
  const getWeekDates = (startDate: Date) => {
    const dates = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay()); // 일요일부터 시작
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // 시간대 배열 (0-24시)
  const timeSlots = Array.from({ length: 25 }, (_, i) => ({
    label: `${i.toString().padStart(2, '0')}:00`,
    time: i
  }));

  const weekDates = getWeekDates(currentWeek);
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getSchedulesForDate = (date: Date) => {
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.toDateString() === date.toDateString();
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // 스케줄 블록 위치 계산 (그리드 기준)
  const calculateSchedulePosition = (startTime: string, endTime: string) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const top = (startMinutes / 60) * HOUR_HEIGHT;
    const height = Math.max(((endMinutes - startMinutes) / 60) * HOUR_HEIGHT, 18);
    return { top, height };
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return `${day}일 (${weekday})`;
  };

  const navigateWeek = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') {
      setCurrentWeek(new Date());
    } else {
      const newWeek = new Date(currentWeek);
      newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
      setCurrentWeek(newWeek);
    }
  };

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const start = startDate.getDate();
    const end = endDate.getDate();
    const startMonth = startDate.getMonth() + 1;
    const endMonth = endDate.getMonth() + 1;
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    if (startYear === endYear && startMonth === endMonth) {
      return `${startYear}년 ${startMonth}월 ${start}일 ~ ${end}일`;
    } else if (startYear === endYear) {
      return `${startYear}년 ${startMonth}월 ${start}일 ~ ${endMonth}월 ${end}일`;
    } else {
      return `${startYear}년 ${startMonth}월 ${start}일 ~ ${endYear}년 ${endMonth}월 ${end}일`;
    }
  };

  const weekStart = weekDates[0];
  const weekEnd = weekDates[6];

  return (
    <Flex direction="column" style={{ flex: 1, height: '100%' }}>
      {/* 헤더 */}
      <Flex justify="between" align="center" p="4" style={{ flexShrink: 0 }}>
        <Text size="5" weight="bold">
          {formatDateRange(weekStart, weekEnd)}
        </Text>
        <Flex align="center" gap="2">
          <Button onClick={() => navigateWeek('prev')} variant="ghost" size="2">{'<'}</Button>
          <Button onClick={() => navigateWeek('today')} variant="soft" size="2">오늘</Button>
          <Button onClick={() => navigateWeek('next')} variant="ghost" size="2">{'>'}</Button>
        </Flex>
      </Flex>

      {/* 스케줄 그리드 */}
      <div style={{ 
        flex: 1, 
        overflow: 'auto', 
        position: 'relative', 
        background: '#fff',
        minHeight: 0
      }} ref={gridRef}>
        {/* 요일 헤더 - 고정 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '80px repeat(7, 1fr)', 
          height: GRID_TOP_OFFSET,
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: '#fff'
        }}>
          <div style={{ background: 'var(--gray-2)' }} />
          {weekDates.map((date, idx) => (
            <div key={idx} style={{
              background: isToday(date) ? 'var(--red-3)' : 'var(--gray-2)',
              color: isToday(date) ? 'white' : undefined,
              textAlign: 'center',
              fontWeight: 600,
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>{formatDate(date)}</div>
          ))}
        </div>
        {/* 시간 라벨 + 그리드 선 - 스크롤 가능 */}
        <div style={{ display: 'flex', position: 'relative', minHeight: HOUR_HEIGHT * 24 }}>
          {/* 시간 라벨 - 고정 */}
          <div style={{ 
            width: 80, 
            flexShrink: 0, 
            position: 'sticky', 
            left: 0,
            zIndex: 20,
            background: '#fff'
          }}>
            {timeSlots.map((slot, i) => (
              <div key={i} style={{
                height: HOUR_HEIGHT,
                borderTop: '1px solid var(--gray-6)',
                fontSize: 12,
                color: '#888',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                paddingRight: 8,
                paddingTop: 4,
                background: '#fff'
              }}>{slot.label}</div>
            ))}
          </div>
          {/* 그리드 선만 있는 영역 - 스크롤 가능 */}
          <div style={{ 
            flex: 1, 
            position: 'relative', 
            display: 'grid', 
            gridTemplateColumns: `repeat(7, 1fr)`,
            minHeight: HOUR_HEIGHT * 24
          }}>
            {weekDates.map((date, dateIdx) => (
              <div key={dateIdx} style={{ 
                position: 'relative', 
                height: HOUR_HEIGHT * 24, 
                borderRight: dateIdx < 6 ? '1px solid var(--gray-6)' : undefined 
              }}>
                {/* 수평선 */}
                {timeSlots.map((slot, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    top: i * HOUR_HEIGHT,
                    left: 0,
                    right: 0,
                    height: 0,
                    borderTop: '1px solid var(--gray-6)',
                    zIndex: 1
                  }} />
                ))}
                {/* 스케줄 블록 오버레이 */}
                {getSchedulesForDate(date).map((schedule, idx) => {
                  const { top, height } = calculateSchedulePosition(schedule.startTime, schedule.endTime);
                  const workTypeColor = WORK_TYPE_COLORS[schedule.workType] || '#38bdf8'; // 기본값 설정
                  return (
                    <div key={idx} style={{
                      position: 'absolute',
                      left: 6,
                      right: 6,
                      top,
                      height,
                      background: `var(--${workTypeColor}-3)`, // 배경색
                      border: `1.5px solid var(--${workTypeColor}-10)`, // 테두리색
                      borderRadius: 6,
                      color: `var(--${workTypeColor}-10)`,
                      fontSize: 12,
                      padding: '2px 4px',
                      zIndex: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 1px 4px 0 rgba(56,189,248,0.08)'
                    }}>
                      <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.2, marginTop: 4 }}>
                        {schedule.workType}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 8,
                        flex: 1,
                        justifyContent: 'center',
                        color: '#111',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, opacity: 0.9, lineHeight: 1 }}>
                          <PersonIcon /> {schedule.consumer}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, opacity: 0.8, lineHeight: 1 }}>
                          <HomeIcon /> {schedule.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, opacity: 0.7, lineHeight: 1 }}>
                          <ClockIcon /> {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* 현재 시간 라인 */}
                {isToday(date) && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: ((currentTime.getHours() * 60 + currentTime.getMinutes()) / 60) * HOUR_HEIGHT,
                    height: 2,
                    background: '#ef4444',
                    zIndex: 20
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Flex>
  );
} 