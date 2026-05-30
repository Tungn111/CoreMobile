import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View } from 'react-native';
import { useAuth } from '../genaral';
import { Loading } from '../components';
import { Colors, rs, FontSize, Radius, Spacing, Shadows } from '../config';
import { SCREENS } from '../config/constants';

// === Screens ===
import SplashScreen from './auth/SplashScreen';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import ForgotPasswordScreen from './auth/ForgotPasswordScreen';
import HomeScreen from './main/HomeScreen';
import SearchScreen from './main/SearchScreen';
import ProfileScreen from './main/ProfileScreen';
import NotificationsScreen from './main/NotificationsScreen';
import SettingsScreen from './main/SettingsScreen';

// =============================================
// STACK PARAM LISTS
// =============================================
export type AuthStackParamList = {
  [SCREENS.AUTH.SPLASH]: undefined;
  [SCREENS.AUTH.LOGIN]: undefined;
  [SCREENS.AUTH.REGISTER]: undefined;
  [SCREENS.AUTH.FORGOT_PASSWORD]: undefined;
  [SCREENS.AUTH.OTP]: { email: string };
  [SCREENS.AUTH.RESET_PASSWORD]: { token: string };
};

export type MainTabParamList = {
  [SCREENS.MAIN.HOME]: undefined;
  [SCREENS.MAIN.SEARCH]: undefined;
  [SCREENS.MAIN.NOTIFICATIONS]: undefined;
  [SCREENS.MAIN.PROFILE]: undefined;
};

export type MainStackParamList = {
  [SCREENS.MAIN.TAB]: undefined;
  [SCREENS.MAIN.SETTINGS]: undefined;
};

// =============================================
// NAVIGATORS
// =============================================
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// =============================================
// TAB ICON HELPER
// =============================================
interface TabIconProps {
  emoji: string;
  focused: boolean;
  label: string;
}

function TabIcon({ emoji, focused, label }: TabIconProps) {
  return (
    <View style={[tabStyles.iconWrapper, focused && tabStyles.activeWrapper]}>
      <Text style={tabStyles.emoji}>{emoji}</Text>
      <Text
        allowFontScaling={false}
        style={[tabStyles.label, focused && tabStyles.activeLabel]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    paddingVertical: rs(4),
    paddingHorizontal: rs(12),
    borderRadius: Radius.lg,
    gap: rs(2),
  },
  activeWrapper: {
    backgroundColor: 'rgba(108,99,255,0.15)',
  },
  emoji: {
    fontSize: rs(22),
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  activeLabel: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

// =============================================
// BOTTOM TABS
// =============================================
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.backgroundCard,
          borderTopColor: Colors.glassBorder,
          borderTopWidth: 1,
          paddingHorizontal: Spacing.sm,
          height: rs(72),
          ...Shadows.lg,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={SCREENS.MAIN.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏠" focused={focused} label="Trang chủ" />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.MAIN.SEARCH}
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🔍" focused={focused} label="Tìm kiếm" />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.MAIN.NOTIFICATIONS}
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🔔" focused={focused} label="Thông báo" />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.MAIN.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="👤" focused={focused} label="Cá nhân" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// =============================================
// MAIN STACK
// =============================================
function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={SCREENS.MAIN.TAB} component={MainTabs} />
      <MainStack.Screen
        name={SCREENS.MAIN.SETTINGS}
        component={SettingsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </MainStack.Navigator>
  );
}

// =============================================
// AUTH STACK
// =============================================
function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREENS.AUTH.SPLASH}
    >
      <AuthStack.Screen name={SCREENS.AUTH.SPLASH} component={SplashScreen} />
      <AuthStack.Screen
        name={SCREENS.AUTH.LOGIN}
        component={LoginScreen}
        options={{ animation: 'fade' }}
      />
      <AuthStack.Screen
        name={SCREENS.AUTH.REGISTER}
        component={RegisterScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <AuthStack.Screen
        name={SCREENS.AUTH.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
    </AuthStack.Navigator>
  );
}

// =============================================
// ROOT NAVIGATOR
// =============================================
export default function RootNavigator() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <Loading fullScreen message="Đang khởi động..." />;

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
