
import { StyleSheet, Text, View } from 'react-native';

import { useThemeMode } from '../ThemeContext';

interface ProgressItem {
  nama: string;
  persentase: number;
}

interface LearningProgressProps {
  data: ProgressItem[];
}

export default function LearningProgress({
  data,
}: LearningProgressProps) {
  const { darkMode } = useThemeMode();

  const colors = {
    card: darkMode ? '#252238' : '#FFFFFF',
    border: darkMode ? '#49405F' : '#F0E6FF',
    title: darkMode ? '#E4D7FF' : '#493475',
    name: darkMode ? '#D0CADB' : '#5E5870',
    percentage: darkMode ? '#C9B5FF' : '#7554C8',
    track: darkMode ? '#49405F' : '#EEE9F7',
    fill: '#20B486',
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
      <Text style={[styles.title, { color: colors.title }]}>
        Progress Pembelajaran
      </Text>

      {data.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.name }]}>
          Belum ada progress pembelajaran yang tersedia.
        </Text>
      ) : (
        data.map((item) => {
          const percentage = Math.max(
            0,
            Math.min(100, item.persentase)
          );

          return (
            <View key={item.nama} style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressName, { color: colors.name }]}>
                  {item.nama}
                </Text>

                <Text
                  style={[styles.percentage, { color: colors.percentage }]}
                >
                  {percentage}%
                </Text>
              </View>

              <View
                style={[
                  styles.progressBackground,
                  { backgroundColor: colors.track },
                ]}
                accessible
                accessibilityRole="progressbar"
                accessibilityLabel={`Progress ${item.nama}`}
                accessibilityValue={{
                  min: 0,
                  max: 100,
                  now: percentage,
                }}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: colors.fill,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    gap: 17,
    elevation: 2,
    width: '100%',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  progressItem: {
    gap: 8,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },

  progressName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },

  percentage: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  progressBackground: {
    height: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 10,
  },

  emptyText: {
    fontSize: 13,
    lineHeight: 20,
  },
});
