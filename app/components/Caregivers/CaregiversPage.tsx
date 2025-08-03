import { Flex } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import PageHeader from '../Common/PageHeader';
import CaregiverList from '../Common/CaregiverList';
import CaregiverCard from './HRCard/CaregiverCard';
import MultiSelectPanel from './HRCard/MultiSelectPanel';
import RegistrationPage from './Registration/RegistrationPage';
import { getCaregivers, CaregiverApi } from '../../api';
import { Caregiver } from '../../data/caregivers';

const tabs = [
  { key: 'card', label: '인사카드' },
  { key: 'register', label: '등록/말소' },
];

export default function CaregiversPage() {
  const [tab, setTab] = useState('card');
  const [selectedCaregiver, setSelectedCaregiver] = useState<string | null>(null);
  const [selectedCaregivers, setSelectedCaregivers] = useState<string[]>([]);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [apiCaregivers, setApiCaregivers] = useState<CaregiverApi[]>([]);

  // API에서 요양보호사 데이터 가져오기
  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const data = await getCaregivers();
        setApiCaregivers(data);
        console.log('요양보호사 데이터 로드 성공:', data);
      } catch (err) {
        console.error('요양보호사 로드 실패:', err);
      }
    };

    fetchCaregivers();
  }, []);

  // API 데이터를 기존 형식으로 변환
  const convertApiDataToCaregivers = (apiData: CaregiverApi[]): Caregiver[] => {
    return apiData.map(caregiver => ({
      caregiverId: caregiver.caregiverId,
      name: caregiver.name,
      phone: caregiver.phone,
      status: caregiver.status === 'ACTIVE' ? '활동중' : '휴직',
      workTypes: caregiver.serviceTypes.map(type => {
        switch (type) {
          case 'VISITING_CARE': return '방문요양';
          case 'DAY_NIGHT_CARE': return '주·야간보호';
          case 'RESPITE_CARE': return '단기보호';
          case 'VISITING_BATH': return '방문목욕';
          case 'IN_HOME_SUPPORT': return '재가노인지원';
          case 'VISITING_NURSING': return '방문간호';
          default: return '방문요양';
        }
      }),
      joinDate: new Date().toISOString().split('T')[0],
      avatar: null,
      email: `${caregiver.name}@example.com`,
      birthDate: '1980-01-01',
      address: '기본 주소',
      licenseNumber: '2023-000000',
      licenseDate: '2023-01-01',
      education: '완료',
      hourlyWage: 12000,
      workArea: '서울시',
    }));
  };

  const convertedCaregivers = convertApiDataToCaregivers(apiCaregivers);

  const handleCaregiverSelect = (caregiverId: string) => {
    if (multiSelectMode) {
      setSelectedCaregivers(prev => 
        prev.includes(caregiverId) 
          ? prev.filter(id => id !== caregiverId)
          : [...prev, caregiverId]
      );
    } else {
      setSelectedCaregiver(caregiverId);
    }
  };

  const handleMultiSelectToggle = () => {
    setMultiSelectMode(!multiSelectMode);
    if (multiSelectMode) {
      setSelectedCaregivers([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedCaregivers([]);
  };

  const handleRemoveCaregiver = (caregiverId: string) => {
    setSelectedCaregivers(prev => prev.filter(id => id !== caregiverId));
  };

  const selectedCaregiversData = convertedCaregivers.filter(caregiver => 
    selectedCaregivers.includes(caregiver.caregiverId)
  );

  return (
    <Flex direction="column" gap="5" p="6" style={{ height: '100vh' }}>
      <PageHeader 
        tabs={tabs}
        selectedTab={tab}
        onTabChange={setTab}
      />
      
      {tab === 'card' && (
        <Flex gap="6" style={{ flex: 1, minHeight: 0 }}>
          <CaregiverList
            searchTerm={searchTerm}
            selectedStatus={selectedStatus}
            multiSelectMode={multiSelectMode}
            selectedCaregiver={selectedCaregiver}
            selectedCaregivers={selectedCaregivers}
            onSearchChange={setSearchTerm}
            onStatusChange={setSelectedStatus}
            onCaregiverSelect={handleCaregiverSelect}
            onMultiSelectToggle={handleMultiSelectToggle}
            showMultiSelectToggle={true}
          />
          
          {multiSelectMode && selectedCaregivers.length > 0 ? (
            <MultiSelectPanel
              selectedCaregivers={selectedCaregiversData}
              onClearSelection={handleClearSelection}
              onRemoveCaregiver={handleRemoveCaregiver}
            />
          ) : (
            <CaregiverCard
              selectedCaregiver={selectedCaregiver}
              caregivers={convertedCaregivers}
            />
          )}
        </Flex>
      )}

      {tab === 'register' && (
        <RegistrationPage />
      )}
    </Flex>
  );
} 