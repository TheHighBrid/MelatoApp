import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/src/design/tokens';

type ScreenStateProps = {
  actionLabel?: string;
  body?: string;
  onAction?: () => void;
  title: string;
  variant: 'empty' | 'error' | 'loading';
};

export function ScreenState({ actionLabel, body, onAction, title, variant }: ScreenStateProps) {
  if (variant === 'loading') {
    return (
      <View accessibilityLabel={title} style={styles.root}>
        <ActivityIndicator color={colors.bone} />
        <Text style={styles.meta}>{title}</Text>
      </View>
    );
  }

  return (
    <View accessibilityLabel={title} style={styles.root}>
      <Text accessibilityRole="header" style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {actionLabel && onAction ? (
        <Pressable accessibilityRole="button" onPress={onAction} style={styles.action}>
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.md,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  meta: {
    color: colors.muted,
    fontFamily: typography.meta.family,
    fontSize: 10,
    letterSpacing: typography.meta.letterSpacing,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.bone,
    fontFamily: typography.display.family,
    fontSize: 30,
    textAlign: 'center',
  },
  body: {
    color: colors.muted,
    fontFamily: typography.ui.family,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 300,
    textAlign: 'center',
  },
  action: {
    borderBottomColor: colors.bone,
    borderBottomWidth: 1,
    marginTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  actionLabel: {
    color: colors.bone,
    fontFamily: typography.meta.family,
    fontSize: 10,
    letterSpacing: typography.meta.letterSpacing,
    textTransform: 'uppercase',
  },
});
