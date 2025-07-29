import { Flex } from '@radix-ui/themes';
import { useState } from 'react';
import PageHeader from '../Common/PageHeader';
import CaregiverList from './HRCard/CaregiverList';
import CaregiverCard from './HRCard/CaregiverCard';
import MultiSelectPanel from './HRCard/MultiSelectPanel';
import RegistrationPage from './Registration/RegistrationPage';
import { sampleCaregivers } from '../../data/caregivers';

const tabs = [
  { key: 'card', label: '인사카드' },
  { key: 'register', label: '등록/말소' },
];

export default function CaregiversPage() {
  const [tab, setTab] = useState('card');
  const [selectedCaregiver, setSelectedCaregiver] = useState<number | null>(null);
  const [selectedCaregivers, setSelectedCaregivers] = useState<number[]>([]);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('전체');

  const handleCaregiverSelect = (caregiverId: number) => {
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

  const handleRemoveCaregiver = (caregiverId: number) => {
    setSelectedCaregivers(prev => prev.filter(id => id !== caregiverId));
  };

  const selectedCaregiversData = sampleCaregivers.filter(caregiver => 
    selectedCaregivers.includes(caregiver.id)
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
            caregivers={sampleCaregivers}
            searchTerm={searchTerm}
            selectedStatus={selectedStatus}
            multiSelectMode={multiSelectMode}
            selectedCaregiver={selectedCaregiver}
            selectedCaregivers={selectedCaregivers}
            onSearchChange={setSearchTerm}
            onStatusChange={setSelectedStatus}
            onMultiSelectToggle={handleMultiSelectToggle}
            onCaregiverSelect={handleCaregiverSelect}
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
              caregivers={sampleCaregivers}
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