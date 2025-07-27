import { Flex, Button, Text, SegmentedControl } from '@radix-ui/themes';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  view: string;
  setView: (v: string) => void;
}

const segments = [
  { key: 'day', label: '일' },
  { key: 'week', label: '주' },
  { key: 'month', label: '월' },
  { key: 'year', label: '년' },
];

export default function CalendarHeader({ year, month, onPrev, onNext, onToday, view, setView }: CalendarHeaderProps) {
  return (
    <Flex align="center" justify="between" mb="4" style={{ width: '100%' }}>
      {/* 왼쪽: 월/년 */}
      <Text size="5" weight="bold">{year}년 {month + 1}월</Text>
      {/* 오른쪽: SegmentedControl + 네비게이션 */}
      <Flex align="center" gap="4">
        <SegmentedControl.Root
          value={view}
          onValueChange={setView}
          size="2"
        >
          {segments.map(seg => (
            <SegmentedControl.Item key={seg.key} value={seg.key}>
              {seg.label}
            </SegmentedControl.Item>
          ))}
        </SegmentedControl.Root>
        <Flex align="center" gap="2">
          <Button onClick={onPrev} variant="ghost" size="2">{'<'}</Button>
          <Button onClick={onToday} variant="soft" size="2">오늘</Button>
          <Button onClick={onNext} variant="ghost" size="2">{'>'}</Button>
        </Flex>
      </Flex>
    </Flex>
  );
} 