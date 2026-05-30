import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../../components';
import { Colors, FontSize, Radius, Spacing, rs } from '../../config';
import { timeAgo } from '../../utils';

// Dữ liệu mẫu — thay bằng API call thực
const NOTIFICATIONS = [
  {
    id: '1',
    type: 'info',
    title: 'Chào mừng bạn!',
    message: 'Cảm ơn bạn đã sử dụng CoreMobile.',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '2',
    type: 'success',
    title: 'Cập nhật thành công',
    message: 'Thông tin tài khoản đã được cập nhật.',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: '3',
    type: 'warning',
    title: 'Bảo mật',
    message: 'Chúng tôi phát hiện đăng nhập từ thiết bị mới.',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const TYPE_CONFIG = {
  info: { emoji: 'ℹ️', color: Colors.info },
  success: { emoji: '✅', color: Colors.success },
  warning: { emoji: '⚠️', color: Colors.warning },
  error: { emoji: '❌', color: Colors.error },
};

const NotificationsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text allowFontScaling={false} style={styles.title}>
          🔔 Thông báo
        </Text>
        <TouchableOpacity>
          <Text allowFontScaling={false} style={styles.markAll}>
            Đọc tất cả
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            emoji="🔔"
            title="Không có thông báo"
            description="Tất cả thông báo sẽ hiển thị ở đây."
          />
        }
        renderItem={({ item }) => {
          const config = TYPE_CONFIG[item.type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG.info;
          return (
            <TouchableOpacity
              activeOpacity={0.75}
              style={[styles.card, !item.read && styles.cardUnread]}
            >
              {!item.read && <View style={styles.unreadDot} />}
              <View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: config.color + '20' },
                ]}
              >
                <Text style={styles.emoji}>{config.emoji}</Text>
              </View>
              <View style={styles.content}>
                <Text allowFontScaling={false} style={styles.cardTitle}>
                  {item.title}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={styles.cardMessage}
                  numberOfLines={2}
                >
                  {item.message}
                </Text>
                <Text allowFontScaling={false} style={styles.cardTime}>
                  {timeAgo(item.createdAt)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  markAll: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  list: {
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    position: 'relative',
  },
  cardUnread: {
    borderColor: Colors.primary + '40',
    backgroundColor: Colors.backgroundElevated,
  },
  unreadDot: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: rs(8),
    height: rs(8),
    borderRadius: rs(4),
    backgroundColor: Colors.primary,
  },
  iconWrapper: {
    width: rs(44),
    height: rs(44),
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emoji: { fontSize: rs(20) },
  content: { flex: 1, gap: rs(4) },
  cardTitle: {
    fontSize: FontSize.base,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  cardMessage: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * 1.5,
  },
  cardTime: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});

export default NotificationsScreen;
