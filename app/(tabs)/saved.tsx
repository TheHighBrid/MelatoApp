import { router } from 'expo-router';
import { View } from 'react-native';

import { AppHeader } from '@/src/components/AppHeader';
import { ScreenState } from '@/src/components/ScreenState';
import { colors } from '@/src/design/tokens';

export default function SavedScreen() {
  return (
    <View style={{ backgroundColor: colors.ink, flex: 1 }}>
      <AppHeader title="SAVED" />
      <ScreenState
        actionLabel="Explore new arrivals"
        body="Save pieces as you move through the collection. Your local selections will appear here."
        onAction={() => router.push({ pathname: '/collection/[handle]', params: { handle: 'new-arrivals' } })}
        title="YOUR EDIT IS EMPTY"
        variant="empty"
      />
    </View>
  );
}
