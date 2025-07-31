import { Flex, Text, Card, Button, Badge, ScrollArea } from '@radix-ui/themes';
import { sampleCaregivers } from '../../data/caregivers';

interface CaregiverSelectionListProps {
  searchTerm: string;
  selectedStatus: string;
  selectedCaregiver: number | null;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onCaregiverSelect: (id: number) => void;
}

export default function CaregiverSelectionList({
  searchTerm,
  selectedStatus,
  selectedCaregiver,
  onSearchChange,
  onStatusChange,
  onCaregiverSelect
}: CaregiverSelectionListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '활동중': return 'green';
      case '휴직': return 'yellow';
      case '퇴사': return 'red';
      default: return 'gray';
    }
  };

  const filteredCaregivers = sampleCaregivers.filter(caregiver => {
    const matchesSearch = caregiver.name.includes(searchTerm) || 
                         caregiver.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === '전체' || 
                         caregiver.status === selectedStatus;
    return matchesSearch && matchesStatus && caregiver.status !== '퇴사';
  });

  return (
    <Flex direction="column" gap="4">
      <Text size="2" weight="medium">요양보호사 선택</Text>
      
      {/* 검색바 */}
      <input
        type="text"
        placeholder="이름 또는 전화번호로 검색"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
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

      {/* 상태 필터 */}
      <Flex gap="2" wrap="wrap">
        {['전체', '활동중', '휴직'].map(status => (
          <Button
            key={status}
            variant={selectedStatus === status ? 'solid' : 'soft'}
            size="1"
            onClick={() => onStatusChange(status)}
          >
            {status}
          </Button>
        ))}
      </Flex>

      {/* 보호사 목록 */}
      <ScrollArea style={{ height: '300px' }}>
        <Flex direction="column" gap="2">
          {filteredCaregivers.map(caregiver => (
            <Card 
              key={caregiver.id}
              style={{ 
                padding: '12px',
                cursor: 'pointer',
                backgroundColor: selectedCaregiver === caregiver.id ? 'var(--accent-3)' : 'transparent'
              }}
              onClick={() => onCaregiverSelect(caregiver.id)}
            >
              <Flex justify="between" align="center">
                <Flex direction="column" gap="1">
                  <Text weight="medium">{caregiver.name}</Text>
                  <Text size="1" color="gray">{caregiver.phone}</Text>
                </Flex>
                <Flex gap="2" align="center">
                  <Badge color={getStatusColor(caregiver.status)} size="1">
                    {caregiver.status}
                  </Badge>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      </ScrollArea>
    </Flex>
  );
} 