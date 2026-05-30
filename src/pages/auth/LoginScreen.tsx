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
import { Button, Input, CustomAlert, useAlert } from '../../components';
import { Colors, FontSize, Radius, Spacing, rs } from '../../config';
import { validate } from '../../utils';
import { AuthStackParamList } from '../Navigation';
import { SCREENS } from '../../config/constants';

type Props = NativeStackScreenProps<AuthStackParamList, typeof SCREENS.AUTH.LOGIN>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, isLoading, error, clearError } = useAuth();
  const { showAlert, hideAlert, AlertComponent } = useAlert();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    if (!validate.required(email)) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!validate.email(email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!validate.required(password)) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (!validate.minLength(password, 6)) {
      newErrors.password = 'Mật khẩu tối thiểu 6 ký tự';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    clearError();
    const success = await login(email.trim(), password);
    if (!success && error) {
      showAlert({ type: 'error', title: 'Đăng nhập thất bại', message: error });
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
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🔑</Text>
            </View>
            <Text allowFontScaling={false} style={styles.title}>
              Chào mừng trở lại
            </Text>
            <Text allowFontScaling={false} style={styles.subtitle}>
              Đăng nhập để tiếp tục
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="example@email.com"
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (errors.email) setErrors(p => ({ ...p, email: undefined }));
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (errors.password) setErrors(p => ({ ...p, password: undefined }));
              }}
              error={errors.password}
              isPassword
            />

            <TouchableOpacity
              onPress={() => navigation.navigate(SCREENS.AUTH.FORGOT_PASSWORD)}
              style={styles.forgotBtn}
            >
              <Text allowFontScaling={false} style={styles.forgotText}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>

            <Button
              label="Đăng nhập"
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
              size="lg"
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text allowFontScaling={false} style={styles.footerText}>
              Chưa có tài khoản?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREENS.AUTH.REGISTER)}
            >
              <Text allowFontScaling={false} style={styles.footerLink}>
                Đăng ký ngay
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {AlertComponent}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    padding: Spacing.xl,
    gap: Spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  logoCircle: {
    width: rs(80),
    height: rs(80),
    borderRadius: rs(40),
    backgroundColor: Colors.glassBg,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  logoEmoji: { fontSize: rs(34) },
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
  forgotBtn: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  footerText: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  footerLink: {
    fontSize: FontSize.base,
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default LoginScreen;
