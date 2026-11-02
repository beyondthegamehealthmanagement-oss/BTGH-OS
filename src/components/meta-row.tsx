import { StyleSheet, View } from 'react-native';

import { Icon, type IconProps } from './icon';
import { ThemedText } from './themed-text';

import { Spacing } from '@/constants/theme';

type MetaRowProps = Pick<IconProps, 'ios' | 'md'> & {
  children: string;
  size?: 'small' | 'default';
};

/** Icon + text line used for date, time, and location. */
export function MetaRow({ ios, md, children, size = 'small' }: MetaRowProps) {
  return (
    <View style={styles.row}>
      <Icon ios={ios} md={md} size={size === 'small' ? 14 : 16} color="textSecondary" />
      <ThemedText
        type={size === 'small' ? 'small' : 'default'}
        themeColor="textSecondary"
        numberOfLines={1}
        style={styles.text}>
        {children}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  text: {
    flexShrink: 1,
  },
});
