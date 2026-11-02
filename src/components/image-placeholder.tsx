import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon } from './icon';

import { useTheme } from '@/hooks/use-theme';

type ImagePlaceholderProps = {
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
};

/** Grey image stand-in until events have real photos. */
export function ImagePlaceholder({ style, iconSize = 40 }: ImagePlaceholderProps) {
  const theme = useTheme();

  return (
    <View
      style={[styles.placeholder, { backgroundColor: theme.placeholder }, style]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      <Icon ios="photo" md="image" size={iconSize} color="placeholderIcon" />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
