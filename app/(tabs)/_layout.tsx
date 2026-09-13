import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { colors, typography } from '@/src/design/tokens';

const icons = {
  index: 'home-outline',
  shop: 'grid-outline',
  lookbook: 'book-outline',
  saved: 'heart-outline',
  me: 'person-outline',
} as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        animation: 'fade',
        headerShown: false,
        sceneStyle: { backgroundColor: colors.ink },
        tabBarActiveTintColor: colors.bone,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontFamily: typography.meta.family,
          fontSize: 9,
          letterSpacing: 1,
          marginBottom: 5,
          textTransform: 'uppercase',
        },
        tabBarStyle: {
          backgroundColor: colors.ink,
          borderTopColor: colors.line,
          height: 68,
          paddingTop: 7,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons color={color} name={icons[route.name as keyof typeof icons]} size={size - 2} />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="shop" options={{ title: 'Shop' }} />
      <Tabs.Screen name="lookbook" options={{ title: 'Lookbook' }} />
      <Tabs.Screen name="saved" options={{ title: 'Saved' }} />
      <Tabs.Screen name="me" options={{ title: 'Me' }} />
    </Tabs>
  );
}
