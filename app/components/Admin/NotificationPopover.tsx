import { Flex, Text, IconButton } from '@radix-ui/themes';

interface NotificationPopoverProps {
  onOpenChange: (open: boolean) => void;
}

export default function NotificationPopover({ onOpenChange }: NotificationPopoverProps) {
  return (
    <Flex direction="column" gap="3">
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">알림</Text>
        <IconButton 
          variant="ghost" 
          size="1"
          onClick={() => onOpenChange(false)}
        >
          ✕
        </IconButton>
      </Flex>
      
      <Flex direction="column" gap="2">
        <Text size="2" color="gray">새로운 알림이 없습니다.</Text>
        {/* 여기에 실제 알림 내용을 추가할 수 있습니다 */}
      </Flex>
    </Flex>
  );
} 