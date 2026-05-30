import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../genaral';
import { Button, Input, useAlert } from '../../components';
import { Colors, FontSize, Radius, Spacing, rs } from '../../config';
import { validate } from '../../utils';
import { AuthStackParamList } from '../Navigation';
import { SCREENS } from '../../config/constants';

type Props = NativeStackScreenProps<AuthStackParamList, typeof SCREENS.AUTH.REGISTER>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register, isLoading, error, clearError } = useAuth();
  const { showAlert, AlertComponent } = useAlert();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const set = (key: keyof typeof form) => (val: string) => {
    setForm(p => ({ ...p, [key]: val }));
    setErrors(p => ({ ...p, [key]: undefined }));
  };

  const validateForm = (): boolean => {
    const e: Partial<typeof form> = {};
    if (!validate.required(form.name)) e.name = 'Vui lòng nhập họ tên';
    if (!validate.email(form.email)) e.email = 'Email không hợp lệ';
    if (!validate.minLength(form.password, 8)) e.password = 'Mật khẩu tối thiểu 8 ký tự';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Mật khẩu xác nhận không khớp';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    clearError();
    const success = await register({ name: form.name, email: form.email, password: form.password });
    if (!success && error) {
      showAlert({ type: 'error', title: 'Đăng ký thất bại', message: error });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.title}>Tạo tài khoản</Text>
            <Text allowFontScaling={false} style={styles.subtitle}>Điền thông tin để đăng ký</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Họ và tên"
              placeholder="Nguyễn Văn A"
              value={form.name}
              onChangeText={set('name')}
              error={errors.name}
              autoCapitalize="words"
            />
            <Input
              label="Email"
              placeholder="example@email.com"
              value={form.email}
              onChangeText={set('email')}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Mật khẩu"
              placeholder="Tối thiểu 8 ký tự"
              value={form.password}
              onChangeText={set('password')}
              error={errors.password}
              isPassword
            />
            <Input
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
              value={form.confirmPassword}
              onChangeText={set('confirmPassword')}
              error={errors.confirmPassword}
              isPassword
            />

            <Button
              label="Đăng ký"
              onPress={handleRegister}
              loading={isLoading}
              fullWidth
              size="lg"
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text allowFontScaling={false} style={styles.footerText}>
              Đã có tài khoản?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.AUTH.LOGIN)}>
              <Text allowFontScaling={false} style={styles.footerLink}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {AlertComponent}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    padding: Spacing.xl,
    gap: Spacing.xl,
    justifyContent: 'center',
  },
  header: { gap: Spacing.xs },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.xs,
    padding: Spacing.xs,
  },
  backIcon: {
    fontSize: rs(24),
    color: Colors.primary,
    fontWeight: '700',
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  form: {
    gap: Spacing.base,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  footerText: { fontSize: FontSize.base, color: Colors.textSecondary },
  footerLink: { fontSize: FontSize.base, color: Colors.primary, fontWeight: '700' },
});

export default RegisterScreen;
