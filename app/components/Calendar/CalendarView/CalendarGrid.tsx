import { Card, Flex, Text } from '@radix-ui/themes';
import { sampleSchedules, groupSchedulesByDate } from '../../../data/schedules';

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

// 근무 유형별 색상 반환
function getWorkTypeColor(workType: string) {
  switch (workType) {
    case '센터': return 'var(--blue-9)';
    case '재가': return 'var(--purple-9)';
    case '방문': return 'var(--orange-9)';
    default: return 'var(--gray-9)';
  }
}



export default function CalendarGrid({ year, month }: { year: number, month: number }) {
  const days = getDaysArray(year, month);
  const weekCount = days.length / 7;
  
  // 오늘 날짜 확인
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  
  // 해당 월의 스케줄만 필터링
  const monthSchedules = sampleSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.date);
    return scheduleDate.getFullYear() === year && scheduleDate.getMonth() === month;
  });
  
  // 날짜별로 스케줄 그룹화
  const schedulesByDate = groupSchedulesByDate(monthSchedules);

  return (
    <Card style={{ background: 'var(--gray-2)', flex: 1, height: '100%', padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: 24, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <Flex gap="2" mb="2">
          {['일', '월', '화', '수', '목', '금', '토'].map(d => (
            <Text key={d} size="3" style={{ flex: 1, textAlign: 'center' }}>{d}</Text>
          ))}
        </Flex>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridTemplateRows: `repeat(${weekCount}, 1fr)`,
            gap: 8,
            flex: 1,
            height: '100%',
            boxSizing: 'border-box',
            minHeight: 0,
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {days.map((d, i) => {
            const dateStr = d ? formatDate(year, month, d) : '';
            const daySchedules = d ? schedulesByDate[dateStr] || [] : [];
            const isToday = d && isCurrentMonth && d === today.getDate();
            
            return (
              <Card
                key={i}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: 0,
                  minWidth: 0,
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  background: d ? (isToday ? 'var(--accent-3)' : 'var(--gray-4)') : 'transparent',
                  color: d ? 'var(--gray-12)' : 'transparent',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: 8,
                }}
              >
                {d && (
                  <>
                    <Text 
                      size="4" 
                      weight="bold" 
                      style={{ 
                        marginBottom: 4,
                        color: isToday ? 'var(--accent-11)' : 'var(--gray-12)',
                        fontWeight: 600
                      }}
                    >
                      {d}
                    </Text>
                    
                    {/* 근무 현황 요약 */}
                    {daySchedules.length > 0 && (
                      <Flex direction="column" gap="1" style={{ width: '100%' }}>
                        <Text size="1" color="gray" style={{ marginBottom: 2 }}>
                          근무: {daySchedules.length}명
                        </Text>
                        
                        {/* 근무 유형별 요약 */}
                        {daySchedules.slice(0, 3).map((schedule) => (
                          <div
                            key={schedule.id}
                            style={{
                              background: getWorkTypeColor(schedule.workType),
                              color: 'white',
                              borderRadius: 4,
                              fontSize: 10,
                              padding: '1px 4px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              marginBottom: 1,
                            }}
                          >
                            {schedule.caregiverName} ({schedule.workType})
                          </div>
                        ))}
                        
                        {daySchedules.length > 3 && (
                          <Text size="1" color="gray">
                            +{daySchedules.length - 3}명 더
                          </Text>
                        )}
                      </Flex>
                    )}
                  </>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </Card>
  );
} 