
import { StyleSheet, Text, View } from 'react-native';

import experienceData from './data/experience.json';
import { useThemeMode } from './ThemeContext';

export default function ExperienceTimeline() {
  const { darkMode } = useThemeMode();

  const colors = {
    card: darkMode ? '#252238' : '#FFFFFF',
    title: darkMode ? '#E4D7FF' : '#7554C8',
    heading: darkMode ? '#E4D7FF' : '#493475',
    place: darkMode ? '#C9B5FF' : '#7554C8',
    description: darkMode ? '#C2BBD3' : '#666177',
    line: darkMode ? '#49405F' : '#E9DDF9',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.title }]}>
        Experience & Education
      </Text>

      {experienceData.length === 0 ? (
        <Text style={[styles.description, { color: colors.description }]}>
          Belum ada pengalaman atau pendidikan yang ditampilkan.
        </Text>
      ) : (
        experienceData.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.timeline}>
              <View style={styles.dot} />
              <View
                style={[
                  styles.line,
                  { backgroundColor: colors.line },
                ]}
              />
            </View>

            <View style={styles.content}>
              <Text style={styles.year}>{item.tahun}</Text>

              <Text style={[styles.heading, { color: colors.heading }]}>
                {item.judul}
              </Text>

              <Text style={[styles.place, { color: colors.place }]}>
                {item.tempat}
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: colors.description },
                ]}
              >
                {item.deskripsi}
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    borderRadius: 18,
    gap: 18,
    width: '100%',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  item: {
    flexDirection: 'row',
    gap: 13,
  },

  timeline: {
    alignItems: 'center',
    width: 18,
  },

  dot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#F18B68',
    marginTop: 4,
  },

  line: {
    width: 2,
    flex: 1,
    marginTop: 5,
  },

  content: {
    flex: 1,
    paddingBottom: 12,
  },

  year: {
    fontSize: 12,
    color: '#E17B61',
    fontWeight: 'bold',
  },

  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    lineHeight: 23,
  },

  place: {
    fontSize: 13,
    marginTop: 3,
  },

  description: {
    fontSize: 13,
    lineHeight: 21,
    marginTop: 7,
  },
});
