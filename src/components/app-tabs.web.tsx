import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import type { ComponentRef, Ref } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

import { Icon, type IconProps } from './icon';
import { ThemedText } from './themed-text';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TabIcon = Pick<IconProps, 'ios' | 'md'>;

export default function AppTabs() {
  return (
    <Tabs style={styles.tabs}>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton icon={{ ios: 'house', md: 'home' }}>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="events" href="/events" asChild>
            <TabButton icon={{ ios: 'calendar', md: 'event' }}>Events</TabButton>
          </TabTrigger>
          <TabTrigger name="discover" href="/discover" asChild>
            <TabButton icon={{ ios: 'safari', md: 'explore' }}>Discover</TabButton>
          </TabTrigger>
          <TabTrigger name="impact" href="/impact" asChild>
            <TabButton icon={{ ios: 'chart.bar', md: 'bar_chart' }}>Impact</TabButton>
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton icon={{ ios: 'person', md: 'person' }}>Profile</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({
  children,
  isFocused,
  ref,
  icon,
  ...props
}: TabTriggerSlotProps & { icon: TabIcon }) {
  return (
    <Pressable
      {...props}
      // expo-router types the slot ref as Ref<View>, which no longer matches Pressable's ref type
      ref={ref as Ref<ComponentRef<typeof Pressable>>}
      accessibilityState={{ selected: !!isFocused }}
      style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}>
      <Icon {...icon} size={24} color={isFocused ? 'text' : 'textSecondary'} />
      <ThemedText
        type={isFocused ? 'smallBold' : 'small'}
        themeColor={isFocused ? 'text' : 'textSecondary'}
        style={styles.tabLabel}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const theme = useTheme();

  return (
    <View
      {...props}
      style={[styles.tabBar, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
      <View style={styles.tabRow}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
  },
  slot: {
    flex: 1,
  },
  tabBar: {
    borderTopWidth: 1,
    alignItems: 'center',
  },
  tabRow: {
    width: '100%',
    maxWidth: MaxContentWidth,
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.half,
    paddingVertical: Spacing.one,
  },
  tabLabel: {
    fontSize: 11,
    lineHeight: 14,
  },
  pressed: {
    opacity: 0.7,
  },
});
