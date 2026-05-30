import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, FontSize, Radius, Spacing, rs } from '../../config';
import { MainStackParamList } from '../Navigation';
import { SCREENS } from '../../config/constants';

type Props = NativeStackScreenProps<MainStackParamList, typeof SCREENS.MAIN.SETTINGS>;

interface SettingToggleProps {
  label: string;
  desc?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

function SettingToggle({ label, desc, value, onChange }: SettingToggleProps) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingText}>
        <Text allowFontScaling={false} style={styles.settingLabel}>{label}</Text>
        {desc && <Text allowFontScaling={false} style={styles.settingDesc}>{desc}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: Colors.border, true: Colors.primary + '80' }}
        thumbColor={value ? Colors.primary : Colors.textMuted}
        ios_backgroundColor={Colors.border}
      />
    </View>
  );
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [biometric, setBiometric] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text allowFontScaling={false} style={styles.backText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text allowFontScaling={false} style={styles.title}>⚙️ Cài đặt</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Notifications */}
        <Text allowFontScaling={false} style={styles.groupTitle}>Thông báo</Text>
        <View style={styles.card}>
          <SettingToggle
            label="Push Notification"
            desc="Nhận thông báo đẩy từ ứng dụng"
            value={pushNotif}
            onChange={setPushNotif}
          />
          <View style={styles.divider} />
          <SettingToggle
            label="Thông báo Email"
            desc="Nhận cập nhật qua email"
            value={emailNotif}
            onChange={setEmailNotif}
          />
        </View>

        {/* Security */}
        <Text allowFontScaling={false} style={styles.groupTitle}>Bảo mật</Text>
        <View style={styles.card}>
          <SettingToggle
            label="Xác thực sinh trắc học"
            desc="Đăng nhập bằng vân tay / Face ID"
            value={biometric}
            onChange={setBiometric}
          />
        </View>

        {/* Privacy */}
        <Text allowFontScaling={false} style={styles.groupTitle}>Quyền riêng tư</Text>
        <View style={styles.card}>
          <SettingToggle
            label="Analytics"
            desc="Chia sẻ dữ liệu sử dụng ẩn danh"
            value={analytics}
            onChange={setAnalytics}
          />
        </View>

        {/* App Info */}
        <Text allowFontScaling={false} style={styles.groupTitle}>Thông tin</Text>
        <View style={styles.card}>
          {[
            { label: 'Phiên bản', value: '1.0.0' },
            { label: 'Build', value: '1' },
            { label: 'Môi trường', value: __DEV__ ? 'Development' : 'Production' },
          ].map(({ label, value }, i) => (
            <React.Fragment key={label}>
              <View style={styles.infoItem}>
                <Text allowFontScaling={false} style={styles.infoLabel}>{label}</Text>
                <Text allowFontScaling={false} style={styles.infoValue}>{value}</Text>
              </View>
              {i < 2 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    gap: Spacing.xs,
  },
  backBtn: { alignSelf: 'flex-start' },
  backText: {
    fontSize: FontSize.base,
    color: Colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  scroll: {
    padding: Spacing.xl,
    gap: Spacing.base,
    paddingBottom: Spacing['4xl'],
  },
  groupTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingLeft: Spacing.xs,
    marginTop: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  settingText: { flex: 1, marginRight: Spacing.base, gap: rs(2) },
  settingLabel: {
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  settingDesc: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.base,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  infoLabel: {
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  infoValue: {
    fontSize: FontSize.base,
    color: Colors.textMuted,
    fontWeight: '500',
  },
});

export default SettingsScreen;
