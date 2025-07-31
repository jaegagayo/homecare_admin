import { Flex, Text, Card } from '@radix-ui/themes';
import { useState } from 'react';
import PageHeader from '../Common/PageHeader';
import CalendarSidebar from './CalendarView/CalendarSidebar';
import CalendarHeader from './CalendarView/CalendarHeader';
import CalendarGrid from './CalendarView/CalendarGrid';
import ScheduleManagement from './ScheduleManagement/ScheduleManagement';
import CaregiverSchedule from './CaregiverSchedule/CaregiverSchedule';
import CaregiverList from '../Common/CaregiverList';
import { sampleCaregivers } from '../../data/caregivers';

export default function CalendarPage() {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [view, setView] = useState('month');
  const [tab, setTab] = useState('calendar');
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('전체');

  const tabs = [
    { key: 'calendar', label: '캘린더 보기' },
    { key: 'schedule', label: '스케줄 관리' },
    { key: 'caregiver-schedule', label: '요양보호사별 스케줄' },
  ];

  const handleViewCaregiverSchedule = (caregiverId: number) => {
    setSelectedCaregiverId(caregiverId);
    setTab('caregiver-schedule');
  };

  const handleCaregiverSelect = (caregiverId: number) => {
    setSelectedCaregiverId(caregiverId);
  };

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    // 탭 변경 시 보호사 선택 상태 초기화
    if (newTab !== 'caregiver-schedule') {
      setSelectedCaregiverId(null);
    }
  };


  return (
    <Flex direction="column" gap="5" p="6" style={{ height: '100vh' }}>
      <PageHeader 
        tabs={tabs}
        selectedTab={tab}
        onTabChange={handleTabChange}
      />

      {/* 탭별 내용 */}
      {tab === 'calendar' && (
        <Flex gap="6" style={{ flex: 1, minHeight: 0 }}>
          <CalendarSidebar selectedDate={date} onDateChange={setDate} />
          <Flex direction="column" style={{ flex: 1 }}>
            <CalendarHeader
              year={date.getFullYear()}
              month={date.getMonth()}
              onPrev={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
              onNext={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
              onToday={() => setDate(today)}
              view={view}
              setView={setView}
            />
            <CalendarGrid year={date.getFullYear()} month={date.getMonth()} />
          </Flex>
        </Flex>
      )}

      {tab === 'schedule' && (
        <ScheduleManagement onViewCaregiverSchedule={handleViewCaregiverSchedule} />
      )}

      {tab === 'caregiver-schedule' && (
        <Flex gap="6" style={{ flex: 1, minHeight: 0 }}>
          <CaregiverList
            caregivers={sampleCaregivers}
            searchTerm={searchTerm}
            selectedStatus={selectedStatus}
            multiSelectMode={false}
            selectedCaregiver={selectedCaregiverId}
            selectedCaregivers={[]}
            onSearchChange={setSearchTerm}
            onStatusChange={setSelectedStatus}
            onCaregiverSelect={handleCaregiverSelect}
            showMultiSelectToggle={false}
          />
          
          {selectedCaregiverId ? (
            <CaregiverSchedule 
              caregiver={sampleCaregivers.find(c => c.id === selectedCaregiverId)!} 
            />
          ) : (
            <Card style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
              <Flex direction="column" gap="4" p="4" style={{ flex: 1 }}>
                <Flex justify="center" align="center" style={{ flex: 1 }}>
                  <Text size="4" color="gray">보호사를 선택하여 스케줄을 확인하세요</Text>
                </Flex>
              </Flex>
            </Card>
          )}
        </Flex>
      )}
    </Flex>
  );
} 