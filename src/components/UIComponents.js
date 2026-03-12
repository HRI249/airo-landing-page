import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable';
import { theme, globalStyles } from '../styles/theme';

const { width } = Dimensions.get('window');

// Premium animated shimmer effect
const ShimmerEffect = ({ style }) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        duration: 2500,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      })
    );
    shimmer.start();
    return () => shimmer.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.shimmerEffect,
        style,
        { transform: [{ translateX }] },
      ]}
      pointerEvents="none"
    >
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.15)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
};

// Premium Gradient Button Component with buttery smooth animations
export const GradientButton = ({
  title,
  onPress,
  gradient = theme.gradients.buttonPrimary,
  style,
  textStyle,
  disabled = false,
  loading = false,
  icon,
  size = 'medium',
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Subtle breathing glow effect
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    glow.start();
    return () => glow.stop();
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        friction: 8,
        tension: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const sizeStyles = size === 'large' ? styles.buttonLarge : 
                     size === 'small' ? styles.buttonSmall : styles.buttonMedium;
  const textSizeStyles = size === 'large' ? styles.buttonTextLarge : 
                         size === 'small' ? styles.buttonTextSmall : styles.buttonTextMedium;

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        sizeStyles,
        style,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
        style={styles.buttonTouchable}
        {...props}
      >
        <LinearGradient
          colors={disabled ? ['#4A4A4A', '#3A3A3A'] : gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientButton, sizeStyles]}
        >
          {/* Shimmer overlay */}
          <ShimmerEffect />
          
          {/* Glow overlay */}
          <Animated.View
            style={[
              styles.glowOverlay,
              { opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3],
              })},
            ]}
          />
          
          <View style={styles.buttonContent}>
            {icon && <View style={styles.buttonIcon}>{icon}</View>}
            <Text style={[styles.buttonText, textSizeStyles, textStyle]}>
              {loading ? 'Loading...' : title}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Premium Glass Card Component with advanced blur and animations
export const GlassCard = ({
  children,
  style,
  blurType = 'dark',
  blurAmount = 20,
  animated = true,
  delay = 0,
  ...props
}) => {
  const intensity = blurAmount * 2;
  const tint = blurType === 'light' ? 'light' : 'dark';

  const CardWrapper = animated ? Animatable.View : View;
  const animationProps = animated ? {
    animation: 'fadeInUp',
    duration: 800,
    delay,
    easing: 'ease-out-quart',
  } : {};

  return (
    <CardWrapper
      {...animationProps}
      style={[styles.glassCardContainer, style]}
      {...props}
    >
      {/* Gradient border effect */}
      <LinearGradient
        colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.glassCardBorder}
      />
      
      <BlurView
        style={styles.blurView}
        tint={tint}
        intensity={intensity}
      >
        <View style={styles.glassCardContent}>
          {/* Inner highlight */}
          <LinearGradient
            colors={['rgba(255,255,255,0.15)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.5 }}
            style={styles.innerHighlight}
            pointerEvents="none"
          />
          {children}
        </View>
      </BlurView>
    </CardWrapper>
  );
};

// Premium Gradient Card Component
export const GradientCard = ({
  children,
  gradient = theme.gradients.glassPremium,
  style,
  animated = true,
  delay = 0,
  ...props
}) => {
  const CardWrapper = animated ? Animatable.View : View;
  const animationProps = animated ? {
    animation: 'fadeInUp',
    duration: 800,
    delay,
    easing: 'ease-out-quart',
  } : {};

  return (
    <CardWrapper
      {...animationProps}
      style={[styles.gradientCardContainer, style]}
      {...props}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
        <ShimmerEffect style={styles.cardShimmer} />
        {children}
      </LinearGradient>
    </CardWrapper>
  );
};

// Premium Feature Card Component with hover-like effects
export const FeatureCard = ({
  title,
  description,
  icon,
  gradient = theme.gradients.ocean,
  onPress,
  style,
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        friction: 8,
        tension: 400,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 400,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animatable.View
      animation="zoomIn"
      duration={800}
      style={[styles.featureCardContainer, style]}
      {...props}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={styles.featureCardTouchable}
        >
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featureCard}
          >
            {/* Animated glow border */}
            <Animated.View
              style={[
                styles.featureGlow,
                { opacity: glowOpacity },
              ]}
            />
            
            {/* Shimmer effect */}
            <ShimmerEffect style={styles.featureShimmer} />
            
            {/* Inner glass effect */}
            <LinearGradient
              colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.6 }}
              style={styles.featureInnerGlass}
            />
            
            <View style={styles.featureCardContent}>
              <View style={styles.featureIconContainer}>
                <View style={styles.featureIconInner}>{icon}</View>
              </View>
              <Text style={styles.featureTitle}>{title}</Text>
              <Text style={styles.featureDescription}>{description}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </Animatable.View>
  );
};

// Premium Score Display Component with animated ring
export const ScoreDisplay = ({
  score,
  maxScore = 100,
  label,
  color,
  size = 'large',
  style,
  ...props
}) => {
  const animatedScore = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate score counting up
    Animated.timing(animatedScore, {
      toValue: score,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    // Subtle pulse effect
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [score]);

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return theme.colors.success;
    if (percentage >= 60) return theme.colors.warning;
    return theme.colors.error;
  };

  const scoreColor = color || getScoreColor(score, maxScore);
  const sizeStyles = size === 'large' ? styles.scoreLarge : styles.scoreSmall;
  const containerSize = size === 'large' ? 130 : 90;

  return (
    <Animatable.View
      animation="bounceIn"
      duration={1200}
      style={[styles.scoreContainer, { width: containerSize, height: containerSize }, style]}
      {...props}
    >
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <LinearGradient
          colors={[scoreColor, scoreColor + 'CC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.scoreGradient, { width: containerSize, height: containerSize, borderRadius: containerSize / 2 }]}
        >
          {/* Inner glow ring */}
          <View style={[styles.scoreInnerRing, { borderColor: 'rgba(255,255,255,0.3)' }]} />
          
          <Text style={[styles.scoreText, sizeStyles.text]}>
            {score}
          </Text>
          <Text style={[styles.scoreLabel, sizeStyles.label]}>
            {label}
          </Text>
        </LinearGradient>
      </Animated.View>
      
      {/* Outer glow */}
      <View
        style={[
          styles.scoreOuterGlow,
          { 
            backgroundColor: scoreColor,
            width: containerSize + 20,
            height: containerSize + 20,
            borderRadius: (containerSize + 20) / 2,
          }
        ]}
      />
    </Animatable.View>
  );
};

// Premium Loading Spinner with smooth rotation
export const LoadingSpinner = ({
  size = 40,
  color = theme.colors.primary,
  style,
  ...props
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    rotate.start();
    pulse.start();
    return () => {
      rotate.stop();
      pulse.stop();
    };
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.loadingContainer,
        {
          width: size,
          height: size,
          transform: [{ rotate: spin }, { scale: pulseAnim }],
        },
        style,
      ]}
      {...props}
    >
      <LinearGradient
        colors={[color, color + '40']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.loadingGradient, { width: size, height: size, borderRadius: size / 2 }]}
      />
      <View style={[styles.loadingInner, { width: size * 0.6, height: size * 0.6, borderRadius: size * 0.3 }]} />
    </Animated.View>
  );
};

// Premium Stats Card Component
export const StatsCard = ({
  value,
  label,
  icon,
  trend,
  style,
  ...props
}) => {
  return (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      style={[styles.statsCard, style]}
      {...props}
    >
      <View style={styles.statsContent}>
        {icon && <View style={styles.statsIcon}>{icon}</View>}
        <Text style={styles.statsValue}>{value}</Text>
        <Text style={styles.statsLabel}>{label}</Text>
        {trend && (
          <View style={[styles.statsTrend, trend > 0 && styles.statsTrendPositive]}>
            <Text style={styles.statsTrendText}>
              {trend > 0 ? `+${trend}%` : `${trend}%`}
            </Text>
          </View>
        )}
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  // Shimmer effect
  shimmerEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100,
    overflow: 'hidden',
  },

  // Button styles
  buttonContainer: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  buttonTouchable: {
    width: '100%',
  },
  buttonMedium: {
    borderRadius: theme.borderRadius.lg,
  },
  buttonLarge: {
    borderRadius: theme.borderRadius.xl,
  },
  buttonSmall: {
    borderRadius: theme.borderRadius.md,
  },
  gradientButton: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: theme.spacing.sm,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonTextMedium: {
    fontSize: 16,
  },
  buttonTextLarge: {
    fontSize: 18,
  },
  buttonTextSmall: {
    fontSize: 14,
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  // Glass card styles
  glassCardContainer: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.cardPremium,
  },
  glassCardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1.5,
    borderColor: 'transparent',
    zIndex: 1,
  },
  blurView: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  glassCardContent: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.glassPremium,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.borderPremium,
    overflow: 'hidden',
  },
  innerHighlight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.borderRadius.xl,
  },

  // Gradient card styles
  gradientCardContainer: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.cardPremium,
  },
  gradientCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  cardShimmer: {
    borderRadius: theme.borderRadius.xl,
  },

  // Feature card styles
  featureCardContainer: {
    marginBottom: theme.spacing.md,
  },
  featureCardTouchable: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.cardPremium,
  },
  featureCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    minHeight: 140,
    overflow: 'hidden',
  },
  featureGlow: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: theme.borderRadius.xl,
  },
  featureShimmer: {
    borderRadius: theme.borderRadius.xl,
  },
  featureInnerGlass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.borderRadius.xl,
  },
  featureCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  featureIconContainer: {
    marginBottom: theme.spacing.md,
  },
  featureIconInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  featureDescription: {
    color: theme.colors.white,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 20,
  },

  // Score display styles
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  scoreGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.glow,
  },
  scoreInnerRing: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 3,
    borderRadius: 999,
  },
  scoreText: {
    color: theme.colors.white,
    fontWeight: '800',
  },
  scoreLabel: {
    color: theme.colors.white,
    fontSize: 11,
    opacity: 0.9,
    marginTop: 2,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  scoreLarge: {
    text: { fontSize: 42 },
    label: { fontSize: 12 },
  },
  scoreSmall: {
    text: { fontSize: 28 },
    label: { fontSize: 10 },
  },
  scoreOuterGlow: {
    position: 'absolute',
    opacity: 0.2,
    zIndex: -1,
  },

  // Loading styles
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  loadingGradient: {
    position: 'absolute',
  },
  loadingInner: {
    backgroundColor: theme.colors.darkSecondary,
  },

  // Stats card styles
  statsCard: {
    backgroundColor: theme.colors.glassPremium,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.borderPremium,
    padding: theme.spacing.lg,
    ...theme.shadows.soft,
  },
  statsContent: {
    alignItems: 'center',
  },
  statsIcon: {
    marginBottom: theme.spacing.sm,
  },
  statsValue: {
    ...theme.typography.h2,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  statsLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  statsTrend: {
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.errorGlow,
  },
  statsTrendPositive: {
    backgroundColor: theme.colors.successGlow,
  },
  statsTrendText: {
    ...theme.typography.overline,
    color: theme.colors.white,
    fontSize: 11,
  },
});
