
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';

import type { PortfolioProject } from './data/PortfolioData';
import { useThemeMode } from './ThemeContext';

interface Props {
  data: PortfolioProject[];
}

export default function PortfolioSection({ data }: Props) {
  const { darkMode } = useThemeMode();
  const { width } = useWindowDimensions();

  const cardWidth = Math.min(Math.max(width - 64, 250), 320);

  const cardColor = darkMode ? '#252238' : '#FFFFFF';
  const headingColor = darkMode ? '#F4EFFF' : '#493475';
  const descriptionColor = darkMode ? '#C2BBD3' : '#666177';
  const borderColor = darkMode ? '#49405F' : '#E9DDF9';

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: headingColor }]}>
        My Portfolio
      </Text>

      <FlatList
        data={data}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                width: cardWidth,
                backgroundColor: cardColor,
                borderColor,
              },
            ]}
            accessible
            accessibilityLabel={`Proyek ${item.judul}, kategori ${item.kategori}`}
          >
            <Text style={styles.category}>
              {item.kategori}
            </Text>

            <Text style={[styles.projectTitle, { color: headingColor }]}>
              {item.judul}
            </Text>

            <Text style={[styles.description, { color: descriptionColor }]}>
              {item.deskripsi}
            </Text>

            <View style={styles.tags}>
              {item.teknologi.map((tech) => (
                <View
                  key={tech}
                  style={[
                    styles.tag,
                    {
                      backgroundColor: darkMode ? '#39334F' : '#F1EAFE',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      { color: darkMode ? '#DCCAFF' : '#7554C8' },
                    ]}
                  >
                    {tech}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: descriptionColor }]}>
            Belum ada proyek yang dapat ditampilkan.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    width: '100%',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  listContent: {
    paddingVertical: 5,
    paddingRight: 5,
  },

  card: {
    borderRadius: 18,
    padding: 18,
    marginRight: 12,
    borderWidth: 1,
    minHeight: 230,
  },

  category: {
    color: '#E17B61',
    fontSize: 12,
    fontWeight: 'bold',
  },

  projectTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    lineHeight: 24,
  },

  description: {
    fontSize: 13,
    lineHeight: 21,
    marginTop: 8,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 14,
  },

  tag: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 15,
  },

  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },

  emptyText: {
    fontSize: 13,
    padding: 15,
  },
});
