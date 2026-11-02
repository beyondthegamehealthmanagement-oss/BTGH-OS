import { router, type Href } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { IconButton } from './icon-button';
import { ThemedText } from './themed-text';

import { Spacing } from '@/constants/theme';

type AppHeaderProps = {
  /** Show a back arrow; goes back, or to `backFallback` when there is no history. */
  showBack?: boolean;
  backFallback?: Href;
  showProfile?: boolean;
};

export function AppHeader({ showBack, backFallback = '/', showProfile }: AppHeaderProps) {
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(backFallback);
    }
  };

  return (
    <View style={styles.header}>
      <View style={[styles.side, styles.left]}>
        {showBack && <IconButton label="Back" ios="arrow.left" md="arrow_back" onPress={goBack} />}
      </View>

      <ThemedText style={styles.title} accessibilityRole="header">
        BTGH OS
      </ThemedText>

      <View style={[styles.side, styles.right]}>
        {/* Notifications and profile are not built yet; buttons are placeholders. */}
        <IconButton label="Notifications (coming soon)" ios="bell" md="notifications" />
        {showProfile && (
          <IconButton label="Profile (coming soon)" ios="person.crop.circle" md="account_circle" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    paddingHorizontal: Spacing.two,
  },
  side: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: 800,
    letterSpacing: 0.5,
  },
});
