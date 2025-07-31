import { Text, Badge, Table, ScrollArea } from '@radix-ui/themes';
import { WorkSchedule } from '../../../data/schedules';
import { WORK_TYPE_COLORS } from '../../../constants/workTypes';

interface UpcomingSchedulesProps {
  schedules: WorkSchedule[];
}

export default function UpcomingSchedules({ schedules }: UpcomingSchedulesProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료': return 'green';
      case '배정됨': return 'blue';
      case '미배정': return 'orange';
      case '취소': return 'red';
      default: return 'gray';
    }
  };

  return (
    <ScrollArea style={{ height: '300px' }}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>날짜</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>시간</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>근무 유형</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>근무지</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>시급</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>상태</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {schedules.map(schedule => (
            <Table.Row key={schedule.id}>
              <Table.Cell>
                <Text size="2">{schedule.date}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="2">{schedule.startTime} - {schedule.endTime}</Text>
              </Table.Cell>
              <Table.Cell>
                <Badge 
                  color={WORK_TYPE_COLORS[schedule.workType] as "blue" | "purple" | "green" | "orange" | "yellow" | "red"} 
                  size="1"
                >
                  {schedule.workType}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Text size="2" color="gray">{schedule.location}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="2">{schedule.hourlyWage.toLocaleString()}원</Text>
              </Table.Cell>
              <Table.Cell>
                <Badge color={getStatusColor(schedule.status)} size="1">
                  {schedule.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </ScrollArea>
  );
} 