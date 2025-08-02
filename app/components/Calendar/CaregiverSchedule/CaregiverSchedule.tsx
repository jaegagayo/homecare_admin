import { Flex, Heading, Card, Tabs, Button } from '@radix-ui/themes';
import { useState, useRef } from 'react';
import { sampleSchedules } from '../../../data/schedules';
import { Caregiver } from '../../../data/caregivers';
import UpcomingSchedules from './UpcomingSchedules';
import CompletedSchedules from './CompletedSchedules';
import MonthlyStats from './MonthlyStats';
import ScheduleGrid from './ScheduleGrid';
import { exportAndDownloadSchedule } from '../../../utils/scheduleImageExport';

interface CaregiverScheduleProps {
  caregiver: Caregiver;
}

export default function CaregiverSchedule({ caregiver }: CaregiverScheduleProps) {
  const [selectedTab, setSelectedTab] = useState('schedule');
  const [isExporting, setIsExporting] = useState(false);
  const scheduleGridRef = useRef<HTMLDivElement>(null);

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

  // 이미지 출력 처리
  const handleExportImage = async () => {
    if (selectedTab !== 'schedule') {
      alert('스케줄표 탭에서만 이미지 출력이 가능합니다.');
      return;
    }
    
    if (!scheduleGridRef.current) {
      alert('스케줄 그리드를 찾을 수 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setIsExporting(true);
    try {
      const filename = `${caregiver.name}_보호사_스케줄_${new Date().toISOString().split('T')[0]}.png`;
      
      await exportAndDownloadSchedule(scheduleGridRef.current, {
        format: 'png',
        quality: 0.95,
        width: 1200,
        filename
      });
    } catch (error) {
      console.error('이미지 출력 실패:', error);
      alert('이미지 출력 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card style={{ flex: 3, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Flex direction="column" gap="4" p="4" style={{ flex: 1, minHeight: 0, height: '100%' }}>
        <Flex justify="between" align="center" style={{ flexShrink: 0 }}>
          <Heading size="4">{caregiver.name} 보호사 스케줄</Heading>
          <Button 
            variant="soft" 
            size="2" 
            onClick={handleExportImage}
            disabled={isExporting || selectedTab !== 'schedule'}
          >
            {isExporting ? '출력 중...' : '이미지로 출력'}
          </Button>
        </Flex>

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
              <ScheduleGrid ref={scheduleGridRef} schedules={caregiverSchedules} />
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