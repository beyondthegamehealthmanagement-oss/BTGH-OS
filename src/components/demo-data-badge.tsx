import { StyleSheet, View } from 'react-native';

import { Icon } from './icon';
import { ThemedText } from './themed-text';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Visible notice that the content is fictional sample data. */
export function DemoDataBadge() {
  const theme = useTheme();

  return (
    <View style={[styles.badge, { borderColor: theme.border }]}>
      <Icon ios="info.circle" md="info" size={14} color="textSecondary" />
      <ThemedText type="small" themeColor="textSecondary" style={styles.text}>
        Demo data — events shown are fictional
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
  },
});
