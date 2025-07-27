import { SegmentedControl, Flex, Heading } from '@radix-ui/themes';
import { useState } from 'react';

const tabs = [
  { key: 'card', label: '인사카드' },
  { key: 'register', label: '등록/말소' },
];

export default function UsersPage() {
  const [tab, setTab] = useState('card');

  return (
    <Flex direction="column" gap="5" p="6">
      <Flex align="center" justify="start" mb="4">
        <SegmentedControl.Root value={tab} onValueChange={setTab} size="3">
          {tabs.map(t => (
            <SegmentedControl.Item key={t.key} value={t.key}>
              {t.label}
            </SegmentedControl.Item>
          ))}
        </SegmentedControl.Root>
      </Flex>
      {tab === 'card' && (
        <Heading size="5">요양보호사 인사카드 리스트</Heading>
      )}
      {tab === 'register' && (
        <Heading size="5">요양보호사 등록/말소 화면</Heading>
      )}
    </Flex>
  );
}
