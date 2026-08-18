import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppHeader } from '@/src/components/AppHeader';
import { colors, layout, spacing, typography } from '@/src/design/tokens';

export default function LookbookScreen() {
  return (
    <View style={styles.screen}>
      <AppHeader title="LOOKBOOK" />
      <ScrollView contentContainerStyle={styles.content} pagingEnabled showsVerticalScrollIndicator={false}>
        <View style={styles.frame}>
          <View style={styles.imageField} />
          <View style={styles.overlay} />
          <View style={styles.frameContent}>
            <Text style={styles.chapter}>Living Lookbook / 01</Text>
            <Text accessibilityRole="header" style={styles.title}>THE IMAGE COMES FIRST.</Text>
            <Text style={styles.body}>
              Campaign frames will resolve from Shopify media and guide into the exact pieces shown.
            </Text>
            <Link href={{ pathname: '/collection/[handle]', params: { handle: 'new-arrivals' } }} asChild>
              <AppButton tone="outline">View the pieces</AppButton>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.ink, flex: 1 },
  content: { flexGrow: 1 },
  frame: { flex: 1, minHeight: 620, overflow: 'hidden', position: 'relative' },
  imageField: { backgroundColor: '#252019', bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  overlay: {
    backgroundColor: 'rgba(8, 8, 8, 0.35)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  frameContent: { bottom: 0, gap: spacing.md, left: 0, padding: layout.gutter, position: 'absolute', right: 0 },
  chapter: {
    color: colors.accent,
    fontFamily: typography.meta.family,
    fontSize: 10,
    letterSpacing: typography.meta.letterSpacing,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.bone,
    fontFamily: typography.display.family,
    fontSize: 47,
    letterSpacing: typography.display.letterSpacing,
    lineHeight: 44,
  },
  body: { color: colors.bone, fontFamily: typography.ui.family, fontSize: 15, lineHeight: 22, maxWidth: 320 },
});
