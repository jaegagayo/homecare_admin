import { Flex, Heading, Card, Tabs } from '@radix-ui/themes';
import { useState } from 'react';
import { sampleSchedules } from '../../../data/schedules';
import { Caregiver } from '../../../data/caregivers';
import UpcomingSchedules from './UpcomingSchedules';
import CompletedSchedules from './CompletedSchedules';
import MonthlyStats from './MonthlyStats';
import ScheduleGrid from './ScheduleGrid';

interface CaregiverScheduleProps {
  caregiver: Caregiver;
}

export default function CaregiverSchedule({ caregiver }: CaregiverScheduleProps) {
  const [selectedTab, setSelectedTab] = useState('schedule');

  const tabs = [
    { key: 'schedule', label: '스케줄표' },
    { key: 'upcoming', label: '예정된 스케줄' },
    { key: 'completed', label: '완료된 스케줄' },
    { key: 'monthly', label: '월별 통계' },
  ];

  // 해당 보호사의 스케줄 필터링
  const caregiverSchedules = sampleSchedules.filter(schedule => 
    schedule.caregiverId === caregiver.id
  );

  // 예정된 스케줄 (오늘 이후)
  const upcomingSchedules = caregiverSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return scheduleDate >= today && schedule.status !== '취소';
  });

  // 완료된 스케줄 (오늘 이전)
  const completedSchedules = caregiverSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return scheduleDate < today || schedule.status === '완료';
  });

  return (
    <Card style={{ flex: 3, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Flex direction="column" gap="4" p="4" style={{ flex: 1, minHeight: 0, height: '100%' }}>
        <Heading size="4" style={{ flexShrink: 0 }}>{caregiver.name} 보호사 스케줄</Heading>

        <Tabs.Root value={selectedTab} onValueChange={setSelectedTab} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Tabs.List style={{ flexShrink: 0 }}>
            {tabs.map(tab => (
              <Tabs.Trigger key={tab.key} value={tab.key}>
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            {selectedTab === 'schedule' && (
              <ScheduleGrid schedules={caregiverSchedules} />
            )}

            {selectedTab === 'upcoming' && (
              <UpcomingSchedules schedules={upcomingSchedules} />
            )}

            {selectedTab === 'completed' && (
              <CompletedSchedules schedules={completedSchedules} />
            )}

            {selectedTab === 'monthly' && (
              <MonthlyStats schedules={caregiverSchedules} />
            )}
          </div>
        </Tabs.Root>
      </Flex>
    </Card>
  );
} 