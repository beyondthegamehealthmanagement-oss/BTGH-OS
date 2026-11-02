import { StyleSheet, TextInput, View } from 'react-native';

import { Icon } from './icon';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
};

export function SearchBar({ value, onChangeText, onSubmit }: SearchBarProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderColor: theme.border, backgroundColor: theme.background }]}>
      <Icon ios="magnifyingglass" md="search" size={20} color="textSecondary" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="Search events, athletes, causes…"
        placeholderTextColor={theme.textSecondary}
        accessibilityLabel="Search events, athletes, causes"
        returnKeyType="search"
        autoCorrect={false}
        clearButtonMode="while-editing"
        style={[styles.input, { color: theme.text }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderWidth: 1,
    borderRadius: Spacing.two,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: Spacing.two,
  },
});
