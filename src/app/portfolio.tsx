
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PageLayout from '../components/PageLayout';
import PortfolioSection from '../components/PortfolioSection';
import { useThemeMode } from '../components/ThemeContext';

import usePortfolio from '../hooks/usePortfolio';

export default function PortfolioScreen() {
  const { darkMode } = useThemeMode();
  const { projects, loading, error, retry } = usePortfolio();

  const headingColor = darkMode ? '#F4EFFF' : '#493475';
  const subtitleColor = darkMode ? '#C2BBD3' : '#858096';
  const cardColor = darkMode ? '#252238' : '#FFFFFF';

  return (
    <PageLayout
      title="My Portfolio"
      subtitle="Beberapa proyek dan karya yang pernah saya kembangkan."
    >
      {/* Loading */}
      {loading && (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color="#7554C8" />
          <Text style={[styles.stateText, { color: subtitleColor }]}>
            Sedang memuat proyek...
          </Text>
        </View>
      )}

      {/* Error */}
      {!loading && error !== null && (
        <View style={[styles.stateCard, { backgroundColor: cardColor }]}>
          <Text style={styles.errorIcon}>!</Text>

          <Text style={[styles.stateTitle, { color: headingColor }]}>
            Portofolio Gagal Dimuat
          </Text>

          <Text style={[styles.stateText, { color: subtitleColor }]}>
            {error}
          </Text>

          <Pressable
            onPress={retry}
            accessibilityRole="button"
            accessibilityLabel="Coba muat ulang portofolio"
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>Coba Lagi</Text>
          </Pressable>
        </View>
      )}

      {/* Empty */}
      {!loading && error === null && projects === null && (
        <View style={[styles.stateCard, { backgroundColor: cardColor }]}>
          <Text style={styles.emptyIcon}>○</Text>

          <Text style={[styles.stateTitle, { color: headingColor }]}>
            Belum Ada Proyek
          </Text>

          <Text style={[styles.stateText, { color: subtitleColor }]}>
            Belum ada data portofolio yang tersedia.
          </Text>

          <Pressable
            onPress={retry}
            accessibilityRole="button"
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>Muat Ulang</Text>
          </Pressable>
        </View>
      )}

      {/* Success */}
      {!loading && error === null && projects !== null && (
        <>
          <Text style={[styles.projectCount, { color: subtitleColor }]}>
            {projects.length} proyek ditampilkan
          </Text>

          <PortfolioSection data={projects} />
        </>
      )}
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  stateContainer: {
    minHeight: 170,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 20,
  },

  stateCard: {
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

  projectCount: {
    fontSize: 12,
    marginBottom: 2,
  },
});
