import { Pressable, StyleSheet, Text, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { colors, layout, spacing, typography } from '@/src/design/tokens';

type AppButtonProps = PressableProps & {
  children: string;
  tone?: 'light' | 'dark' | 'outline';
  style?: StyleProp<ViewStyle>;
};

export function AppButton({ children, disabled, style, tone = 'light', ...props }: AppButtonProps) {
  const palette = buttonPalettes[tone];

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: palette.background,
          borderColor: palette.border,
          opacity: disabled ? 0.42 : pressed ? 0.78 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: palette.text }]}>{children}</Text>
    </Pressable>
  );
}

const buttonPalettes = {
  light: { background: colors.bone, border: colors.bone, text: colors.ink },
  dark: { background: colors.ink, border: colors.ink, text: colors.bone },
  outline: { background: 'transparent', border: colors.line, text: colors.bone },
} as const;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    borderRadius: layout.radius.subtle,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: spacing.lg,
  },
  label: {
    fontFamily: typography.meta.family,
    fontSize: 11,
    letterSpacing: typography.meta.letterSpacing,
    textTransform: 'uppercase',
  },
});
