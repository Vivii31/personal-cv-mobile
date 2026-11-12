
import { StyleSheet, Text, View } from 'react-native';

import type { ProfileData } from './data/ProfileData';
import { useThemeMode } from './ThemeContext';

interface Props {
  data: ProfileData;
}

export default function AboutSection({ data }: Props) {
  const { darkMode } = useThemeMode();

  const colors = {
    card: darkMode ? '#252238' : '#FFFFFF',
    border: darkMode ? '#49405F' : '#F0E6FF',
    title: darkMode ? '#E4D7FF' : '#7554C8',
    description: darkMode ? '#D0CADB' : '#55536A',
    skillBackground: darkMode ? '#493448' : '#FFE8DF',
    skillText: darkMode ? '#FFC6B3' : '#A94E3B',
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.section,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.title }]}>
          Tentang Saya
        </Text>
        <Text style={[styles.description, { color: colors.description }]}>
          {data.deskripsi}
        </Text>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.title }]}>
          Pendidikan
        </Text>
        <Text style={[styles.description, { color: colors.description }]}>
          {data.pendidikan}
        </Text>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.title }]}>
          Keahlian dan Minat
        </Text>

        <View style={styles.skillContainer}>
          {data.keahlian.map((item) => (
            <View
              key={item}
              style={[
                styles.skillItem,
                { backgroundColor: colors.skillBackground },
              ]}
            >
              <Text style={[styles.skillText, { color: colors.skillText }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    width: '100%',
  },

  section: {
    padding: 19,
    borderRadius: 18,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#7554C8',
    shadowOpacity: 0.06,
    shadowRadius: 7,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 11,
  },

  description: {
    fontSize: 14,
    lineHeight: 24,
  },

  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },

  skillItem: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
  },

  skillText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
