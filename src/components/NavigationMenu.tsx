
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';

import { usePathname, useRouter, type Href } from 'expo-router';

import { useThemeMode } from './ThemeContext';

const menuItems: { label: string; path: string }[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Academic', path: '/academic' },
  { label: 'Contact', path: '/contact' },
];

export default function NavigationMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { darkMode } = useThemeMode();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      accessibilityLabel="Navigasi halaman portfolio"
    >
      {menuItems.map((item) => {
        const active = pathname === item.path;

        return (
          <Pressable
            key={item.path}
            style={({ pressed }) => [
              styles.menuItem,
              {
                backgroundColor: active
                  ? '#7554C8'
                  : darkMode
                    ? '#252238'
                    : '#FFFFFF',
                opacity: pressed ? 0.75 : 1,
              },
            ]}
            onPress={() => router.push(item.path as Href)}
            accessibilityRole="button"
            accessibilityLabel={`Buka halaman ${item.label}`}
            accessibilityHint={`Pindah ke halaman ${item.label}`}
            accessibilityState={{ selected: active }}
            hitSlop={4}
          >
            <Text
              style={[
                styles.menuText,
                {
                  color: active
                    ? '#FFFFFF'
                    : darkMode
                      ? '#E8E2F5'
                      : '#493475',
                },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 9,
    paddingVertical: 5,
    paddingRight: 5,
  },

  menuItem: {
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 20,
    elevation: 1,
  },

  menuText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
