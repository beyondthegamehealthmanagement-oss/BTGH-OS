import { Pressable, StyleSheet } from 'react-native';

import { Icon, type IconProps } from './icon';

type IconButtonProps = Pick<IconProps, 'ios' | 'md' | 'size' | 'color'> & {
  label: string;
  onPress?: () => void;
  selected?: boolean;
};

export function IconButton({ label, onPress, selected, size = 24, ...icon }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={selected === undefined ? undefined : { selected }}
      hitSlop={8}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Icon size={size} {...icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
