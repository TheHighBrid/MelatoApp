import { Ionicons } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, layout, spacing, typography } from '@/src/design/tokens';
import { useCartStore } from '@/src/state/cartStore';

type AppHeaderProps = {
  title?: string;
  inverse?: boolean;
};

export function AppHeader({ title = 'MELATO', inverse = true }: AppHeaderProps) {
  const pathname = usePathname();
  const totalQuantity = useCartStore((state) => state.cart?.totalQuantity ?? 0);
  const foreground = inverse ? colors.bone : colors.ink;
  const border = inverse ? colors.line : 'rgba(8, 8, 8, 0.14)';

  return (
    <View style={[styles.root, { borderBottomColor: border }]}>
      <Link href="/search" asChild>
        <Pressable
          accessibilityLabel="Search Melato"
          accessibilityRole="button"
          hitSlop={8}
          style={styles.action}
        >
          <Ionicons color={foreground} name="search-outline" size={21} />
        </Pressable>
      </Link>

      <Text accessibilityRole="header" numberOfLines={1} style={[styles.wordmark, { color: foreground }]}>
        {title}
      </Text>

      <Link href="/cart" asChild>
        <Pressable
          accessibilityLabel={`Bag with ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}`}
          accessibilityRole="button"
          hitSlop={8}
          style={[styles.bag, pathname === '/cart' && styles.bagActive]}
        >
          <Text style={[styles.bagLabel, { color: foreground }]}>BAG</Text>
          <View style={[styles.count, { borderColor: foreground }]}>
            <Text style={[styles.countText, { color: foreground }]}>{totalQuantity}</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 58,
    paddingHorizontal: layout.gutterCompact,
  },
  action: {
    alignItems: 'center',
    height: layout.touchTarget,
    justifyContent: 'center',
    width: layout.touchTarget,
  },
  wordmark: {
    fontFamily: typography.display.family,
    fontSize: 24,
    letterSpacing: -0.8,
    lineHeight: 28,
  },
  bag: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    height: layout.touchTarget,
    justifyContent: 'flex-end',
    minWidth: layout.touchTarget,
  },
  bagActive: {
    opacity: 0.55,
  },
  bagLabel: {
    fontFamily: typography.meta.family,
    fontSize: 10,
    letterSpacing: typography.meta.letterSpacing,
  },
  count: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    justifyContent: 'center',
    minWidth: 20,
    paddingHorizontal: spacing.xxs,
  },
  countText: {
    fontFamily: typography.meta.family,
    fontSize: 9,
    letterSpacing: 0,
  },
});
