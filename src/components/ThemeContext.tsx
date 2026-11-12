
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleTheme: () => {},
});

const THEME_STORAGE_KEY = '@portfolio_dark_mode';

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Membaca preferensi tema ketika aplikasi pertama kali dibuka.
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(
          THEME_STORAGE_KEY
        );

        if (savedTheme !== null) {
          setDarkMode(savedTheme === 'true');
        }
      } catch (error) {
        console.error('Gagal membaca preferensi tema:', error);
      } finally {
        setIsThemeLoaded(true);
      }
    };

    loadTheme();
  }, []);

  // Menyimpan perubahan tema secara otomatis.
  useEffect(() => {
    if (!isThemeLoaded) return;

    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(
          THEME_STORAGE_KEY,
          String(darkMode)
        );
      } catch (error) {
        console.error('Gagal menyimpan preferensi tema:', error);
      }
    };

    saveTheme();
  }, [darkMode, isThemeLoaded]);

  const toggleTheme = () => {
    setDarkMode((previous) => !previous);
  };

  // Menunggu preferensi tema selesai dibaca sebelum menampilkan aplikasi.
  if (!isThemeLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7554C8" />
        <Text style={styles.loadingText}>
          Memuat preferensi tampilan...
        </Text>
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}

export function ThemeSwitcher() {
  const { darkMode, toggleTheme } = useThemeMode();

  return (
    <Pressable
      onPress={toggleTheme}
      accessibilityRole="button"
      accessibilityLabel={
        darkMode ? 'Aktifkan Light Mode' : 'Aktifkan Dark Mode'
      }
      style={[
        styles.button,
        {
          backgroundColor: darkMode ? '#493475' : '#FFE3A3',
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: darkMode ? '#FFFFFF' : '#62451A',
          },
        ]}
      >
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },

  loadingText: {
    fontSize: 13,
    color: '#7554C8',
  },

  button: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  text: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
