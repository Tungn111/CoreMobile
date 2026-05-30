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
import { Button, Input, useAlert } from '../../components';
import { api, getErrorMessage } from '../../utils';
import { Colors, FontSize, Radius, Spacing, rs } from '../../config';
import { validate } from '../../utils';
import { AuthStackParamList } from '../Navigation';
import { SCREENS } from '../../config/constants';

type Props = NativeStackScreenProps<AuthStackParamList, typeof SCREENS.AUTH.FORGOT_PASSWORD>;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { showAlert, AlertComponent } = useAlert();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!validate.email(email)) {
      setEmailError('Email không hợp lệ');
      return;
    }
    setIsLoading(true);
    try {
      await api.post('/auth/forgot-password', { email: email.trim() });
      setSent(true);
    } catch (err) {
      showAlert({
        type: 'error',
        title: 'Thất bại',
        message: getErrorMessage(err),
      });
    } finally {
      setIsLoading(false);
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text allowFontScaling={false} style={styles.backIcon}>← Quay lại</Text>
          </TouchableOpacity>

          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>{sent ? '📬' : '🔒'}</Text>
          </View>

          <Text allowFontScaling={false} style={styles.title}>
            {sent ? 'Đã gửi email' : 'Quên mật khẩu'}
          </Text>
          <Text allowFontScaling={false} style={styles.desc}>
            {sent
              ? `Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến\n${email}`
              : 'Nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu'}
          </Text>

          {!sent && (
            <View style={styles.form}>
              <Input
                label="Email"
                placeholder="example@email.com"
                value={email}
                onChangeText={v => { setEmail(v); setEmailError(''); }}
                error={emailError}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Button
                label="Gửi yêu cầu"
                onPress={handleSend}
                loading={isLoading}
                fullWidth
                size="lg"
              />
            </View>
          )}

          {sent && (
            <Button
              label="Về trang đăng nhập"
              onPress={() => navigation.navigate(SCREENS.AUTH.LOGIN)}
              fullWidth
              size="lg"
              variant="outline"
            />
          )}
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
    gap: Spacing.base,
    justifyContent: 'center',
  },
  backBtn: { alignSelf: 'flex-start', marginBottom: Spacing.sm },
  backIcon: { fontSize: FontSize.base, color: Colors.primary, fontWeight: '600' },
  iconWrapper: {
    alignSelf: 'center',
    width: rs(88),
    height: rs(88),
    borderRadius: rs(44),
    backgroundColor: Colors.glassBg,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  icon: { fontSize: rs(38) },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  desc: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.6,
    marginBottom: Spacing.sm,
  },
  form: {
    gap: Spacing.base,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
  },
});

export default ForgotPasswordScreen;
