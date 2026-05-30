import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../genaral';
import { Avatar } from '../../components';
import { Colors, FontSize, Radius, Spacing, rs, Shadows } from '../../config';

// =============================================
// FEATURE CARD
// =============================================
interface FeatureCardProps {
  emoji: string;
  title: string;
  desc: string;
  color: string;
}

function FeatureCard({ emoji, title, desc, color }: FeatureCardProps) {
  return (
    <View style={[styles.featureCard, { borderColor: color + '40' }]}>
      <View style={[styles.featureIcon, { backgroundColor: color + '20' }]}>
        <Text style={styles.featureEmoji}>{emoji}</Text>
      </View>
      <Text allowFontScaling={false} style={styles.featureTitle}>{title}</Text>
      <Text allowFontScaling={false} style={styles.featureDesc}>{desc}</Text>
    </View>
  );
}

// =============================================
// SCREEN
// =============================================
const HomeScreen: React.FC = () => {
  const { user } = useAuth();

  const features = [
    { emoji: '📋', title: 'Quản lý', desc: 'Quản lý dữ liệu của bạn', color: Colors.primary },
    { emoji: '📊', title: 'Thống kê', desc: 'Báo cáo & biểu đồ', color: Colors.accent },
    { emoji: '🔔', title: 'Thông báo', desc: 'Cập nhật thời gian thực', color: Colors.warning },
    { emoji: '⚙️', title: 'Cài đặt', desc: 'Tùy chỉnh ứng dụng', color: Colors.secondary },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text allowFontScaling={false} style={styles.greeting}>
              Xin chào 👋
            </Text>
            <Text allowFontScaling={false} style={styles.userName}>
              {user?.name ?? 'Người dùng'}
            </Text>
          </View>
          <Avatar name={user?.name} uri={user?.avatar} size="md" showOnlineIndicator isOnline />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Text allowFontScaling={false} style={styles.bannerTitle}>
            🚀 CoreMobile Template
          </Text>
          <Text allowFontScaling={false} style={styles.bannerDesc}>
            Bộ core mobile sẵn sàng để bạn phát triển. Thay đổi màu sắc, data và bắt đầu code ngay!
          </Text>
        </View>

        {/* Section */}
        <Text allowFontScaling={false} style={styles.sectionTitle}>
          Tính năng
        </Text>
        <View style={styles.featureGrid}>
          {features.map(f => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </View>

        {/* Activity */}
        <Text allowFontScaling={false} style={styles.sectionTitle}>
          Hoạt động gần đây
        </Text>
        <View style={styles.activityList}>
          {[1, 2, 3].map(i => (
            <View key={i} style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text allowFontScaling={false} style={styles.activityTitle}>
                  Hoạt động mẫu #{i}
                </Text>
                <Text allowFontScaling={false} style={styles.activityTime}>
                  {i} giờ trước
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: {
    padding: Spacing.xl,
    gap: Spacing.xl,
    paddingBottom: Spacing['4xl'],
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { gap: rs(2) },
  greeting: { fontSize: FontSize.base, color: Colors.textSecondary },
  userName: {
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  // Banner
  banner: {
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    gap: Spacing.xs,
  },
  bannerTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  bannerDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * 1.6,
  },
  // Section
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  // Feature grid
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  featureCard: {
    width: '47%',
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.xs,
    ...Shadows.sm,
  },
  featureIcon: {
    width: rs(48),
    height: rs(48),
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rs(4),
  },
  featureEmoji: { fontSize: rs(22) },
  featureTitle: {
    fontSize: FontSize.base,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  featureDesc: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  // Activity
  activityList: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  activityDot: {
    width: rs(10),
    height: rs(10),
    borderRadius: rs(5),
    backgroundColor: Colors.primary,
  },
  activityContent: { flex: 1, gap: rs(2) },
  activityTitle: {
    fontSize: FontSize.base,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  activityTime: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});

export default HomeScreen;
