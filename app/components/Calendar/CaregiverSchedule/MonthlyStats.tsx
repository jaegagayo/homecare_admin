import { Flex, Card, Heading, Text, Badge, Table, ScrollArea, Button, Popover } from '@radix-ui/themes';
import { useState } from 'react';
import { WorkSchedule } from '../../../data/schedules';
import { WORK_TYPE_COLORS } from '../../../constants/workTypes';

interface MonthlyStatsProps {
  schedules: WorkSchedule[];
}

export default function MonthlyStats({ schedules }: MonthlyStatsProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  // 선택된 월의 스케줄
  const monthlySchedules = schedules.filter(schedule => {
    const scheduleDate = new Date(schedule.date);
    return scheduleDate.getMonth() === selectedMonth && 
           scheduleDate.getFullYear() === selectedYear;
  });

  const calculateMonthlyStats = () => {
    const stats = {
      totalDays: monthlySchedules.length,
      completedDays: monthlySchedules.filter(s => s.status === '완료').length,
      totalHours: monthlySchedules.reduce((sum, s) => {
        const start = new Date(`2000-01-01T${s.startTime}`);
        const end = new Date(`2000-01-01T${s.endTime}`);
        return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      }, 0),
      totalWage: monthlySchedules.reduce((sum, s) => sum + s.hourlyWage * 8, 0)
    };
    return stats;
  };

  const getWorkTypeColor = (workType: string) => {
    return WORK_TYPE_COLORS[workType as keyof typeof WORK_TYPE_COLORS] as "blue" | "purple" | "green" | "orange" | "yellow" | "red" || 'gray';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료': return 'green';
      case '배정됨': return 'blue';
      case '미배정': return 'orange';
      case '취소': return 'red';
      default: return 'gray';
    }
  };

  const monthlyStats = calculateMonthlyStats();

  return (
    <Flex gap="4">
      <Card style={{ flex: 1 }}>
        <Heading size="4" mb="4">월별 통계</Heading>
        <Flex direction="column" gap="3">
          <Flex justify="between">
            <Text size="2" color="gray">선택 월</Text>
            <select
              value={`${selectedYear}-${selectedMonth}`}
              onChange={(e) => {
                const [year, month] = e.target.value.split('-');
                setSelectedYear(parseInt(year));
                setSelectedMonth(parseInt(month));
              }}
              style={{
                padding: '4px 8px',
                border: '1px solid var(--gray-6)',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date(selectedYear, i);
                return (
                  <option key={i} value={`${selectedYear}-${i}`}>
                    {date.toLocaleDateString('ko-KR', { month: 'long' })}
                  </option>
                );
              })}
            </select>
          </Flex>
          
          <Flex direction="column" gap="2">
            <Flex justify="between">
              <Text size="2" color="gray">총 근무일</Text>
              <Text size="2" weight="medium">{monthlyStats.totalDays}일</Text>
            </Flex>
            <Flex justify="between">
              <Text size="2" color="gray">완료일</Text>
              <Text size="2" weight="medium">{monthlyStats.completedDays}일</Text>
            </Flex>
            <Flex justify="between">
              <Text size="2" color="gray">총 근무시간</Text>
              <Text size="2" weight="medium">{monthlyStats.totalHours.toFixed(1)}시간</Text>
            </Flex>
            <Flex justify="between">
              <Text size="2" color="gray">예상 급여</Text>
              <Text size="2" weight="medium">{monthlyStats.totalWage.toLocaleString()}원</Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      <Card style={{ flex: 1 }}>
        <Heading size="4" mb="4">월별 스케줄</Heading>
        <ScrollArea style={{ height: '200px' }}>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>날짜</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>시간</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>근무 유형</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>상태</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>특이사항</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {monthlySchedules.map(schedule => (
                <Table.Row key={schedule.id}>
                  <Table.Cell>
                    <Text size="2">{schedule.date}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">{schedule.startTime} - {schedule.endTime}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={getWorkTypeColor(schedule.workType)} size="1">
                      {schedule.workType}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={getStatusColor(schedule.status)} size="1">
                      {schedule.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    {schedule.notes ? (
                      <Popover.Root open={openPopover === schedule.id} onOpenChange={(open) => setOpenPopover(open ? schedule.id : null)}>
                        <Popover.Trigger>
                          <Button 
                            variant="soft" 
                            size="1" 
                            color="blue"
                          >
                            보기
                          </Button>
                        </Popover.Trigger>
                        <Popover.Content>
                          <Flex direction="column" gap="3" style={{ maxWidth: '300px' }}>
                            <Flex justify="between" align="center">
                              <Text size="2" weight="medium">특이사항</Text>
                              <Button 
                                variant="ghost" 
                                size="1"
                                onClick={() => setOpenPopover(null)}
                              >
                                ✕
                              </Button>
                            </Flex>
                            <Text size="2" style={{ lineHeight: '1.6' }}>
                              {schedule.notes}
                            </Text>
                          </Flex>
                        </Popover.Content>
                      </Popover.Root>
                    ) : (
                      <Text size="2" color="gray">-</Text>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </ScrollArea>
      </Card>
    </Flex>
  );
} 