
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PageLayout from '../components/PageLayout';

import AcademicHeader from '../components/academic/AcademicHeader';
import LearningProgress from '../components/academic/LearningProgress';
import ScoreCard from '../components/academic/ScoreCard';

import { useThemeMode } from '../components/ThemeContext';
import useAcademic from '../hooks/useAcademic';

export default function AcademicScreen() {
  const { darkMode } = useThemeMode();
  const { academic, loading, error, retry } = useAcademic();

  const headingColor = darkMode ? '#F4EFFF' : '#493475';
  const subtitleColor = darkMode ? '#C2BBD3' : '#858096';
  const cardColor = darkMode ? '#252238' : '#FFFFFF';

  return (
    <PageLayout
      title="Academic Dashboard"
      subtitle="Informasi akademik dan perkembangan pembelajaran."
    >
      {/* Loading */}
      {loading && (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color="#7554C8" />
          <Text style={[styles.stateText, { color: subtitleColor }]}>
            Sedang memuat data akademik...
          </Text>
        </View>
      )}

      {/* Error */}
      {!loading && error !== null && (
        <View style={[styles.stateCard, { backgroundColor: cardColor }]}>
          <Text style={styles.errorIcon}>!</Text>

          <Text style={[styles.stateTitle, { color: headingColor }]}>
            Data Akademik Gagal Dimuat
          </Text>

          <Text style={[styles.stateText, { color: subtitleColor }]}>
            {error}
          </Text>

          <Pressable
            onPress={retry}
            accessibilityRole="button"
            accessibilityLabel="Coba muat ulang data akademik"
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>Coba Lagi</Text>
          </Pressable>
        </View>
      )}

      {/* Empty */}
      {!loading && error === null && academic === null && (
        <View style={[styles.stateCard, { backgroundColor: cardColor }]}>
          <Text style={styles.emptyIcon}>○</Text>

          <Text style={[styles.stateTitle, { color: headingColor }]}>
            Data Akademik Belum Tersedia
          </Text>

          <Text style={[styles.stateText, { color: subtitleColor }]}>
            Belum ada informasi akademik yang dapat ditampilkan.
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
      {!loading && error === null && academic !== null && (
        <View style={styles.content}>
          <Text style={[styles.sectionHeading, { color: headingColor }]}>
            Student Information
          </Text>

          <AcademicHeader
            nama={academic.nama}
            nim={academic.nim}
            programStudi={academic.programStudi}
            semester={academic.semester}
          />

          <Text style={[styles.sectionHeading, { color: headingColor }]}>
            Course Score
          </Text>

          <ScoreCard
            mataKuliah={academic.mataKuliah}
            dosen={academic.dosen}
            nilai={academic.nilai}
            predikat={academic.predikat}
          />

          <Text style={[styles.sectionHeading, { color: headingColor }]}>
            Learning Progress
          </Text>

          <Text style={[styles.stateText, { color: subtitleColor }]}>
            Perkembangan aktivitas pembelajaran saya.
          </Text>

          {academic.progress.length > 0 ? (
            <LearningProgress data={academic.progress} />
          ) : (
            <View style={[styles.stateCard, { backgroundColor: cardColor }]}>
              <Text style={[styles.stateText, { color: subtitleColor }]}>
                Belum ada data progress pembelajaran.
              </Text>
            </View>
          )}
        </View>
      )}
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 14,
  },

  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },

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
});
