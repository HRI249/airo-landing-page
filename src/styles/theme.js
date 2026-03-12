import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    // Premium gradient palette
    teal: '#20B2AA',
    lightBlue: '#87CEEB',
    white: '#FFFFFF',
    yellow: '#FFD700',
    orange: '#FF8C00',
    red: '#FF4500',
    green: '#32CD32',
    darkGreen: '#228B22',
    black: '#000000',

    // Premium UI Colors
    primary: '#00D8A0',
    primaryDark: '#00A878',
    primaryLight: '#7DFFDB',
    secondary: '#FF6B9D',
    secondaryDark: '#E84A7F',
    accent: '#FFE066',
    accentGlow: '#FFD93D',
    
    // Dark theme premium colors
    darkPrimary: '#0F0F1A',
    darkSecondary: '#1A1A2E',
    darkTertiary: '#242438',
    darkCard: 'rgba(26, 26, 46, 0.85)',
    
    // Status colors
    success: '#00E676',
    successGlow: 'rgba(0, 230, 118, 0.4)',
    warning: '#FFAB40',
    warningGlow: 'rgba(255, 171, 64, 0.4)',
    error: '#FF5252',
    errorGlow: 'rgba(255, 82, 82, 0.4)',
    
    // Surface colors
    background: '#FFFFFF',
    surface: 'rgba(255, 255, 255, 0.95)',
    surfaceElevated: 'rgba(255, 255, 255, 0.98)',
    
    // Text colors
    text: '#1A1A1A',
    textLight: '#FFFFFF',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    textSecondaryLight: 'rgba(255, 255, 255, 0.7)',
    textMuted: 'rgba(255, 255, 255, 0.5)',

    // Premium glassmorphism
    glassWhite: 'rgba(255, 255, 255, 0.15)',
    glassWhiteMedium: 'rgba(255, 255, 255, 0.25)',
    glassWhiteStrong: 'rgba(255, 255, 255, 0.4)',
    glassBlack: 'rgba(0, 0, 0, 0.2)',
    glassBlackMedium: 'rgba(0, 0, 0, 0.4)',
    glassPremium: 'rgba(255, 255, 255, 0.08)',
    
    // Borders
    borderLight: 'rgba(255, 255, 255, 0.25)',
    borderMedium: 'rgba(255, 255, 255, 0.4)',
    borderPremium: 'rgba(255, 255, 255, 0.12)',
    borderGlow: 'rgba(0, 216, 160, 0.5)',
    
    // Shimmer effects
    shimmerBase: 'rgba(255, 255, 255, 0.1)',
    shimmerHighlight: 'rgba(255, 255, 255, 0.4)',
    
    // Particle overlay
    particleWhite: 'rgba(255, 255, 255, 0.6)',
    particlePrimary: 'rgba(0, 216, 160, 0.6)',
  },

  gradients: {
    // Premium full flow gradient
    fullFlow: [
      '#0F0F1A',
      '#1A1A2E',
      '#16213E',
      '#1A1A2E',
      '#0F0F1A',
    ],
    
    // Premium gradients
    premiumDark: ['#0F0F1A', '#1A1A2E', '#16213E'],
    premiumLight: ['#667EEA', '#764BA2', '#F093FB'],
    
    // Feature gradients with glow effect
    ocean: ['#00D8A0', '#00B894', '#00CEC9'],
    oceanDeep: ['#0984E3', '#6C5CE7', '#A29BFE'],
    sunset: ['#FF6B9D', '#FF8E53', '#FF6B35'],
    sunsetGold: ['#F39C12', '#E74C3C', '#9B59B6'],
    nature: ['#00B894', '#55EFC4', '#81ECEC'],
    aurora: ['#667EEA', '#764BA2', '#F093FB'],
    fire: ['#FF416C', '#FF4B2B', '#F7971E'],
    midnight: ['#2C3E50', '#34495E', '#4A6572'],
    dark: ['#1A1A2E', '#16213E', '#0F3460'],
    
    // Glass gradients
    glassPremium: ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)'],
    glassReflection: ['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.0)'],
    
    // Button gradients
    buttonPrimary: ['#00D8A0', '#00B894'],
    buttonSecondary: ['#FF6B9D', '#E84A7F'],
    buttonAccent: ['#FFE066', '#FFC107'],
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },

  borderRadius: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    round: 999,
  },

  shadows: {
    // Subtle shadow
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    // Medium shadow
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
    // Soft elevated shadow
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
    },
    // Large shadow
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.2,
      shadowRadius: 32,
      elevation: 12,
    },
    // Premium glow
    glow: {
      shadowColor: '#00D8A0',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 15,
    },
    // Secondary glow
    glowSecondary: {
      shadowColor: '#FF6B9D',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 15,
    },
    // Premium card shadow
    cardPremium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.25,
      shadowRadius: 48,
      elevation: 16,
    },
    // Inner glow effect
    innerGlow: {
      shadowColor: 'rgba(255,255,255,0.5)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 0,
    },
  },

  typography: {
    // Display - Extra large hero text
    display: {
      fontSize: 56,
      fontWeight: '900',
      letterSpacing: -2,
      lineHeight: 64,
    },
    // H1 - Main headings
    h1: {
      fontSize: 36,
      fontWeight: '800',
      letterSpacing: -1.5,
      lineHeight: 44,
    },
    // H2 - Section headings
    h2: {
      fontSize: 28,
      fontWeight: '700',
      letterSpacing: -0.8,
      lineHeight: 36,
    },
    // H3 - Subsection headings
    h3: {
      fontSize: 22,
      fontWeight: '600',
      letterSpacing: -0.4,
      lineHeight: 30,
    },
    // H4 - Card headings
    h4: {
      fontSize: 18,
      fontWeight: '600',
      letterSpacing: -0.2,
      lineHeight: 26,
    },
    // Body - Regular text
    body: {
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: 0.1,
      lineHeight: 24,
    },
    // Body large
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400',
      letterSpacing: 0.1,
      lineHeight: 28,
    },
    // Caption - Small text
    caption: {
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.2,
      lineHeight: 20,
    },
    // Overline - Label text
    overline: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 1,
      lineHeight: 16,
      textTransform: 'uppercase',
    },
    // Button text
    button: {
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    // Button large
    buttonLarge: {
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
  },

  // Animation timing curves - buttery smooth
  animation: {
    // Spring-like bounce
    spring: {
      type: 'spring',
      damping: 15,
      stiffness: 150,
      mass: 1,
    },
    // Quick and snappy
    snappy: {
      duration: 250,
      easing: 'ease-out',
    },
    // Smooth and elegant
    smooth: {
      duration: 400,
      easing: 'ease-in-out',
    },
    // Slow reveal
    reveal: {
      duration: 600,
      easing: 'ease-out',
    },
    // Buttery smooth
    buttery: {
      duration: 500,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },

  dimensions: {
    width,
    height,
    isSmall: width < 375,
    isMedium: width >= 375 && width < 414,
    isLarge: width >= 414,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Premium glass card
  glassCard: {
    backgroundColor: theme.colors.glassWhite,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    padding: theme.spacing.lg,
    overflow: 'hidden',
    ...theme.shadows.cardPremium,
  },
  // Premium elevated card
  premiumCard: {
    backgroundColor: theme.colors.glassPremium,
    borderRadius: theme.borderRadius.xxl,
    borderWidth: 1.5,
    borderColor: theme.colors.borderPremium,
    padding: theme.spacing.xl,
    overflow: 'hidden',
    ...theme.shadows.cardPremium,
  },
  shadow: {
    ...theme.shadows.soft,
  },
  // Center content
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Row layout
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Shimmer overlay style
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default theme;
