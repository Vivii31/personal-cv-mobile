
import type { ReactNode } from 'react';

import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';

import NavigationMenu from './NavigationMenu';
import { useThemeMode } from './ThemeContext';

interface PageLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function PageLayout({
  title,
  subtitle,
  children,
}: PageLayoutProps) {
  const { darkMode } = useThemeMode();
  const { width } = useWindowDimensions();

  const backgroundColor = darkMode ? '#171525' : '#FFF8F1';
  const headingColor = darkMode ? '#F4EFFF' : '#493475';
  const subtitleColor = darkMode ? '#C2BBD3' : '#858096';

  // Jarak horizontal menyesuaikan lebar perangkat.
  const horizontalPadding = width < 400 ? 16 : 20;

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor },
      ]}
    >
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />

      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingHorizontal: horizontalPadding,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Identitas Website */}
        <Text
          style={[styles.brand, { color: headingColor }]}
          accessibilityRole="header"
        >
          MY PERSONAL PORTFOLIO
        </Text>

        {/* Navigasi Halaman */}
        <NavigationMenu />

        {/* Judul Halaman */}
        <View style={styles.headingContainer}>
          <Text
            style={[styles.title, { color: headingColor }]}
            accessibilityRole="header"
          >
            {title}
          </Text>

          <Text
            style={[styles.subtitle, { color: subtitleColor }]}
          >
            {subtitle}
          </Text>
        </View>

        {/* Konten Halaman */}
        {children}

        {/* Footer */}
        <Text
          style={[styles.footer, { color: subtitleColor }]}
        >
          © 2026 Personal CV
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    gap: 20,
  },

  brand: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  headingContainer: {
    gap: 7,
    marginTop: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 20,
  },

  footer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});
