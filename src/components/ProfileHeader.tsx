
import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import type { ProfileData } from './data/ProfileData';
import { useThemeMode } from './ThemeContext';

interface Props {
  data: ProfileData;
}

export default function ProfileHeader({ data }: Props) {
  const { width } = useWindowDimensions();
  const { darkMode } = useThemeMode();

  const isWide = width >= 700;

  const backgroundColor = darkMode ? '#252238' : '#F0E9FF';
  const headingColor = darkMode ? '#F7F2FF' : '#30283F';
  const textColor = darkMode ? '#D0C7E0' : '#655B75';
  const borderColor = darkMode ? '#49405F' : '#FFFFFF';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          flexDirection: isWide ? 'row-reverse' : 'column',
          alignItems: 'center',
        },
      ]}
    >
      {/* Foto Profil */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/profil.jpeg')}
          style={[
            styles.profileImage,
            {
              width: isWide ? 230 : 150,
              height: isWide ? 280 : 150,
              borderRadius: isWide ? 115 : 80,
            },
          ]}
          resizeMode="cover"
          accessibilityLabel={`Foto profil ${data.nama}`}
        />
      </View>

      {/* Informasi Profil */}
      <View
        style={[
          styles.content,
          {
            alignItems: isWide ? 'flex-start' : 'center',
            paddingHorizontal: isWide ? 15 : 0,
          },
        ]}
      >
        <Text style={styles.eyebrow}>
          HELLO, NICE TO MEET YOU!
        </Text>

        <Text
          style={[
            styles.nama,
            {
              color: headingColor,
              fontSize: isWide ? 48 : 34,
              textAlign: isWide ? 'left' : 'center',
            },
          ]}
        >
          {data.nama}
        </Text>

        <Text
          style={[
            styles.profesi,
            {
              color: darkMode ? '#DCCAFF' : '#7554C8',
              textAlign: isWide ? 'left' : 'center',
            },
          ]}
        >
          {data.profesi}
        </Text>

        <Text
          style={[
            styles.deskripsi,
            {
              color: textColor,
              textAlign: isWide ? 'left' : 'center',
            },
          ]}
        >
          {data.deskripsi}
        </Text>

        <View
          style={[
            styles.identityContainer,
            {
              alignSelf: isWide ? 'flex-start' : 'center',
              backgroundColor: darkMode ? '#39334F' : '#FFFFFF',
            },
          ]}
        >
          <Text style={[styles.identityText, { color: textColor }]}>
            {data.pendidikan}
          </Text>

          <Text style={[styles.identityText, { color: textColor }]}>
            NIM: {data.nim}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 24,
    borderRadius: 28,
    borderWidth: 2,
    gap: 24,
    elevation: 3,
    shadowColor: '#7554C8',
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImage: {
    borderWidth: 5,
    borderColor: '#FFFFFF',
    backgroundColor: '#D8C8EF',
  },

  content: {
    flex: 1,
    width: '100%',
    gap: 12,
    justifyContent: 'center',
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: '#E58B78',
    textAlign: 'center',
  },

  nama: {
    fontWeight: 'bold',
    letterSpacing: -1,
  },

  profesi: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 22,
  },

  deskripsi: {
    fontSize: 14,
    lineHeight: 23,
  },

  identityContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 6,
    marginTop: 4,
  },

  identityText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
