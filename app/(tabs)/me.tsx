import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/src/components/AppHeader';
import { colors, layout, spacing, typography } from '@/src/design/tokens';

const supportItems = [
  { label: 'Sign in', action: () => Linking.openURL('https://melato.ca/account') },
  { label: 'Order help', action: () => Linking.openURL('mailto:support@melato.ca') },
  { label: 'Shipping & returns', action: () => Linking.openURL('https://melato.ca/pages/shipping-returns') },
  { label: 'Contact Melato', action: () => Linking.openURL('https://melato.ca/pages/contact') },
  { label: 'Privacy', action: () => Linking.openURL('https://melato.ca/policies/privacy-policy') },
] as const;

export default function MeScreen() {
  return (
    <View style={styles.screen}>
      <AppHeader title="ME" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>Customer space</Text>
        <Text accessibilityRole="header" style={styles.title}>YOUR MELATO.</Text>
        <Text style={styles.body}>
          Sign in securely through Melato, get order support, and reach the current delivery, returns, contact, and privacy information.
        </Text>
        <View style={styles.list}>
          {supportItems.map((item) => (
            <Pressable
              key={item.label}
              accessibilityRole="button"
              onPress={() => void item.action()}
              style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            >
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.arrow}>→</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.ink, flex: 1 },
  content: { gap: spacing.md, padding: layout.gutter, paddingBottom: spacing.hero },
  kicker: {
    color: colors.accent,
    fontFamily: typography.meta.family,
    fontSize: 10,
    letterSpacing: typography.meta.letterSpacing,
    marginTop: spacing.lg,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.bone,
    fontFamily: typography.display.family,
    fontSize: 46,
    letterSpacing: typography.display.letterSpacing,
    lineHeight: 46,
  },
  body: { color: colors.muted, fontFamily: typography.ui.family, fontSize: 15, lineHeight: 23, maxWidth: 330 },
  list: { borderTopColor: colors.line, borderTopWidth: StyleSheet.hairlineWidth, marginTop: spacing.lg },
  row: {
    alignItems: 'center',
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 62,
  },
  rowPressed: { opacity: 0.65 },
  rowLabel: { color: colors.bone, fontFamily: typography.ui.family, fontSize: 16 },
  arrow: { color: colors.accent, fontFamily: typography.ui.family, fontSize: 20 },
});
