import { Flex, Heading, Text, Card, Button, Badge, Table, ScrollArea, Tabs, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { sampleRegistrationRecords } from '../../data/registrations';
import { sampleCaregivers } from '../../data/caregivers';

export default function RegistrationPage() {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [directName, setDirectName] = useState('');
  const [directPhone, setDirectPhone] = useState('');
  const [directBirthDate, setDirectBirthDate] = useState('');
  const [directEmail, setDirectEmail] = useState('');
  const [directAddress, setDirectAddress] = useState('');
  const [deletionStep, setDeletionStep] = useState<'select' | 'reason' | 'confirm'>('select');
  const [selectedCaregiverForDeletion, setSelectedCaregiverForDeletion] = useState<number | null>(null);
  const [deletionReason, setDeletionReason] = useState('');
  const [deletionSearchTerm, setDeletionSearchTerm] = useState('');
  const [deletionSelectedStatus, setDeletionSelectedStatus] = useState('전체');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'green';
      case 'rejected': return 'red';
      case 'pending': return 'orange';
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return '승인';
      case 'rejected': return '반려';
      case 'pending': return '대기';
      default: return '알 수 없음';
    }
  };

  const getRequestTypeText = (type: string) => {
    switch (type) {
      case 'registration': return '등록';
      case 'deletion': return '말소';
      default: return '알 수 없음';
    }
  };

  const getRequestTypeColor = (type: string) => {
    switch (type) {
      case 'registration': return 'blue';
      case 'deletion': return 'red';
      default: return 'gray';
    }
  };

  const filteredRecords = sampleRegistrationRecords.filter(record => {
    if (selectedTab === 'pending') return record.status === 'pending';
    if (selectedTab === 'approved') return record.status === 'approved';
    if (selectedTab === 'rejected') return record.status === 'rejected';
    return true;
  });

  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'pending': return sampleRegistrationRecords.filter(r => r.status === 'pending').length;
      case 'approved': return sampleRegistrationRecords.filter(r => r.status === 'approved').length;
      case 'rejected': return sampleRegistrationRecords.filter(r => r.status === 'rejected').length;
      default: return 0;
    }
  };

  const handleApprove = (id: string) => {
    console.log('승인:', id);
  };

  const handleReject = (id: string) => {
    console.log('반려:', id);
  };

  const handleDirectRegistrationSubmit = () => {
    console.log('직권 등록:', {
      name: directName,
      phone: directPhone,
      birthDate: directBirthDate,
      email: directEmail,
      address: directAddress
    });
    // 폼 초기화
    setDirectName('');
    setDirectPhone('');
    setDirectBirthDate('');
    setDirectEmail('');
    setDirectAddress('');
  };

  const handleDirectDeletionSubmit = () => {
    if (!selectedCaregiverForDeletion) return;
    
    const selectedCaregiver = sampleCaregivers.find(c => c.id === selectedCaregiverForDeletion);
    console.log('직권 말소:', {
      caregiver: selectedCaregiver,
      reason: deletionReason
    });
    
    // 폼 초기화
    setSelectedCaregiverForDeletion(null);
    setDeletionReason('');
  };

  return (
    <Flex direction="column" gap="5" style={{ height: '100vh' }}>
      {/* 등록/말소 요청 관리 */}
      <Flex direction="column" style={{ flex: 1 }}>
        <Heading size="4" mb="4">등록/말소 요청 관리</Heading>
        
        <Tabs.Root value={selectedTab} onValueChange={setSelectedTab}>
          <Tabs.List>
            <Tabs.Trigger value="pending">대기 중 ({getTabCount('pending')})</Tabs.Trigger>
            <Tabs.Trigger value="approved">승인됨 ({getTabCount('approved')})</Tabs.Trigger>
            <Tabs.Trigger value="rejected">반려됨 ({getTabCount('rejected')})</Tabs.Trigger>
            <Tabs.Trigger value="direct-registration">직권 등록</Tabs.Trigger>
            <Tabs.Trigger value="direct-deletion">직권 말소</Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        {selectedTab === 'direct-registration' ? (
          // 직권 등록 폼
          <Flex gap="6" style={{ marginTop: '16px' }}>
            {/* 좌측: 입력 폼 */}
            <Card style={{ flex: 1, padding: '20px' }}>
              <Heading size="3" mb="4">직권 등록</Heading>
              
              <Flex direction="column" gap="4">
                {/* 기본 정보 */}
                <Flex gap="4">
                  <Flex direction="column" gap="2" style={{ flex: 1 }}>
                    <Text size="2" weight="medium">보호사명 *</Text>
                    <TextField.Root 
                      placeholder="보호사명을 입력하세요"
                      value={directName}
                      onChange={(e) => setDirectName(e.target.value)}
                    />
                  </Flex>
                  <Flex direction="column" gap="2" style={{ flex: 1 }}>
                    <Text size="2" weight="medium">전화번호 *</Text>
                    <TextField.Root 
                      placeholder="전화번호를 입력하세요"
                      value={directPhone}
                      onChange={(e) => setDirectPhone(e.target.value)}
                    />
                  </Flex>
                </Flex>

                <Flex gap="4">
                  <Flex direction="column" gap="2" style={{ flex: 1 }}>
                    <Text size="2" weight="medium">생년월일 *</Text>
                    <TextField.Root 
                      placeholder="YYYY-MM-DD"
                      value={directBirthDate}
                      onChange={(e) => setDirectBirthDate(e.target.value)}
                    />
                  </Flex>
                  <Flex direction="column" gap="2" style={{ flex: 1 }}>
                    <Text size="2" weight="medium">이메일</Text>
                    <TextField.Root 
                      placeholder="이메일을 입력하세요 (선택사항)"
                      value={directEmail}
                      onChange={(e) => setDirectEmail(e.target.value)}
                    />
                  </Flex>
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" weight="medium">주소 *</Text>
                  <TextField.Root 
                    placeholder="주소를 입력하세요"
                    value={directAddress}
                    onChange={(e) => setDirectAddress(e.target.value)}
                  />
                </Flex>

                <Button 
                  onClick={handleDirectRegistrationSubmit}
                  disabled={!directName || !directPhone || !directBirthDate || !directAddress}
                  style={{ marginTop: '8px' }}
                >
                  등록 처리
                </Button>
              </Flex>
            </Card>

            {/* 우측: 안내 텍스트 */}
            <Flex direction="column" gap="4" style={{ flex: 1, padding: '20px' }}>
              <Text size="3" weight="medium" color="blue">추가 정보 입력 안내</Text>
              
              <Text size="2" color="gray">
                추가 정보는 등록 후 인사카드에서 조회 후 편집을 통해 입력할 수 있습니다.
              </Text>
            </Flex>
          </Flex>
        ) : selectedTab === 'direct-deletion' ? (
          // 직권 말소 3단계
          <Flex gap="6" style={{ marginTop: '16px' }}>
            {/* 좌측: 단계별 폼 */}
            <Card style={{ flex: 1, padding: '20px' }}>
              <Heading size="3" mb="4">직권 말소</Heading>
              
              {/* 단계 표시 */}
              <Flex gap="2" mb="4">
                <Button 
                  variant={deletionStep === 'select' ? 'solid' : 'soft'} 
                  size="1"
                  onClick={() => setDeletionStep('select')}
                >
                  1. 보호사 선택
                </Button>
                <Button 
                  variant={deletionStep === 'reason' ? 'solid' : 'soft'} 
                  size="1"
                  onClick={() => setDeletionStep('reason')}
                  disabled={!selectedCaregiverForDeletion}
                >
                  2. 사유 작성
                </Button>
                <Button 
                  variant={deletionStep === 'confirm' ? 'solid' : 'soft'} 
                  size="1"
                  onClick={() => setDeletionStep('confirm')}
                  disabled={!selectedCaregiverForDeletion || !deletionReason}
                >
                  3. 말소 확정
                </Button>
              </Flex>

              {/* 단계별 내용 */}
              {deletionStep === 'select' && (
                <Flex direction="column" gap="4">
                  <Text size="2" weight="medium">말소할 보호사 선택</Text>
                  
                  {/* 검색바 */}
                  <input
                    type="text"
                    placeholder="이름 또는 전화번호로 검색"
                    value={deletionSearchTerm}
                    onChange={(e) => setDeletionSearchTerm(e.target.value)}
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
                        variant={deletionSelectedStatus === status ? 'solid' : 'soft'}
                        size="1"
                        onClick={() => setDeletionSelectedStatus(status)}
                      >
                        {status}
                      </Button>
                    ))}
                  </Flex>

                  {/* 보호사 목록 */}
                  <ScrollArea style={{ height: '300px' }}>
                    <Flex direction="column" gap="2">
                      {sampleCaregivers
                        .filter(caregiver => {
                          const matchesSearch = caregiver.name.includes(deletionSearchTerm) || 
                                               caregiver.phone.includes(deletionSearchTerm);
                          const matchesStatus = deletionSelectedStatus === '전체' || 
                                               caregiver.status === deletionSelectedStatus;
                          return matchesSearch && matchesStatus && caregiver.status !== '퇴사';
                        })
                        .map(caregiver => (
                          <Card 
                            key={caregiver.id}
                            style={{ 
                              padding: '12px',
                              cursor: 'pointer',
                              backgroundColor: selectedCaregiverForDeletion === caregiver.id ? 'var(--accent-3)' : 'transparent'
                            }}
                            onClick={() => setSelectedCaregiverForDeletion(caregiver.id)}
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
                                <Badge color={getWorkTypeColor(caregiver.workType)} size="1">
                                  {caregiver.workType}
                                </Badge>
                              </Flex>
                            </Flex>
                          </Card>
                        ))}
                    </Flex>
                  </ScrollArea>

                  {selectedCaregiverForDeletion && (
                    <Button 
                      onClick={() => setDeletionStep('reason')}
                      style={{ marginTop: '8px' }}
                    >
                      다음 단계
                    </Button>
                  )}
                </Flex>
              )}

              {deletionStep === 'reason' && (
                <Flex direction="column" gap="4">
                  <Text size="2" weight="medium">말소 사유 작성</Text>
                  
                  {selectedCaregiverForDeletion && (
                    <Card style={{ padding: '12px', backgroundColor: 'var(--blue-2)' }}>
                      <Text size="2" weight="medium">
                        선택된 보호사: {sampleCaregivers.find(c => c.id === selectedCaregiverForDeletion)?.name}
                      </Text>
                    </Card>
                  )}

                  <TextField.Root 
                    placeholder="말소 사유를 상세히 입력하세요"
                    value={deletionReason}
                    onChange={(e) => setDeletionReason(e.target.value)}
                    style={{ minHeight: '100px' }}
                  />

                  <Flex gap="2">
                    <Button 
                      variant="soft"
                      onClick={() => setDeletionStep('select')}
                    >
                      이전 단계
                    </Button>
                    <Button 
                      onClick={() => setDeletionStep('confirm')}
                      disabled={!deletionReason}
                    >
                      다음 단계
                    </Button>
                  </Flex>
                </Flex>
              )}

              {deletionStep === 'confirm' && (
                <Flex direction="column" gap="4">
                  <Text size="2" weight="medium">말소 확정</Text>
                  
                  <Card style={{ padding: '16px', backgroundColor: 'var(--red-2)' }}>
                    <Flex direction="column" gap="3">
                      <Text size="2" weight="medium" color="red">말소 대상</Text>
                      {selectedCaregiverForDeletion && (
                        <Text size="2">
                          {sampleCaregivers.find(c => c.id === selectedCaregiverForDeletion)?.name} 
                          ({sampleCaregivers.find(c => c.id === selectedCaregiverForDeletion)?.phone})
                        </Text>
                      )}
                    </Flex>
                  </Card>

                  <Card style={{ padding: '16px' }}>
                    <Flex direction="column" gap="3">
                      <Text size="2" weight="medium">말소 사유</Text>
                      <Text size="2" color="gray">{deletionReason}</Text>
                    </Flex>
                  </Card>

                  <Flex gap="2">
                    <Button 
                      variant="soft"
                      onClick={() => setDeletionStep('reason')}
                    >
                      이전 단계
                    </Button>
                    <Button 
                      onClick={handleDirectDeletionSubmit}
                      color="red"
                    >
                      말소 확정
                    </Button>
                  </Flex>
                </Flex>
              )}
            </Card>

            {/* 우측: 안내 텍스트 */}
            <Flex direction="column" gap="4" style={{ flex: 1, padding: '20px' }}>
              <Text size="3" weight="medium" color="red">직권 말소 안내</Text>
              
              <Text size="2" color="gray">
                말소 처리는 되돌릴 수 없으므로 신중하게 진행해주세요.
              </Text>
            </Flex>
          </Flex>
        ) : (
          // 요청 목록 테이블
          <ScrollArea style={{ height: '400px', marginTop: '16px' }}>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>보호사명</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>전화번호</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>요청 유형</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>요청 일자</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>상태</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>사유</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>작업</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredRecords.map(record => (
                  <Table.Row key={record.id}>
                    <Table.Cell>
                      <Text weight="medium">{record.caregiverName}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="2" color="gray">{record.phone}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color={getRequestTypeColor(record.requestType)} size="1">
                        {getRequestTypeText(record.requestType)}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="2">{record.requestDate}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color={getStatusColor(record.status)} size="1">
                        {getStatusText(record.status)}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="2" color="gray">{record.reason}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      {record.status === 'pending' ? (
                        <Flex gap="2">
                          <Button 
                            variant="soft" 
                            size="1" 
                            color="green"
                            onClick={() => handleApprove(record.id)}
                          >
                            승인
                          </Button>
                          <Button 
                            variant="soft" 
                            size="1" 
                            color="red"
                            onClick={() => handleReject(record.id)}
                          >
                            반려
                          </Button>
                        </Flex>
                      ) : (
                        <Text size="2" color="gray">-</Text>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </ScrollArea>
        )}
      </Flex>
    </Flex>
  );
} 