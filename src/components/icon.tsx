import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SymbolName = Exclude<SymbolViewProps['name'], string>;

export type IconProps = {
  /** SF Symbol name (iOS) */
  ios: NonNullable<SymbolName['ios']>;
  /** Material Symbol name (Android and web) */
  md: NonNullable<SymbolName['android']>;
  size?: number;
  color?: ThemeColor;
  style?: StyleProp<ViewStyle>;
};

/** Decorative icon; give the surrounding control the accessible label. */
export function Icon({ ios, md, size = 20, color = 'text', style }: IconProps) {
  const theme = useTheme();

  return (
    <SymbolView
      name={{ ios, android: md, web: md }}
      size={size}
      tintColor={theme[color]}
      style={style}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}
