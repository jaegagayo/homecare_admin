import { Flex, Heading } from '@radix-ui/themes';
import StatsCards from './StatsCards';
import RecentActivityTable from './RecentActivityTable';

export default function DashboardPage() {
  return (
    <Flex direction="column" gap="6" p="6">
      <Heading size="7" mb="4">관리자 대시보드</Heading>
      <StatsCards />
      <RecentActivityTable />
    </Flex>
  );
} 