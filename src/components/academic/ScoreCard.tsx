
import { StyleSheet, Text, View } from 'react-native';

import { useThemeMode } from '../ThemeContext';

interface ScoreCardProps {
  mataKuliah: string;
  dosen: string;
  nilai: number;
  predikat: string;
}

export default function ScoreCard({
  mataKuliah,
  dosen,
  nilai,
  predikat,
}: ScoreCardProps) {
  const { darkMode } = useThemeMode();

  const colors = {
    card: darkMode ? '#252238' : '#FFFFFF',
    border: darkMode ? '#49405F' : '#F0E6FF',
    heading: darkMode ? '#E4D7FF' : '#493475',
    muted: darkMode ? '#C2BBD3' : '#858096',
    scoreBackground: darkMode ? '#39334F' : '#F8F4FF',
    badgeBackground: darkMode ? '#194B40' : '#E3F8EF',
    badgeText: darkMode ? '#8CE0C1' : '#168567',
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: colors.heading }]}>
        Nilai Akademik
      </Text>

      <Text style={[styles.course, { color: colors.heading }]}>
        {mataKuliah}
      </Text>

      <Text style={[styles.lecturer, { color: colors.muted }]}>
        Dosen: {dosen}
      </Text>

      <View
        style={[
          styles.scoreContainer,
          { backgroundColor: colors.scoreBackground },
        ]}
        accessible
        accessibilityLabel={`Nilai akhir ${nilai}, predikat ${predikat}`}
      >
        <View style={styles.scoreInfo}>
          <Text style={[styles.scoreLabel, { color: colors.muted }]}>
            Nilai Akhir
          </Text>
          <Text style={[styles.score, { color: colors.heading }]}>
            {nilai}
          </Text>
        </View>

        <View
          style={[
            styles.gradeBadge,
            { backgroundColor: colors.badgeBackground },
          ]}
        >
          <Text style={[styles.grade, { color: colors.badgeText }]}>
            {predikat}
          </Text>
          <Text style={[styles.gradeLabel, { color: colors.badgeText }]}>
            Predikat
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    elevation: 2,
    gap: 10,
    width: '100%',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  course: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 23,
  },

  lecturer: {
    fontSize: 12,
  },

  scoreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: 15,
    borderRadius: 14,
    marginTop: 5,
  },

  scoreInfo: {
    flexShrink: 1,
  },

  scoreLabel: {
    fontSize: 12,
  },

  score: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  gradeBadge: {
    minWidth: 65,
    minHeight: 65,
    padding: 8,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  grade: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  gradeLabel: {
    fontSize: 10,
  },
});
