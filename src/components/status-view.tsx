import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { Icon } from './icon';
import { ThemedText } from './themed-text';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type StatusViewProps =
  | { kind: 'loading'; message?: string }
  | { kind: 'empty'; title: string; message?: string }
  | { kind: 'error'; message?: string; onRetry: () => void };

/** Shared loading, empty, and error states. */
export function StatusView(props: StatusViewProps) {
  const theme = useTheme();

  if (props.kind === 'loading') {
    return (
      <View style={styles.container} accessibilityRole="progressbar" accessibilityLabel="Loading">
        <ActivityIndicator color={theme.textSecondary} />
        <ThemedText type="small" themeColor="textSecondary">
          {props.message ?? 'Loading events…'}
        </ThemedText>
      </View>
    );
  }

  if (props.kind === 'empty') {
    return (
      <View style={styles.container}>
        <Icon ios="calendar.badge.exclamationmark" md="event_busy" size={32} color="textSecondary" />
        <ThemedText type="smallBold">{props.title}</ThemedText>
        {props.message && (
          <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
            {props.message}
          </ThemedText>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container} accessibilityRole="alert">
      <Icon ios="exclamationmark.triangle" md="error" size={32} color="textSecondary" />
      <ThemedText type="smallBold">Couldn’t load events</ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
        {props.message ?? 'Something went wrong. Please try again.'}
      </ThemedText>
      <Pressable
        onPress={props.onRetry}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.retry,
          { borderColor: theme.border },
          pressed && styles.pressed,
        ]}>
        <Icon ios="arrow.clockwise" md="refresh" size={16} />
        <ThemedText type="smallBold">Try again</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.three,
  },
  center: {
    textAlign: 'center',
  },
  retry: {
    marginTop: Spacing.two,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderWidth: 1,
    borderRadius: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
});
