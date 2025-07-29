import { Flex, Heading, Card, Text, Button, Badge, Separator, ScrollArea, Checkbox } from '@radix-ui/themes';
import { PlusIcon, MixIcon } from '@radix-ui/react-icons';

import { Caregiver } from '../../../data/caregivers';

interface CaregiverListProps {
  caregivers: Caregiver[];
  searchTerm: string;
  selectedStatus: string;
  multiSelectMode: boolean;
  selectedCaregiver: number | null;
  selectedCaregivers: number[];
  onSearchChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onMultiSelectToggle: () => void;
  onCaregiverSelect: (id: number) => void;
}

export default function CaregiverList({
  caregivers,
  searchTerm,
  selectedStatus,
  multiSelectMode,
  selectedCaregiver,
  selectedCaregivers,
  onSearchChange,
  onStatusChange,
  onMultiSelectToggle,
  onCaregiverSelect
}: CaregiverListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '활동중': return 'green';
      case '휴직': return 'yellow';
      case '퇴사': return 'red';
      default: return 'gray';
    }
  };

  const getWorkTypeColor = (workType: string) => {
    switch (workType) {
      case '센터': return 'blue';
      case '재가': return 'purple';
      case '방문': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Flex direction="column" gap="4" p="4" style={{ flex: 1, minHeight: 0 }}>
        {/* 검색 및 필터 */}
        <Flex direction="column" gap="3">
          <Flex justify="between" align="center">
            <Heading size="4">요양보호사 목록</Heading>
            <Button 
              variant={multiSelectMode ? 'solid' : 'soft'} 
              size="2"
              onClick={onMultiSelectToggle}
            >
              복수 선택 모드
            </Button>
          </Flex>
          
          {/* 검색바 */}
          <Flex gap="2" align="center">
            <input
              type="text"
              placeholder="이름 또는 전화번호로 검색"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
              style={{
                flex: 1,
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
            <Button variant="soft" size="2" style={{ height: '32px' }}>
              <MixIcon />
            </Button>
          </Flex>

          {/* 상태 필터 */}
          <Flex gap="2" wrap="wrap">
            {['전체', '활동중', '휴직', '퇴사'].map(status => (
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
        </Flex>

        <Separator />

        {/* 요양보호사 목록 */}
        <ScrollArea type='always' scrollbars='vertical' style={{ flex: 1, minHeight: 0 }}>
          <Flex direction="column" gap="3">
            {caregivers.map(caregiver => (
              <Card
                key={caregiver.id}
                style={{
                  cursor: 'pointer',
                  backgroundColor: (!multiSelectMode && selectedCaregiver === caregiver.id) ? 'var(--accent-3)' : 'transparent',
                  marginRight: '10%'
                }}
                onClick={() => onCaregiverSelect(caregiver.id)}
              >
                <Flex gap="2" p="1" align="center">
                  {multiSelectMode && (
                    <Checkbox 
                      checked={selectedCaregivers.includes(caregiver.id)}
                      onChange={() => onCaregiverSelect(caregiver.id)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ marginRight: '2%' }}
                    />
                  )}
                  <Flex direction="column" gap="1" style={{ flex: 1 }}>
                    <Flex justify="between" align="center">
                      <Text weight="medium" size="2">{caregiver.name}</Text>
                      <Badge color={getStatusColor(caregiver.status)} size="1">
                        {caregiver.status}
                      </Badge>
                    </Flex>
                    <Flex justify="between" align="center">
                      <Text size="1" color="gray">{caregiver.phone}</Text>
                      <Badge color={getWorkTypeColor(caregiver.workType)} size="1">
                        {caregiver.workType}
                      </Badge>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Flex>
        </ScrollArea>

        {/* 새 요양보호사 등록 버튼 */}
        <Button style={{ width: '100%' }}>
          <PlusIcon />
          새 요양보호사 등록
        </Button>
      </Flex>
    </Card>
  );
} 