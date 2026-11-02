import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from './icon';
import { ThemedText } from './themed-text';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Small grey label, e.g. the event type. */
export function Tag({ label }: { label: string }) {
  const theme = useTheme();

  return (
    <View style={[styles.tag, { backgroundColor: theme.backgroundSelected }]}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.tagText}>
        {label}
      </ThemedText>
    </View>
  );
}

type ChipProps = {
  label: string;
  onPress: () => void;
  selected?: boolean;
  /** Shows a dropdown chevron and outlined style */
  dropdown?: boolean;
  accessibilityLabel?: string;
};

/** Pill button used for category tabs (filled when selected) and filter dropdowns (outlined). */
export function Chip({ label, onPress, selected, dropdown, accessibilityLabel }: ChipProps) {
  const theme = useTheme();
  const filled = selected && !dropdown;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={dropdown ? 'button' : 'tab'}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={dropdown ? undefined : { selected: !!selected }}
      style={({ pressed }) => [
        styles.chip,
        dropdown
          ? { borderColor: selected ? theme.text : theme.border, backgroundColor: theme.background }
          : { borderColor: 'transparent', backgroundColor: filled ? theme.primary : theme.backgroundElement },
        pressed && styles.pressed,
      ]}>
      <ThemedText
        type="small"
        numberOfLines={1}
        style={{ color: filled ? theme.onPrimary : theme.text }}>
        {label}
      </ThemedText>
      {dropdown && <Icon ios="chevron.down" md="expand_more" size={16} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  tagText: {
    fontSize: 12,
    lineHeight: 16,
  },
  chip: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
