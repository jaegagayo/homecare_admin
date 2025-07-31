import { Flex, Heading, Text, Card, Button, Badge, Table, ScrollArea, Tabs, Select } from '@radix-ui/themes';
import { useState } from 'react';
import { sampleSchedules } from '../../../data/schedules';
import { sampleCaregivers } from '../../../data/caregivers';
import AddSchedule from './AddSchedule';

interface ScheduleManagementProps {
  onViewCaregiverSchedule?: (caregiverId: number) => void;
}

export default function ScheduleManagement({ onViewCaregiverSchedule }: ScheduleManagementProps) {
  const [selectedTab, setSelectedTab] = useState('list');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCaregiver, setSelectedCaregiver] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { key: 'list', label: '스케줄 목록' },
    { key: 'add', label: '스케줄 추가' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료': return 'green';
      case '배정됨': return 'blue';
      case '미배정': return 'orange';
      case '취소': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case '완료': return '완료';
      case '배정됨': return '배정됨';
      case '미배정': return '미배정';
      case '취소': return '취소';
      default: return '알 수 없음';
    }
  };

  const filteredSchedules = sampleSchedules.filter(schedule => {
    const matchesDate = selectedDate === '' || schedule.date === selectedDate;
    const matchesCaregiver = selectedCaregiver === 'all' || 
                            schedule.caregiverId.toString() === selectedCaregiver;
    const matchesStatus = selectedStatus === 'all' || schedule.status === selectedStatus;
    return matchesDate && matchesCaregiver && matchesStatus;
  });

  const handleApprove = (id: string) => {
    console.log('스케줄 승인:', id);
  };

  const handleReject = (id: string) => {
    console.log('스케줄 반려:', id);
  };

  const handleViewCaregiverSchedule = (caregiverId: number) => {
    if (onViewCaregiverSchedule) {
      onViewCaregiverSchedule(caregiverId);
    }
  };

  return (
    <Flex direction="column" gap="5" style={{ flex: 1 }}>
      <Heading size="4">스케줄 관리</Heading>

      <Tabs.Root value={selectedTab} onValueChange={setSelectedTab}>
        <Tabs.List>
          {tabs.filter(tab => tab.key !== 'approval').map(tab => (
            <Tabs.Trigger key={tab.key} value={tab.key}>
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>

      {selectedTab === 'list' && (
        <Flex direction="column" gap="4">
          {/* 필터 */}
          <Card style={{ padding: '16px' }}>
            <Flex gap="4" align="end">
              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">날짜</Text>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid var(--gray-6)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-foreground)',
                    height: '32px',
                    boxSizing: 'border-box'
                  }}
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">보호사</Text>
                <Select.Root value={selectedCaregiver} onValueChange={setSelectedCaregiver}>
                  <Select.Trigger style={{ width: '150px' }} />
                  <Select.Content>
                    <Select.Item value="all">전체</Select.Item>
                    {sampleCaregivers.map(caregiver => (
                      <Select.Item key={caregiver.id} value={caregiver.id.toString()}>
                        {caregiver.name}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">상태</Text>
                <Select.Root value={selectedStatus} onValueChange={setSelectedStatus}>
                  <Select.Trigger style={{ width: '120px' }} />
                  <Select.Content>
                    <Select.Item value="all">전체</Select.Item>
                    <Select.Item value="미배정">미배정</Select.Item>
                    <Select.Item value="배정됨">배정됨</Select.Item>
                    <Select.Item value="완료">완료</Select.Item>
                    <Select.Item value="취소">취소</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Button variant="soft">필터 적용</Button>
            </Flex>
          </Card>

          {/* 스케줄 목록 */}
          <Card style={{ flex: 1, padding: '16px' }}>
            <ScrollArea style={{ height: '400px' }}>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>보호사명</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>날짜</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>시간</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>근무지</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>시급</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>상태</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>작업</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filteredSchedules.map(schedule => (
                    <Table.Row key={schedule.id}>
                      <Table.Cell>
                          <Text weight="medium">{schedule.caregiverName}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text size="2">{schedule.date}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text size="2">{schedule.startTime} - {schedule.endTime}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text size="2" color="gray">{schedule.location}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text size="2">{schedule.hourlyWage.toLocaleString()}원</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge color={getStatusColor(schedule.status)} size="1">
                          {getStatusText(schedule.status)}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                          <Flex gap="2">
                          <Button 
                            variant="soft" 
                            size="1" 
                            color="blue"
                            onClick={() => handleViewCaregiverSchedule(schedule.caregiverId)}
                          >
                            조회
                          </Button>
                          {schedule.status === '미배정' && (
                            <>
                            <Button 
                              variant="soft" 
                              size="1" 
                              color="green"
                              onClick={() => handleApprove(schedule.id)}
                            >
                              배정
                            </Button>
                            <Button 
                              variant="soft" 
                              size="1" 
                              color="red"
                              onClick={() => handleReject(schedule.id)}
                            >
                              취소
                            </Button>
                            </>
                          )}
                          </Flex>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </ScrollArea>
          </Card>
        </Flex>
      )}

      {selectedTab === 'add' && (
        <AddSchedule />
      )}
    </Flex>
  );
} 