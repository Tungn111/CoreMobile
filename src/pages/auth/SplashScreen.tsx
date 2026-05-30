import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, rs, FontSize, Spacing } from '../../config';
import { AuthStackParamList } from '../Navigation';
import { SCREENS } from '../../config/constants';
import { useAuth } from '../../genaral';

type Props = NativeStackScreenProps<AuthStackParamList, typeof SCREENS.AUTH.SPLASH>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        damping: 20,
        stiffness: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          // AuthContext sẽ redirect sang MainNavigator tự động
        } else {
          navigation.replace(SCREENS.AUTH.LOGIN);
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, navigation, opacity, scale]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.logoWrapper,
          { opacity, transform: [{ scale }] },
        ]}
      >
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🚀</Text>
        </View>
        <Text allowFontScaling={false} style={styles.appName}>
          CoreMobile
        </Text>
        <Text allowFontScaling={false} style={styles.tagline}>
          Your App. Your Core.
        </Text>
      </Animated.View>

      <Text allowFontScaling={false} style={styles.version}>
        v1.0.0
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoCircle: {
    width: rs(100),
    height: rs(100),
    borderRadius: rs(50),
    backgroundColor: Colors.glassBg,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  logoEmoji: {
    fontSize: rs(44),
  },
  appName: {
    fontSize: FontSize['3xl'],
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: FontSize.base,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  version: {
    position: 'absolute',
    bottom: Spacing.xl,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});

export default SplashScreen;
