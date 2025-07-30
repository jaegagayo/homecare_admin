import { Flex, Text, Card } from '@radix-ui/themes';
import { useState } from 'react';
import PageHeader from '../Common/PageHeader';
import SettlementOverviewCard from './SettlementOverviewCard';
import PendingSettlementCard from './PendingSettlementCard';
import SettlementHistoryTable from './SettlementHistoryTable';
import SettlementDetails from './SettlementDetails';
import CaregiverList from '../Caregivers/HRCard/CaregiverList';
import { sampleCaregivers } from '../../data/caregivers';
import { 
  settlementOverviewData, 
  pendingSettlementData, 
  recentSettlementRecords, 
  pendingSettlementRecords 
} from '../../data/settlements';

export default function SettlementPage() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('전체');

  const handleCaregiverSelect = (caregiverId: number) => {
    setSelectedCaregiverId(caregiverId);
  };

  const handleTabChange = (newTab: string) => {
    setSelectedTab(newTab);
    // 탭 변경 시 보호사 선택 상태 초기화
    if (newTab !== 'caregiver-settlement') {
      setSelectedCaregiverId(null);
    }
  };

  const tabs = [
    { key: 'overview', label: '정산 현황' },
    { key: 'details', label: '정산 내역' },
    { key: 'caregiver-settlement', label: '요양보호사별 정산' },
  ];

  return (
    <Flex direction="column" gap="5" p="6" style={{ height: '100vh' }}>
      <PageHeader 
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
      />

      {/* 탭별 내용 */}
      {selectedTab === 'overview' && (
        <Flex direction="column" gap="6" style={{ flex: 1, minHeight: 0 }}>
          {/* 상단: 이번 달 총 정산 + 최근 정산 내역 */}
          <Flex gap="6" style={{ flex: 1 }}>
            <SettlementOverviewCard 
              totalAmount={settlementOverviewData.totalAmount}
              previousMonthChange={settlementOverviewData.previousMonthChange}
              monthlyData={settlementOverviewData.monthlyData}
            />
            
            <SettlementHistoryTable 
              title="최근 정산 내역"
              records={recentSettlementRecords}
            />
          </Flex>

          {/* 하단: 미정산 건수 + 미정산 내역 */}
          <Flex gap="6" style={{ flex: 1 }}>
            <PendingSettlementCard 
              pendingCount={pendingSettlementData.pendingCount}
              totalAmount={pendingSettlementData.totalAmount}
              weeklyData={pendingSettlementData.weeklyData}
            />
            
            <SettlementHistoryTable 
              title="미정산 내역"
              records={pendingSettlementRecords}
            />
          </Flex>
        </Flex>
      )}

      {selectedTab === 'details' && (
        <SettlementDetails records={[...recentSettlementRecords, ...pendingSettlementRecords]} />
      )}

      {selectedTab === 'caregiver-settlement' && (
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
          />
          
          {selectedCaregiverId ? (
            <Card style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
              <Flex direction="column" gap="4" p="4" style={{ flex: 1 }}>
                <Text size="4" weight="bold">
                  {sampleCaregivers.find(c => c.id === selectedCaregiverId)?.name} 보호사 정산 내역
                </Text>
                <SettlementDetails 
                  records={[...recentSettlementRecords, ...pendingSettlementRecords].filter(
                    record => record.caregiverName === sampleCaregivers.find(c => c.id === selectedCaregiverId)?.name
                  )} 
                />
              </Flex>
            </Card>
          ) : (
            <Card style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
              <Flex direction="column" gap="4" p="4" style={{ flex: 1 }}>
                <Flex justify="center" align="center" style={{ flex: 1 }}>
                  <Text size="4" color="gray">보호사를 선택하여 정산 내역을 확인하세요</Text>
                </Flex>
              </Flex>
            </Card>
          )}
        </Flex>
      )}
    </Flex>
  );
} 