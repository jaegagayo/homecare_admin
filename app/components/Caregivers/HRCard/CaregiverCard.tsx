import { Flex, Heading, Card, Text, Button, Badge, ScrollArea } from '@radix-ui/themes';
import { Caregiver } from '../../../data/caregivers';
import { WORK_TYPE_COLORS } from '../../../constants/workTypes';

interface CaregiverCardProps {
  selectedCaregiver: number | null;
  caregivers: Caregiver[];
}

export default function CaregiverCard({ selectedCaregiver, caregivers }: CaregiverCardProps) {
  const caregiver = caregivers.find(c => c.id === selectedCaregiver);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '활동중': return 'green';
      case '휴직': return 'yellow';
      case '퇴사': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Card style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
      <Flex direction="column" gap="4" p="4" style={{ flex: 1 }}>
        <Flex justify="between" align="center">
          <Heading size="4">인사카드</Heading>
          <Button variant="soft" size="2">편집</Button>
        </Flex>

        {caregiver ? (
          <ScrollArea style={{ flex: 1 }}>
            <Flex direction="column" gap="6">
              {/* 기본 정보 */}
              <Card>
                <Heading size="3" mb="3">기본 정보</Heading>
                <Flex gap="6" wrap="wrap">
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">이름</Text>
                    <Text size="3" weight="medium">{caregiver.name}</Text>
                  </Flex>
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">생년월일</Text>
                    <Text size="3" weight="medium">{caregiver.birthDate ? formatDate(caregiver.birthDate) : '-'}</Text>
                  </Flex>
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">전화번호</Text>
                    <Text size="3" weight="medium">{caregiver.phone}</Text>
                  </Flex>
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">이메일</Text>
                    <Text size="3" weight="medium">{caregiver.email || '-'}</Text>
                  </Flex>
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">주소</Text>
                    <Text size="3" weight="medium">{caregiver.address || '-'}</Text>
                  </Flex>
                </Flex>
              </Card>

              {/* 근무 정보 */}
              <Card>
                <Heading size="3" mb="3">근무 정보</Heading>
                <Flex gap="6" wrap="wrap">
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">상태</Text>
                    <Badge color={getStatusColor(caregiver.status)} size="2">
                      {caregiver.status}
                    </Badge>
                  </Flex>
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">근무 유형</Text>
                    <Flex gap="2" wrap="wrap">
                      {caregiver.workTypes.map((workType, index) => (
                        <Badge 
                          key={index} 
                          color={WORK_TYPE_COLORS[workType] as "blue" | "purple" | "green" | "orange" | "yellow" | "red"} 
                          size="2"
                        >
                          {workType}
                        </Badge>
                      ))}
                    </Flex>
                  </Flex>
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">입사일</Text>
                    <Text size="3" weight="medium">{formatDate(caregiver.joinDate)}</Text>
                  </Flex>
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">근무 지역</Text>
                    <Text size="3" weight="medium">{caregiver.workArea || '-'}</Text>
                  </Flex>
                </Flex>
              </Card>

              {/* 자격 정보 */}
              <Card>
                <Heading size="3" mb="3">자격 정보</Heading>
                <Flex gap="6" wrap="wrap">
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">요양보호사 자격증</Text>
                    <Text size="3" weight="medium">{caregiver.licenseNumber || '-'}</Text>
                  </Flex>
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">자격 취득일</Text>
                    <Text size="3" weight="medium">{caregiver.licenseDate ? formatDate(caregiver.licenseDate) : '-'}</Text>
                  </Flex>
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">교육 이수</Text>
                    <Text size="3" weight="medium">{caregiver.education || '-'}</Text>
                  </Flex>
                </Flex>
              </Card>

              {/* 급여 정보 */}
              <Card>
                <Heading size="3" mb="3">급여 정보</Heading>
                <Flex gap="6" wrap="wrap">
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">시급</Text>
                    <Text size="3" weight="medium">{caregiver.hourlyWage ? formatCurrency(caregiver.hourlyWage) : '-'}</Text>
                  </Flex>
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">이번달 근무시간</Text>
                    <Text size="3" weight="medium">160시간</Text>
                  </Flex>
                  <Flex direction="column" gap="2" style={{ minWidth: 200 }}>
                    <Text size="2" color="gray">이번달 급여</Text>
                    <Text size="3" weight="medium">
                      {caregiver.hourlyWage ? formatCurrency(caregiver.hourlyWage * 160) : '-'}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </Flex>
          </ScrollArea>
        ) : (
          <Flex justify="center" align="center" style={{ flex: 1 }}>
            <Text size="3" color="gray">보호사를 선택해주세요</Text>
          </Flex>
        )}
      </Flex>
    </Card>
  );
} 