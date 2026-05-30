import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, EmptyState } from '../../components';
import { Colors, FontSize, Radius, Spacing, rs } from '../../config';
import { fuzzySearch } from '../../utils';

// Dữ liệu mẫu — thay bằng API call thực
const SAMPLE_DATA = [
  { id: '1', title: 'Mục tìm kiếm 1', category: 'Danh mục A' },
  { id: '2', title: 'Mục tìm kiếm 2', category: 'Danh mục B' },
  { id: '3', title: 'Kết quả khác', category: 'Danh mục A' },
  { id: '4', title: 'Demo item', category: 'Danh mục C' },
  { id: '5', title: 'Thử nghiệm', category: 'Danh mục B' },
];

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? SAMPLE_DATA.filter(item => fuzzySearch(item.title, query) || fuzzySearch(item.category, query))
    : [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text allowFontScaling={false} style={styles.title}>
          🔍 Tìm kiếm
        </Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchBox}>
        <Input
          placeholder="Nhập từ khóa tìm kiếm..."
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
      </View>

      {/* Results */}
      {query.trim() ? (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              emoji="🔍"
              title="Không tìm thấy"
              description={`Không có kết quả nào cho "${query}"`}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.75} style={styles.resultCard}>
              <Text allowFontScaling={false} style={styles.resultTitle}>
                {item.title}
              </Text>
              <Text allowFontScaling={false} style={styles.resultCategory}>
                {item.category}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderEmoji}>💡</Text>
          <Text allowFontScaling={false} style={styles.placeholderText}>
            Nhập từ khóa để tìm kiếm
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  searchBox: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  list: {
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  resultCard: {
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: rs(4),
  },
  resultTitle: {
    fontSize: FontSize.base,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  resultCategory: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  placeholderEmoji: { fontSize: rs(48) },
  placeholderText: {
    fontSize: FontSize.base,
    color: Colors.textMuted,
  },
});

export default SearchScreen;
