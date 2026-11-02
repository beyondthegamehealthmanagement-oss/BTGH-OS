import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { Chip } from './chip';
import { Icon } from './icon';
import { ThemedText } from './themed-text';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FilterOption<T extends string> = { value: T; label: string };

type FilterSelectProps<T extends string> = {
  /** Shown on the chip when the first ("any") option is selected */
  label: string;
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

/** Dropdown chip that opens a small option sheet. The first option means "no filter". */
export function FilterSelect<T extends string>({
  label,
  options,
  value,
  onChange,
}: FilterSelectProps<T>) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isActive = value !== options[0]?.value;
  const current = options.find((option) => option.value === value);

  return (
    <>
      <Chip
        dropdown
        selected={isActive}
        label={isActive && current ? current.label : label}
        accessibilityLabel={`${label} filter: ${current?.label ?? ''}`}
        onPress={() => setOpen(true)}
      />
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          style={styles.backdrop}
          onPress={() => setOpen(false)}
          accessibilityLabel="Close filter options">
          <View
            style={[styles.sheet, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <ThemedText type="smallBold" accessibilityRole="header" style={styles.sheetTitle}>
              {label}
            </ThemedText>
            {options.map((option) => {
              const selected = option.value === value;
              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  onPress={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  style={({ pressed }) => [styles.option, pressed && styles.pressed]}>
                  <ThemedText>{option.label}</ThemedText>
                  {selected && <Icon ios="checkmark" md="check" size={18} />}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.four,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    borderRadius: Spacing.three,
    borderWidth: 1,
    paddingVertical: Spacing.two,
  },
  sheetTitle: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  option: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
  },
  pressed: {
    opacity: 0.6,
  },
});
