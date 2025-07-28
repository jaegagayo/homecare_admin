import { Flex, Text } from '@radix-ui/themes';
import { useState } from 'react';
import PageHeader from '../Common/PageHeader';
import SettlementOverviewCard from './SettlementOverviewCard';
import PendingSettlementCard from './PendingSettlementCard';
import SettlementHistoryTable from './SettlementHistoryTable';
import { 
  settlementOverviewData, 
  pendingSettlementData, 
  recentSettlementRecords, 
  pendingSettlementRecords 
} from '../../data/settlements';

export default function SettlementPage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: '정산 현황' },
    { key: 'details', label: '정산 내역' },
    { key: 'reports', label: '정산 보고서' },
  ];

  return (
    <Flex direction="column" gap="5" p="6" style={{ height: '100vh' }}>
      <PageHeader 
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
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
        <Flex justify="center" align="center" style={{ flex: 1 }}>
          <Text size="4" color="gray">정산 내역 상세 화면 (구현 예정)</Text>
        </Flex>
      )}

      {selectedTab === 'reports' && (
        <Flex justify="center" align="center" style={{ flex: 1 }}>
          <Text size="4" color="gray">정산 보고서 화면 (구현 예정)</Text>
        </Flex>
      )}
    </Flex>
  );
} 