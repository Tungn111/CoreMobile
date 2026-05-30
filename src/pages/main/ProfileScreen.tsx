import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../genaral';
import { Avatar, Button, useAlert } from '../../components';
import { Colors, FontSize, Radius, Spacing, rs, Shadows } from '../../config';
import { SCREENS } from '../../config/constants';
import { MainStackParamList } from '../Navigation';

type NavProp = NativeStackNavigationProp<MainStackParamList>;

interface MenuItemProps {
  emoji: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
}

function MenuItem({ emoji, label, onPress, danger = false }: MenuItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={styles.menuItem}
      onPress={onPress}
    >
      <Text style={styles.menuEmoji}>{emoji}</Text>
      <Text
        allowFontScaling={false}
        style={[styles.menuLabel, danger && styles.menuLabelDanger]}
      >
        {label}
      </Text>
      <Text allowFontScaling={false} style={styles.menuChevron}>›</Text>
    </TouchableOpacity>
  );
}

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { showAlert, hideAlert, AlertComponent } = useAlert();
  const navigation = useNavigation<NavProp>();

  const handleLogout = () => {
    showAlert({
      type: 'confirm',
      title: 'Đăng xuất',
      message: 'Bạn có chắc muốn đăng xuất không?',
      buttons: [
        { label: 'Hủy', onPress: hideAlert, variant: 'ghost' },
        { label: 'Đăng xuất', onPress: async () => { hideAlert(); await logout(); }, variant: 'danger' },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Avatar name={user?.name} uri={user?.avatar} size="xl" showOnlineIndicator isOnline />
          <View style={styles.profileInfo}>
            <Text allowFontScaling={false} style={styles.profileName}>
              {user?.name ?? 'Người dùng'}
            </Text>
            <Text allowFontScaling={false} style={styles.profileEmail}>
              {user?.email ?? ''}
            </Text>
            {user?.role && (
              <View style={styles.roleBadge}>
                <Text allowFontScaling={false} style={styles.roleText}>
                  {user.role}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Menu Groups */}
        <View style={styles.menuGroup}>
          <Text allowFontScaling={false} style={styles.menuGroupTitle}>
            Tài khoản
          </Text>
          <View style={styles.menuCard}>
            <MenuItem
              emoji="👤"
              label="Thông tin cá nhân"
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <MenuItem
              emoji="🔒"
              label="Đổi mật khẩu"
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <MenuItem
              emoji="🔔"
              label="Cài đặt thông báo"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.menuGroup}>
          <Text allowFontScaling={false} style={styles.menuGroupTitle}>
            Ứng dụng
          </Text>
          <View style={styles.menuCard}>
            <MenuItem
              emoji="⚙️"
              label="Cài đặt"
              onPress={() => navigation.navigate(SCREENS.MAIN.SETTINGS)}
            />
            <View style={styles.divider} />
            <MenuItem
              emoji="❓"
              label="Trợ giúp & Hỗ trợ"
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <MenuItem
              emoji="📋"
              label="Điều khoản sử dụng"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Logout */}
        <Button
          label="🚪 Đăng xuất"
          variant="danger"
          size="lg"
          fullWidth
          onPress={handleLogout}
        />

        <Text allowFontScaling={false} style={styles.version}>
          CoreMobile v1.0.0
        </Text>
      </ScrollView>

      {AlertComponent}
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
  profileCard: {
    alignItems: 'center',
    gap: Spacing.base,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    ...Shadows.md,
  },
  profileInfo: { alignItems: 'center', gap: rs(4) },
  profileName: {
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  profileEmail: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  roleBadge: {
    marginTop: rs(4),
    paddingHorizontal: Spacing.sm,
    paddingVertical: rs(4),
    backgroundColor: Colors.primary + '20',
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  roleText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuGroup: { gap: Spacing.sm },
  menuGroupTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingLeft: Spacing.xs,
  },
  menuCard: {
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  menuEmoji: { fontSize: rs(20), width: rs(28) },
  menuLabel: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  menuLabelDanger: { color: Colors.error },
  menuChevron: {
    fontSize: rs(20),
    color: Colors.textMuted,
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: Spacing.xl + rs(28),
  },
  version: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});

export default ProfileScreen;
