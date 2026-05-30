import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// === Responsive Scaling ===
const BASE_WIDTH = 375; // iPhone 14 base
const BASE_HEIGHT = 812;

/** Responsive Scale - horizontal */
export const rs = (size: number) =>
  Math.round((size / BASE_WIDTH) * SCREEN_WIDTH);

/** Responsive Vertical Scale */
export const rvs = (size: number) =>
  Math.round((size / BASE_HEIGHT) * SCREEN_HEIGHT);

/** Responsive Moderate Scale (less aggressive) */
export const rms = (size: number, factor = 0.5) =>
  size + (rs(size) - size) * factor;

/** Responsive Font */
export const rf = (size: number) => {
  const newSize = rs(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const screen = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

// === Color Palette ===
export const Colors = {
  // Primary
  primary: '#6C63FF',
  primaryDark: '#4B44CC',
  primaryLight: '#9D99FF',

  // Secondary
  secondary: '#FF6584',
  secondaryDark: '#CC4D65',
  secondaryLight: '#FF94A8',

  // Accent
  accent: '#43C6AC',
  accentDark: '#2E9B87',
  accentLight: '#7DDDD0',

  // Background
  background: '#0D0D1A',
  backgroundCard: '#151528',
  backgroundElevated: '#1E1E35',
  backgroundModal: 'rgba(13,13,26,0.95)',

  // Surface / Glass
  glassBg: 'rgba(255,255,255,0.05)',
  glassBorder: 'rgba(255,255,255,0.12)',
  glassBgStrong: 'rgba(255,255,255,0.10)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.65)',
  textMuted: 'rgba(255,255,255,0.38)',
  textInverse: '#0D0D1A',

  // Status
  success: '#4CAF50',
  successLight: 'rgba(76,175,80,0.15)',
  warning: '#FF9800',
  warningLight: 'rgba(255,152,0,0.15)',
  error: '#F44336',
  errorLight: 'rgba(244,67,54,0.15)',
  info: '#2196F3',
  infoLight: 'rgba(33,150,243,0.15)',

  // Borders
  border: 'rgba(255,255,255,0.08)',
  borderFocus: 'rgba(108,99,255,0.6)',

  // Misc
  overlay: 'rgba(0,0,0,0.6)',
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof Colors;

// === Gradients ===
export const Gradients = {
  primary: ['#6C63FF', '#9D99FF'] as const,
  secondary: ['#FF6584', '#FF94A8'] as const,
  accent: ['#43C6AC', '#7DDDD0'] as const,
  dark: ['#0D0D1A', '#1E1E35'] as const,
  card: ['#151528', '#1E1E35'] as const,
  success: ['#4CAF50', '#66BB6A'] as const,
  warning: ['#FF9800', '#FFA726'] as const,
  error: ['#F44336', '#EF5350'] as const,
  sunrise: ['#FF6584', '#FFB347'] as const,
  ocean: ['#6C63FF', '#43C6AC'] as const,
} as const;

// === Typography ===
export const FontFamily = {
  regular: Platform.select({ ios: 'System', android: 'Roboto' }),
  medium: Platform.select({ ios: 'System', android: 'Roboto-Medium' }),
  bold: Platform.select({ ios: 'System', android: 'Roboto-Bold' }),
  light: Platform.select({ ios: 'System', android: 'Roboto-Light' }),
  mono: Platform.select({ ios: 'Courier', android: 'monospace' }),
} as const;

export const FontSize = {
  xs: rf(10),
  sm: rf(12),
  base: rf(14),
  md: rf(16),
  lg: rf(18),
  xl: rf(20),
  '2xl': rf(24),
  '3xl': rf(28),
  '4xl': rf(32),
  '5xl': rf(40),
} as const;

export const LineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.8,
} as const;

// === Spacing ===
export const Spacing = {
  xs: rs(4),
  sm: rs(8),
  md: rs(12),
  base: rs(16),
  lg: rs(20),
  xl: rs(24),
  '2xl': rs(32),
  '3xl': rs(40),
  '4xl': rs(48),
  '5xl': rs(64),
} as const;

// === Border Radius ===
export const Radius = {
  xs: rs(4),
  sm: rs(8),
  md: rs(12),
  lg: rs(16),
  xl: rs(20),
  '2xl': rs(24),
  '3xl': rs(32),
  full: 9999,
} as const;

// === Shadows ===
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 16,
    elevation: 10,
  },
  primary: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

// === Z-Index ===
export const ZIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  modal: 1000,
  toast: 2000,
  tooltip: 3000,
} as const;

// === Timing ===
export const Duration = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;
