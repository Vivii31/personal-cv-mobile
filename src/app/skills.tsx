
import { StyleSheet, Text, View } from 'react-native';

import profileData from '../components/data/profile.json';
import PageLayout from '../components/PageLayout';
import { useThemeMode } from '../components/ThemeContext';

export default function SkillsScreen() {
  const { darkMode } = useThemeMode();

  const cardColor = darkMode ? '#252238' : '#FFFFFF';
  const textColor = darkMode ? '#F4EFFF' : '#493475';

  return (
    <PageLayout
      title="My Skills"
      subtitle="Keahlian dan bidang yang saya minati."
    >
      <View style={styles.container}>
        {(profileData.keahlian ?? []).map((skill, index) => (
          <View
            key={`${skill}-${index}`}
            style={[styles.card, { backgroundColor: cardColor }]}
          >
            <Text style={styles.number}>
              {String(index + 1).padStart(2, '0')}
            </Text>

            <Text style={[styles.skill, { color: textColor }]}>
              {skill}
            </Text>
          </View>
        ))}

        {(profileData.keahlian ?? []).length === 0 && (
          <Text style={{ color: textColor }}>
            Belum ada data keahlian.
          </Text>
        )}
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
    gap: 15,
    elevation: 2,
  },

  number: {
    color: '#20B486',
    fontSize: 18,
    fontWeight: 'bold',
  },

  skill: {
    fontSize: 15,
    fontWeight: '600',
  },
});
