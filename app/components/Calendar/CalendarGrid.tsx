import { Card, Flex, Text } from '@radix-ui/themes';

function getDaysArray(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= lastDate; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

const sampleEvents = [
  { date: 18, label: '생일', color: '#e5484d' },
  { date: 10, label: '외할머니 생신', color: '#a259d9' },
  { date: 15, label: '회의', color: '#3b82f6' },
];

export default function CalendarGrid({ year, month }: { year: number, month: number }) {
  const days = getDaysArray(year, month);
  const weekCount = days.length / 7;
  return (
    <Card style={{ background: 'var(--gray-2)', flex: 1, height: '100%', padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: 24, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <Flex gap="2" mb="2">
          {['일', '월', '화', '수', '목', '금', '토'].map(d => (
            <Text key={d} size="3" style={{ flex: 1, textAlign: 'center' }}>{d}</Text>
          ))}
        </Flex>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridTemplateRows: `repeat(${weekCount}, 1fr)`,
            gap: 8,
            flex: 1,
            height: '100%',
            boxSizing: 'border-box',
            minHeight: 0,
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {days.map((d, i) => {
            const event = sampleEvents.find(e => e.date === d);
            return (
              <Card
                key={i}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: 0,
                  minWidth: 0,
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  background: d ? 'var(--gray-4)' : 'transparent',
                  color: d ? 'var(--gray-12)' : 'transparent',
                  border: d ? '1px solid var(--gray-6)' : 'none',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: 8,
                }}
              >
                {d && <Text size="4" weight="bold">{d}</Text>}
                {d && event && (
                  <div style={{
                    position: 'absolute', bottom: 8, left: 8, right: 8,
                    background: event.color, color: 'white', borderRadius: 6, fontSize: 12, padding: '2px 6px',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {event.label}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </Card>
  );
} 