import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/src/components/AppHeader';
import { colors, layout, spacing, typography } from '@/src/design/tokens';

const shopCollections = [
  { label: 'New Arrivals', handle: 'new-arrivals', description: 'Recent additions to the current collection.' },
  { label: 'The Uniform', handle: 'tracksuits', description: 'Track jackets, track pants, satin, and velour sets.' },
  { label: 'Women', handle: 'womens-zellige-capsule', description: 'Women’s clothing and accessories from the current edit.' },
  { label: 'Accessories', handle: 'accessories', description: 'Bags, eyewear, ties, and small accessories.' },
  { label: 'Fragrance', handle: 'fragrance', description: 'Eau de Parfum and Eau de Toilette from Melato.' },
  { label: 'The Index', handle: 'all', description: 'The complete catalogue.' },
] as const;

export default function ShopScreen() {
  return (
    <View style={styles.screen}>
      <AppHeader title="SHOP" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Link href="/search" asChild>
          <View accessibilityRole="button" accessibilityLabel="Search Melato products" style={styles.searchTrigger}>
            <Ionicons color={colors.muted} name="search-outline" size={20} />
            <Text style={styles.searchLabel}>Search the archive</Text>
          </View>
        </Link>
        <Text style={styles.kicker}>Collections</Text>
        {shopCollections.map((collection, index) => (
          <Link
            key={collection.handle}
            href={{ pathname: '/collection/[handle]', params: { handle: collection.handle } }}
            asChild
          >
            <View accessibilityRole="button" accessibilityLabel={`Open ${collection.label}`} style={styles.collectionRow}>
              <Text style={styles.index}>{String(index + 1).padStart(2, '0')}</Text>
              <View style={styles.copy}>
                <Text style={styles.collectionLabel}>{collection.label}</Text>
                <Text style={styles.description}>{collection.description}</Text>
              </View>
              <Ionicons color={colors.bone} name="arrow-forward" size={18} />
            </View>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.ink, flex: 1 },
  content: { paddingBottom: spacing.hero },
  searchTrigger: {
    alignItems: 'center',
    backgroundColor: colors.graphite,
    flexDirection: 'row',
    gap: spacing.sm,
    margin: layout.gutter,
    minHeight: 56,
    paddingHorizontal: spacing.md,
  },
  searchLabel: {
    color: colors.muted,
    fontFamily: typography.ui.family,
    fontSize: 15,
  },
  kicker: {
    color: colors.muted,
    fontFamily: typography.meta.family,
    fontSize: 10,
    letterSpacing: typography.meta.letterSpacing,
    marginBottom: spacing.sm,
    paddingHorizontal: layout.gutter,
    textTransform: 'uppercase',
  },
  collectionRow: {
    alignItems: 'center',
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 112,
    paddingHorizontal: layout.gutter,
  },
  index: {
    color: colors.accent,
    fontFamily: typography.meta.family,
    fontSize: 10,
    letterSpacing: 1,
    width: 24,
  },
  copy: { flex: 1, gap: spacing.xs },
  collectionLabel: {
    color: colors.bone,
    fontFamily: typography.display.family,
    fontSize: 31,
    letterSpacing: typography.display.letterSpacing,
  },
  description: {
    color: colors.muted,
    fontFamily: typography.ui.family,
    fontSize: 13,
    lineHeight: 18,
  },
});
