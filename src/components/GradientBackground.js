import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

// Animated floating orb component
const FloatingOrb = ({ delay, size, color, startX, startY }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();

    // Gentle floating animation
    const floatY = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -30,
          duration: 4000 + Math.random() * 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 30,
          duration: 4000 + Math.random() * 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const floatX = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 20,
          duration: 5000 + Math.random() * 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -20,
          duration: 5000 + Math.random() * 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Breathing scale animation
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    floatY.start();
    floatX.start();
    breathe.start();

    return () => {
      floatY.stop();
      floatX.stop();
      breathe.stop();
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.orb,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          left: startX,
          top: startY,
          opacity,
          transform: [
            { translateY },
            { translateX },
            { scale },
          ],
        },
      ]}
    />
  );
};

// Shimmer line component
const ShimmerLine = ({ delay }) => {
  const translateX = useRef(new Animated.Value(-width)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: width * 2,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.3,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 2500,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.timing(translateX, {
          toValue: -width,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    shimmer.start();
    return () => shimmer.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.shimmerLine,
        {
          opacity,
          transform: [{ translateX }, { rotate: '25deg' }],
        },
      ]}
    />
  );
};

const GradientBackground = ({ children, style, variant = 'default' }) => {
  const gradientColors = variant === 'light' 
    ? theme.gradients.premiumLight 
    : theme.gradients.premiumDark;

  // Generate random positions for orbs
  const orbs = [
    { size: 200, color: 'rgba(0, 216, 160, 0.15)', startX: -50, startY: height * 0.1, delay: 0 },
    { size: 280, color: 'rgba(102, 126, 234, 0.12)', startX: width - 100, startY: height * 0.3, delay: 500 },
    { size: 160, color: 'rgba(255, 107, 157, 0.1)', startX: width * 0.3, startY: height * 0.6, delay: 1000 },
    { size: 220, color: 'rgba(0, 184, 148, 0.12)', startX: -30, startY: height * 0.7, delay: 1500 },
    { size: 180, color: 'rgba(118, 75, 162, 0.1)', startX: width * 0.6, startY: height * 0.15, delay: 800 },
  ];

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Animated floating orbs */}
        <View style={styles.orbContainer} pointerEvents="none">
          {orbs.map((orb, index) => (
            <FloatingOrb key={index} {...orb} />
          ))}
        </View>

        {/* Shimmer effects */}
        <View style={styles.shimmerContainer} pointerEvents="none">
          <ShimmerLine delay={0} />
          <ShimmerLine delay={4000} />
          <ShimmerLine delay={8000} />
        </View>

        {/* Mesh gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'transparent']}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 1, y: 0.7 }}
          style={styles.meshOverlay}
          pointerEvents="none"
        />

        {/* Vignette effect */}
        <View style={styles.vignette} pointerEvents="none" />

        {/* Content */}
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  orbContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    // Blur effect simulated with shadow
    shadowColor: 'rgba(0, 216, 160, 0.5)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 0,
  },
  shimmerContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  shimmerLine: {
    position: 'absolute',
    top: 0,
    width: 2,
    height: height * 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  meshOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderWidth: 80,
    borderColor: 'rgba(0,0,0,0.15)',
    borderRadius: 0,
  },
});

export default GradientBackground;
