
import { StyleSheet, Text, View } from 'react-native';

interface AcademicHeaderProps {
  nama: string;
  nim: string;
  programStudi: string;
  semester: number;
}

export default function AcademicHeader({
  nama,
  nim,
  programStudi,
  semester,
}: AcademicHeaderProps) {
  return (
    <View
      style={styles.card}
      accessible
      accessibilityLabel={`Profil akademik ${nama}. NIM ${nim}. Program studi ${programStudi}. Semester ${semester}.`}
    >
      <Text style={styles.label}>ACADEMIC PROFILE</Text>

      <Text style={styles.name}>{nama}</Text>

      <View style={styles.info}>
        <Text style={styles.infoText}>NIM: {nim}</Text>
        <Text style={styles.infoText}>
          Program Studi: {programStudi}
        </Text>
        <Text style={styles.infoText}>
          Semester: {semester}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#7554C8',
    padding: 22,
    borderRadius: 20,
    gap: 10,
    width: '100%',
  },

  label: {
    color: '#F0E8FF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },

  name: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    flexShrink: 1,
  },

  info: {
    marginTop: 5,
    gap: 7,
  },

  infoText: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 20,
  },
});
