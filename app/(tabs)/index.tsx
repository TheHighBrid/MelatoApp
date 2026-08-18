import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppHeader } from '@/src/components/AppHeader';
import { ProductRail } from '@/src/components/ProductRail';
import { homeModules, type HomeTarget } from '@/src/content/home';
import { colors, layout, spacing, typography } from '@/src/design/tokens';
import { useCollection } from '@/src/hooks/useCommerce';

function hrefFor(target: HomeTarget) {
  if (target.kind === 'collection') {
    return { pathname: '/collection/[handle]' as const, params: { handle: target.handle } };
  }

  return target.pathname as '/lookbook' | '/me';
}

export default function HomeScreen() {
  const hero = homeModules[0]!;
  const modules = homeModules.slice(1);
  const newArrivals = useCollection('new-arrivals');
  const uniform = useCollection('tracksuits');
  const objects = useCollection('accessories');
  const heroImage = newArrivals.data?.products[0]?.featuredImage;

  return (
    <View style={styles.screen}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          {heroImage ? (
            <Image
              accessibilityElementsHidden
              cachePolicy="memory-disk"
              contentFit="cover"
              source={{ uri: heroImage.url }}
              style={styles.heroImage}
              transition={180}
            />
          ) : null}
          <View style={styles.heroShade} />
          <View style={styles.heroContent}>
            {hero.eyebrow ? <Text style={styles.eyebrow}>{hero.eyebrow}</Text> : null}
            <Text accessibilityRole="header" style={styles.heroTitle}>{hero.title}</Text>
            {hero.body ? <Text style={styles.heroBody}>{hero.body}</Text> : null}
            <View style={styles.heroActions}>
              <Link href={hrefFor(hero.primaryTarget)} asChild>
                <AppButton>{hero.primaryLabel}</AppButton>
              </Link>
              {hero.secondaryLabel && hero.secondaryTarget ? (
                <Link href={hrefFor(hero.secondaryTarget)} asChild>
                  <AppButton tone="outline">{hero.secondaryLabel}</AppButton>
                </Link>
              ) : null}
            </View>
          </View>
        </View>

        {modules.map((module) => {
          const products = module.id === 'new-arrivals'
            ? newArrivals.data?.products
            : module.id === 'the-uniform'
              ? uniform.data?.products
              : module.id === 'objects'
                ? objects.data?.products
                : undefined;

          return (
            <View key={module.id} style={styles.module}>
              {module.eyebrow ? <Text style={styles.eyebrow}>{module.eyebrow}</Text> : null}
              <Text style={styles.moduleTitle}>{module.title}</Text>
              {module.body ? <Text style={styles.moduleBody}>{module.body}</Text> : null}
              {products?.length ? <ProductRail products={products.slice(0, 8)} /> : null}
              <Link href={hrefFor(module.primaryTarget)} asChild>
                <AppButton tone="outline">{module.primaryLabel}</AppButton>
              </Link>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.ink, flex: 1 },
  content: { paddingBottom: spacing.hero },
  hero: { backgroundColor: colors.graphite, minHeight: 570, overflow: 'hidden', position: 'relative' },
  heroImage: { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  heroShade: { backgroundColor: 'rgba(8, 8, 8, 0.42)', bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  heroContent: { bottom: 0, gap: spacing.md, left: 0, padding: layout.gutter, position: 'absolute', right: 0 },
  eyebrow: { color: colors.bone, fontFamily: typography.meta.family, fontSize: 10, letterSpacing: typography.meta.letterSpacing, textTransform: 'uppercase' },
  heroTitle: { color: colors.bone, fontFamily: typography.display.family, fontSize: 54, letterSpacing: typography.display.letterSpacing, lineHeight: 48 },
  heroBody: { color: colors.bone, fontFamily: typography.ui.family, fontSize: 16, lineHeight: 24, maxWidth: 280 },
  heroActions: { gap: spacing.sm, marginTop: spacing.sm },
  module: { borderBottomColor: colors.line, borderBottomWidth: StyleSheet.hairlineWidth, gap: spacing.md, paddingVertical: spacing.xxl },
  moduleTitle: { color: colors.bone, fontFamily: typography.display.family, fontSize: 38, letterSpacing: typography.display.letterSpacing, lineHeight: 38, paddingHorizontal: layout.gutter },
  moduleBody: { color: colors.muted, fontFamily: typography.ui.family, fontSize: 15, lineHeight: 23, maxWidth: 320, paddingHorizontal: layout.gutter },
});
