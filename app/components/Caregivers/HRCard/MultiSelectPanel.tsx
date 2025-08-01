import { Flex, Heading, Card, Text, Button, Badge, ScrollArea, Table } from '@radix-ui/themes';
import { EnvelopeClosedIcon, ChatBubbleIcon, PersonIcon, DownloadIcon } from '@radix-ui/react-icons';

import { Caregiver } from '../../../data/caregivers';

interface MultiSelectPanelProps {
  selectedCaregivers: Caregiver[];
  onClearSelection: () => void;
  onRemoveCaregiver: (caregiverId: number) => void;
}

export default function MultiSelectPanel({ selectedCaregivers, onClearSelection, onRemoveCaregiver }: MultiSelectPanelProps) {
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
      case '방문요양': return 'blue';
      case '주·야간보호': return 'purple';
      case '단기보호': return 'green';
      case '방문목욕': return 'orange';
      case '재가노인지원': return 'yellow';
      case '방문간호': return 'red';
      default: return 'gray';
    }
  };

  const handleExportToExcel = () => {
    // 엑셀 출력 로직
    console.log('엑셀로 출력:', selectedCaregivers);
    // 실제 구현에서는 엑셀 파일 생성 및 다운로드 로직을 추가
  };

  return (
    <Card style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
      <Flex direction="column" p="4" style={{ flex: 1, minHeight: 0 }}>
        <Flex justify="between" align="center" style={{ marginBottom: 8 }}>
          <Heading size="4">선택된 요양보호사 ({selectedCaregivers.length}명)</Heading>
          <Button variant="soft" size="2" color='red'onClick={onClearSelection}>
            전체 선택 취소
          </Button>
        </Flex>

        <Table.Root style={{ tableLayout: 'fixed', width: '100%' }}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell style={{ width: '20%' }}>이름</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: '25%' }}>전화번호</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: '15%' }}>상태</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: '20%' }}>근무유형</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: '20%' }}></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
        </Table.Root>
        
        <ScrollArea style={{ flex: 1, minHeight: 0, marginTop: 0 }}>
          <Table.Root style={{ tableLayout: 'fixed', width: '100%' }}>
            <Table.Body>
              {selectedCaregivers.map(caregiver => (
                <Table.Row key={caregiver.id}>
                  <Table.Cell style={{ width: '20%' }}>
                    <Text weight="medium" size="2">{caregiver.name}</Text>
                  </Table.Cell>
                  <Table.Cell style={{ width: '25%' }}>
                    <Text size="2" color="gray">{caregiver.phone}</Text>
                  </Table.Cell>
                  <Table.Cell style={{ width: '15%' }}>
                    <Badge color={getStatusColor(caregiver.status)} size="1">
                      {caregiver.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell style={{ width: '20%' }}>
                    <Badge color={getWorkTypeColor(caregiver.workTypes[0])} size="1">
                      {caregiver.workTypes.length > 1 
                        ? `${caregiver.workTypes[0]} 외 ${caregiver.workTypes.length - 1}개`
                        : caregiver.workTypes[0]
                      }
                    </Badge>
                  </Table.Cell>
                  <Table.Cell style={{ width: '20%' }}>
                    <Button
                      variant="soft"
                      size="1"
                      color="red"
                      onClick={() => onRemoveCaregiver(caregiver.id)}
                    >
                      선택 취소
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </ScrollArea>

        {/* 일괄 작업 버튼들 */}
        <Card style={{ marginTop: 16 }}>
          <Heading size="3" mb="3">일괄 작업</Heading>
          <Flex gap="3" wrap="wrap">
            <Button variant="soft" size="2">
              <ChatBubbleIcon />
              일괄 메시지 보내기
            </Button>
            <Button variant="soft" size="2">
              <EnvelopeClosedIcon />
              일괄 이메일 보내기
            </Button>
            <Button variant="soft" size="2">
              <PersonIcon />
              일괄 근무 상태 수정
            </Button>
            <Button variant="soft" size="2" onClick={handleExportToExcel}>
              <DownloadIcon />
              엑셀로 출력하기
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Card>
  );
} 