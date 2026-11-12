
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PageLayout from '../components/PageLayout';
import ProfileHeader from '../components/ProfileHeader';
import { ThemeSwitcher, useThemeMode } from '../components/ThemeContext';

import useProfile from '../hooks/useProfile';

export default function HomeScreen() {
  const { darkMode } = useThemeMode();

  const { profile, loading, error, retry } = useProfile();

  const headingColor = darkMode ? '#F4EFFF' : '#493475';
  const subtitleColor = darkMode ? '#C2BBD3' : '#858096';
  const cardColor = darkMode ? '#252238' : '#FFFFFF';

  return (
    <PageLayout
      title="Personal Portfolio"
      subtitle="Kenali saya lebih dekat melalui profil ini."
    >
      {/* Pengaturan Tema */}
      <View
        style={[
          styles.themeContainer,
          { backgroundColor: cardColor },
        ]}
      >
        <View style={styles.themeTextContainer}>
          <Text style={[styles.themeTitle, { color: headingColor }]}>
            Tampilan Aplikasi
          </Text>

          <Text style={[styles.themeDescription, { color: subtitleColor }]}>
            Ubah tema sesuai kenyamananmu.
          </Text>
        </View>

        <ThemeSwitcher />
      </View>

      {/* Kondisi Loading */}
      {loading && (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color="#7554C8" />

          <Text style={[styles.stateText, { color: subtitleColor }]}>
            Sedang memuat data profil...
          </Text>
        </View>
      )}

      {/* Kondisi Error */}
      {!loading && error && (
        <View style={[styles.stateContainer, { backgroundColor: cardColor }]}>
          <Text style={styles.errorIcon}>!</Text>

          <Text style={[styles.stateTitle, { color: headingColor }]}>
            Data Gagal Dimuat
          </Text>

          <Text style={[styles.stateText, { color: subtitleColor }]}>
            {error}
          </Text>

          <Pressable
            onPress={retry}
            accessibilityRole="button"
            accessibilityLabel="Coba muat ulang data profil"
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>
              Coba Lagi
            </Text>
          </Pressable>
        </View>
      )}

      {/* Kondisi Data Kosong */}
      {!loading && !error && profile === null && (
        <View style={[styles.stateContainer, { backgroundColor: cardColor }]}>
          <Text style={styles.emptyIcon}>○</Text>

          <Text style={[styles.stateTitle, { color: headingColor }]}>
            Belum Ada Data Profil
          </Text>

          <Text style={[styles.stateText, { color: subtitleColor }]}>
            Informasi profil belum tersedia saat ini.
          </Text>

          <Pressable
            onPress={retry}
            accessibilityRole="button"
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>
              Muat Ulang
            </Text>
          </Pressable>
        </View>
      )}

      {/* Kondisi Berhasil */}
      {!loading && !error && profile !== null && (
        <ProfileHeader data={profile} />
      )}
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },

  themeTextContainer: {
    flex: 1,
    marginRight: 10,
  },

  themeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  themeDescription: {
    fontSize: 11,
    marginTop: 4,
  },

  stateContainer: {
    width: '100%',
    minHeight: 190,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  stateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  stateText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },

  errorIcon: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#DC6262',
  },

  emptyIcon: {
    fontSize: 36,
    color: '#9B8ABF',
  },

  retryButton: {
    backgroundColor: '#7554C8',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 22,
    marginTop: 4,
  },

  retryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
