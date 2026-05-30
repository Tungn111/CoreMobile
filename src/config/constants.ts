// =============================================
// APP CONSTANTS
// =============================================

export const APP_NAME = 'CoreMobile';
export const APP_VERSION = '1.0.0';
export const APP_BUILD = 1;

// =============================================
// API CONFIGURATION
// =============================================
export const API_BASE_URL = 'https://your-api.com/api'; // 🔧 Thay URL thật vào đây
export const API_TIMEOUT = 15000; // 15 seconds
export const API_VERSION = 'v1';

// =============================================
// STORAGE KEYS (AsyncStorage / MMKV)
// =============================================
export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@app/access_token',
  REFRESH_TOKEN: '@app/refresh_token',
  USER_DATA: '@app/user_data',
  THEME_MODE: '@app/theme_mode',
  LANGUAGE: '@app/language',
  ONBOARDING_DONE: '@app/onboarding_done',
  BIOMETRIC_ENABLED: '@app/biometric_enabled',
  PUSH_TOKEN: '@app/push_token',
} as const;

// =============================================
// NAVIGATION SCREEN NAMES
// =============================================
export const SCREENS = {
  // Auth Stack
  AUTH: {
    SPLASH: 'Splash',
    ONBOARDING: 'Onboarding',
    LOGIN: 'Login',
    REGISTER: 'Register',
    FORGOT_PASSWORD: 'ForgotPassword',
    OTP: 'OTP',
    RESET_PASSWORD: 'ResetPassword',
  },

  // Main Stack
  MAIN: {
    TAB: 'MainTab',
    HOME: 'Home',
    SEARCH: 'Search',
    PROFILE: 'Profile',
    NOTIFICATIONS: 'Notifications',
    SETTINGS: 'Settings',
  },
} as const;

// =============================================
// REGEX PATTERNS
// =============================================
export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_VN: /^(0|84)(3[2-9]|5[2-9]|7[06-9]|8[1-9]|9[0-9])\d{7}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  OTP: /^\d{6}$/,
  ONLY_NUMBER: /^\d+$/,
  ONLY_ALPHA: /^[a-zA-Z]+$/,
} as const;

// =============================================
// PAGINATION
// =============================================
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// =============================================
// FILE UPLOAD
// =============================================
export const UPLOAD = {
  MAX_IMAGE_SIZE_MB: 5,
  MAX_VIDEO_SIZE_MB: 50,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/mov'],
  IMAGE_QUALITY: 0.8,
} as const;

// =============================================
// FEATURE FLAGS
// =============================================
export const FEATURES = {
  BIOMETRIC_AUTH: false,
  PUSH_NOTIFICATION: false,
  ANALYTICS: false,
  DARK_MODE_FORCED: true,
} as const;
