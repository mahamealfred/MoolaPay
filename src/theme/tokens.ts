// ============== Light & Dark Color Sets ==============
export const lightColors = {
  // Primary Brand - Bright Blue
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#3B82F6',
  primarySoft: '#EFF6FF',

  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  backgroundTertiary: '#F1F5F9',

  // Surfaces (Cards, Panels)
  surface: '#FFFFFF',
  surfaceSecondary: '#F8FAFC',
  surfaceElevated: '#FFFFFF',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',

  // Borders
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderFocus: '#2563EB',

  // Status
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',

  // Misc
  shadow: 'rgba(15, 23, 42, 0.08)',
  shadowMedium: 'rgba(15, 23, 42, 0.12)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  tabBar: '#FFFFFF',
  tabBarBorder: '#E2E8F0',
  tabBarActive: '#2563EB',
  tabBarInactive: '#94A3B8',
  inputBackground: '#F8FAFC',
  cardGradientStart: '#2563EB',
  cardGradientEnd: '#1D4ED8',
  shimmer: '#E2E8F0',
};

export const darkColors = {
  // Primary Brand - Bright Blue
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primaryLight: '#60A5FA',
  primarySoft: '#1E293B',

  // Backgrounds
  background: '#0B1120',
  backgroundSecondary: '#111827',
  backgroundTertiary: '#1E293B',

  // Surfaces (Cards, Panels)
  surface: '#111827',
  surfaceSecondary: '#1E293B',
  surfaceElevated: '#1E293B',

  // Text
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  textInverse: '#0F172A',

  // Borders
  border: '#1E293B',
  borderLight: '#334155',
  borderFocus: '#3B82F6',

  // Status
  success: '#10B981',
  successLight: '#064E3B',
  warning: '#F59E0B',
  warningLight: '#78350F',
  error: '#EF4444',
  errorLight: '#7F1D1D',
  info: '#3B82F6',

  // Misc
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowMedium: 'rgba(0, 0, 0, 0.5)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  tabBar: '#111827',
  tabBarBorder: '#1E293B',
  tabBarActive: '#3B82F6',
  tabBarInactive: '#64748B',
  inputBackground: '#1E293B',
  cardGradientStart: '#1E293B',
  cardGradientEnd: '#111827',
  shimmer: '#1E293B',
};

export type ThemeColors = typeof lightColors;

// Backward compat aliases (used by older components during migration)
export const colors = {
  primary: {
    main: '#2563EB',
    dark: '#1D4ED8',
    light: '#3B82F6',
    contrast: '#FFFFFF',
  },
  secondary: {
    main: '#F59E0B',
    dark: '#D97706',
    light: '#FBBF24',
  },
  accent: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F8FAFC',
    tertiary: '#F1F5F9',
    inverse: '#0F172A',
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F8FAFC',
    tertiary: '#F1F5F9',
    inverse: '#0F172A',
  },
  text: {
    primary: '#0F172A',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
    link: '#2563EB',
  },
  border: {
    primary: '#E2E8F0',
    secondary: '#F1F5F9',
    focus: '#2563EB',
    error: '#EF4444',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    neutral: '#94A3B8',
  },
  chart: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    tertiary: '#10B981',
    quaternary: '#EF4444',
    quinary: '#8B5CF6',
  },
  gradients: {
    primary: ['#2563EB', '#1D4ED8'] as string[],
    hero: ['#2563EB', '#1E40AF'] as string[],
    accent: ['#F59E0B', '#D97706'] as string[],
  },
  shadow: {
    light: 'rgba(15, 23, 42, 0.06)',
    medium: 'rgba(15, 23, 42, 0.12)',
    dark: 'rgba(15, 23, 42, 0.20)',
  },
  overlay: {
    light: 'rgba(0, 0, 0, 0.3)',
    dark: 'rgba(0, 0, 0, 0.7)',
  },
  // Backward-compatible flat aliases
  bg: '#FFFFFF',
  panel: '#FFFFFF',
  panelSoft: '#F8FAFC',
  card: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textDark: '#0F172A',
  mint: '#2563EB',
  coral: '#EF4444',
  amber: '#F59E0B',
  sky: '#3B82F6',
  line: '#E2E8F0',
};

// ============== Typography ==============
export const typography = {
  fonts: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
    mono: 'SpaceMono_400Regular',
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeights: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 44,
    '4xl': 52,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// ============== Spacing ==============
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
};

// ============== Border Radius ==============
export const radii = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,
  button: 12,
  card: 16,
  modal: 24,
  pill: 9999,
};

// ============== Shadows ==============
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
};

// ============== Animation ==============
export const animation = {
  durations: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easings: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'spring',
  },
};

// ============== Layout ==============
export const layout = {
  screen: {
    padding: spacing.md,
    maxWidth: 480,
  },
  header: {
    height: 60,
    padding: spacing.md,
  },
  tabBar: {
    height: 64,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  },
};

// ============== Z-Index ==============
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
};

// ============== Breakpoints ==============
export const breakpoints = {
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// ============== Export all ==============
export const theme = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  animation,
  layout,
  zIndex,
  breakpoints,
};

export type Theme = typeof theme;
export type ColorKeys = keyof typeof colors;
export type SpacingKeys = keyof typeof spacing;
export type RadiusKeys = keyof typeof radii;