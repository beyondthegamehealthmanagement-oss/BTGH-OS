import { StyleSheet, View } from 'react-native';

import { AppHeader } from './app-header';
import { Icon, type IconProps } from './icon';
import { Screen } from './screen';
import { ThemedText } from './themed-text';

import { Spacing } from '@/constants/theme';

type ComingSoonScreenProps = {
  title: string;
  icon: Pick<IconProps, 'ios' | 'md'>;
};

/** Placeholder for tabs shown in the design but not built yet. */
export function ComingSoonScreen({ title, icon }: ComingSoonScreenProps) {
  return (
    <Screen header={<AppHeader />}>
      <View style={styles.container}>
        <Icon {...icon} size={40} color="textSecondary" />
        <ThemedText type="smallBold" style={styles.title} accessibilityRole="header">
          {title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Coming soon.
        </ThemedText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.six,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
  },
});
