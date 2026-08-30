import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppHeader } from '@/src/components/AppHeader';
import { colors, layout, spacing, typography } from '@/src/design/tokens';

type LookbookTarget =
  | { kind: 'product'; handle: string }
  | { kind: 'collection'; handle: string };

type LookbookFrame = {
  id: string;
  chapter: string;
  title: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  actionLabel: string;
  target: LookbookTarget;
};

const frames: readonly LookbookFrame[] = [
  {
    id: 'correspondence',
    chapter: 'Living Lookbook / 15',
    title: 'THE CORRESPONDENCE',
    body: 'Blush Ledger, filed after dark. Satin, candlelight, and a table still in use.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0809/3358/5151/files/The_Living_Lookbook_Melato_Editorial_Lookbook_ACT_3_SHOT_1_www.melato.ca.jpg?v=1784775020',
    imageAlt: 'Melato Living Lookbook frame featuring the Blush Ledger satin shirt at a candlelit table',
    actionLabel: 'Shop the shirt',
    target: { kind: 'product', handle: 'blush-ledger-satin-shirt' },
  },
  {
    id: 'departure',
    chapter: 'Living Lookbook / 27',
    title: 'THE DEPARTURE',
    body: 'The uniform leaves the room. Movement is part of the construction.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0809/3358/5151/files/rn-image_picker_lib_temp_59ca1dbb-bac5-49dc-acd6-8505ea947acc.png?v=1784005533',
    imageAlt: 'Melato Living Lookbook frame featuring a tracksuit and travel bag',
    actionLabel: 'Shop the uniform',
    target: { kind: 'collection', handle: 'tracksuits' },
  },
  {
    id: 'unbothered',
    chapter: 'Living Lookbook / 30',
    title: 'UNBOTHERED',
    body: 'A quieter frame from the archive, kept close to the clothes rather than the campaign machinery.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0809/3358/5151/files/The_Living_Lookbook-Frame-02_5.jpg?v=1782799160',
    imageAlt: 'Melato Living Lookbook editorial frame from the current archive',
    actionLabel: 'Shop new arrivals',
    target: { kind: 'collection', handle: 'new-arrivals' },
  },
  {
    id: 'structured-grace',
    chapter: 'Living Lookbook / 16',
    title: 'STRUCTURED GRACE',
    body: 'Not every frame needs a product tag. Some evidence exists to hold the world together.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0809/3358/5151/files/The_Living_Lookbook_Melato_Editorial_Lookbook_ACT_3_SHOT_3_www.melato.ca.jpg?v=1784775257',
    imageAlt: 'Melato Living Lookbook still-life editorial frame with handwritten correspondence',
    actionLabel: 'Enter the latest drop',
    target: { kind: 'collection', handle: 'new-arrivals' },
  },
];

function hrefFor(target: LookbookTarget) {
  if (target.kind === 'product') {
    return { pathname: '/product/[handle]' as const, params: { handle: target.handle } };
  }

  return { pathname: '/collection/[handle]' as const, params: { handle: target.handle } };
}

export default function LookbookScreen() {
  const { height } = useWindowDimensions();
  const frameHeight = Math.max(620, height - 122);

  return (
    <View style={styles.screen}>
      <AppHeader title="LOOKBOOK" />
      <ScrollView pagingEnabled showsVerticalScrollIndicator={false}>
        {frames.map((frame) => (
          <View key={frame.id} style={[styles.frame, { height: frameHeight }]}>
            <Image
              accessibilityLabel={frame.imageAlt}
              cachePolicy="memory-disk"
              contentFit="cover"
              source={{ uri: frame.imageUrl }}
              style={StyleSheet.absoluteFillObject}
              transition={220}
            />
            <View pointerEvents="none" style={styles.overlay} />
            <View style={styles.frameContent}>
              <Text style={styles.chapter}>{frame.chapter}</Text>
              <Text accessibilityRole="header" style={styles.title}>{frame.title}</Text>
              <Text style={styles.body}>{frame.body}</Text>
              <Link href={hrefFor(frame.target)} asChild>
                <AppButton tone="outline">{frame.actionLabel}</AppButton>
              </Link>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.ink, flex: 1 },
  frame: { backgroundColor: colors.graphite, overflow: 'hidden', position: 'relative' },
  overlay: {
    backgroundColor: 'rgba(8, 8, 8, 0.38)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  frameContent: {
    bottom: 0,
    gap: spacing.md,
    left: 0,
    padding: layout.gutter,
    paddingBottom: spacing.xl,
    position: 'absolute',
    right: 0,
  },
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
