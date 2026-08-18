import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ProductCard } from '@/src/components/ProductCard';
import { ScreenState } from '@/src/components/ScreenState';
import { colors, layout, spacing, typography } from '@/src/design/tokens';
import { usePredictiveSearch } from '@/src/hooks/useCommerce';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const results = usePredictiveSearch(query);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text accessibilityRole="header" style={styles.title}>SEARCH</Text>
        <Pressable accessibilityLabel="Close search" accessibilityRole="button" onPress={() => router.back()} style={styles.close}>
          <Ionicons color={colors.bone} name="close" size={24} />
        </Pressable>
      </View>
      <View style={styles.inputWrap}>
        <Ionicons color={colors.muted} name="search-outline" size={20} />
        <TextInput
          autoCapitalize="none"
          autoFocus
          onChangeText={setQuery}
          placeholder="Type what you want"
          placeholderTextColor={colors.muted}
          returnKeyType="search"
          selectionColor={colors.accent}
          style={styles.input}
          value={query}
        />
      </View>

      {query.trim().length < 2 ? (
        <ScreenState body="Search products, collections, and the current Melato archive." title="BEGIN WITH A WORD" variant="empty" />
      ) : results.isLoading ? (
        <ScreenState title="Searching Melato" variant="loading" />
      ) : results.isError ? (
        <ScreenState body="Search could not be reached. Check your connection and try again." title="SEARCH UNAVAILABLE" variant="error" />
      ) : (
        <FlatList
          ListEmptyComponent={<ScreenState body="Try a different product, colour, or collection term." title="NO PIECES FOUND" variant="empty" />}
          contentContainerStyle={styles.results}
          data={results.data?.products ?? []}
          keyExtractor={(product) => product.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => <ProductCard product={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.ink, flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', minHeight: 68, paddingHorizontal: layout.gutterCompact },
  title: { color: colors.bone, fontFamily: typography.display.family, fontSize: 31, letterSpacing: typography.display.letterSpacing },
  close: { alignItems: 'center', height: 44, justifyContent: 'center', width: 44 },
  inputWrap: { alignItems: 'center', backgroundColor: colors.graphite, flexDirection: 'row', gap: spacing.sm, marginHorizontal: layout.gutterCompact, minHeight: 56, paddingHorizontal: spacing.md },
  input: { color: colors.bone, flex: 1, fontFamily: typography.ui.family, fontSize: 16, minHeight: 54 },
  results: { gap: spacing.md, paddingBottom: spacing.hero, paddingTop: spacing.lg },
  row: { gap: spacing.sm, paddingHorizontal: layout.gutterCompact },
});
