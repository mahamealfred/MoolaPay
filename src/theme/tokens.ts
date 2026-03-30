// ============== Color System ==============
export const colors = {
  // Primary Brand Colors - BK Navy
  primary: {
    main: '#17304D',
    dark: '#0B1A2B',
    light: '#0F2238',
    contrast: '#FFFFFF',
  },
  
  // Secondary Colors - BK Gold
  secondary: {
    main: '#F5B800',
    dark: '#D4A000',
    light: '#FAD348',
  },
  
  // Accent Colors
  accent: {
    success: '#00813D',
    warning: '#F5B800',
    error: '#C93030',
    info: '#1560BD',
  },
  
  // Background Colors
  background: {
    primary: '#17304D',
    secondary: '#0F2238',
    tertiary: '#0B1A2B',
    inverse: '#081421',
  },
  
  // Surface Colors (Cards, Modals, etc.)
  surface: {
    primary: '#17304D', // BK Navy (matches background.primary)
    secondary: '#0F2238',
    tertiary: '#0B1A2B',
    inverse: '#003087',
  },
  
  // Text Colors
  text: {
    primary: '#F0F4FA', // Light for dark backgrounds
    secondary: '#B6C3D6', // Softer light
    tertiary: '#8FA3BC',
    inverse: '#FFFFFF',
    link: '#F5B800', // Use gold for links
  },
  
  // Border Colors
  border: {
    primary: '#D2DCE8',
    secondary: '#E6EDF6',
    focus: '#003087',
    error: '#C93030',
  },
  
  // Status Colors
  status: {
    success: '#00813D',
    warning: '#F5B800',
    error: '#C93030',
    info: '#1560BD',
    neutral: '#9CA3AF',
  },
  
  // Chart/Data Visualization Colors
  chart: {
    primary: '#003087',
    secondary: '#F5B800',
    tertiary: '#00813D',
    quaternary: '#C93030',
    quinary: '#1560BD',
  },
  
  // Gradients
  gradients: {
    primary: ['#17304D', '#0F2238'],
    hero: ['#17304D', '#0B1A2B'],
    accent: ['#F5B800', '#D4A000'],
  },
  
  // Shadow Colors
  shadow: {
    light: 'rgba(0, 31, 94, 0.06)',
    medium: 'rgba(0, 31, 94, 0.12)',
    dark: 'rgba(0, 31, 94, 0.20)',
  },
  
  // Overlay Colors
  overlay: {
    light: 'rgba(0, 0, 0, 0.3)',
    dark: 'rgba(0, 0, 0, 0.7)',
  },

  // Backward-compatible aliases for older components
  bg: '#17304D',
  panel: '#17304D', // match new surface.primary
  panelSoft: '#0F2238',
  card: '#17304D',
  textPrimary: '#F0F4FA',
  textSecondary: '#B6C3D6',
  textDark: '#F0F4FA',
  mint: '#17304D',
  coral: '#C93030',
  amber: '#F5B800',
  sky: '#1560BD',
  line: '#D2DCE8',
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
  
  // Semantic aliases
  button: 12,
  card: 16,
  modal: 24,
  pill: 9999,
};

// ============== Shadows ==============
export const shadows = {
  sm: {
    shadowColor: colors.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.shadow.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
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
    maxWidth: 480, // For responsive design
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

// ============== Breakpoints (for responsive design) ==============
export const breakpoints = {
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// ============== Export all themes ==============
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