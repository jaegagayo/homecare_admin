import { Flex, Text, IconButton } from '@radix-ui/themes';

interface SettingsPopoverProps {
  onOpenChange: (open: boolean) => void;
}

export default function SettingsPopover({ onOpenChange }: SettingsPopoverProps) {
  return (
    <Flex direction="column" gap="3">
      <Flex justify="between" align="center">
        <Text size="3" weight="medium">설정</Text>
        <IconButton 
          variant="ghost" 
          size="1"
          onClick={() => onOpenChange(false)}
        >
          ✕
        </IconButton>
      </Flex>
      
      <Flex direction="column" gap="2">
        <Text size="2" color="gray">설정 기능이 준비 중입니다.</Text>
        {/* 여기에 실제 설정 내용을 추가할 수 있습니다 */}
      </Flex>
    </Flex>
  );
} 