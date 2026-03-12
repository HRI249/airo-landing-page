import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import GradientBackground from '../components/GradientBackground';
import { GlassCard, GradientButton } from '../components/UIComponents';
import { theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

// Custom animations
const customAnimations = {
  smoothSlideUp: {
    from: { opacity: 0, translateY: 40 },
    to: { opacity: 1, translateY: 0 },
  },
  floatIn: {
    from: { opacity: 0, translateY: 60, scale: 0.9 },
    to: { opacity: 1, translateY: 0, scale: 1 },
  },
  glowPulse: {
    0: { opacity: 0.6, scale: 1 },
    0.5: { opacity: 1, scale: 1.05 },
    1: { opacity: 0.6, scale: 1 },
  },
};

Animatable.initializeRegistryWithDefinitions(customAnimations);

const LandingScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Onboarding');
  };

  const features = [
    {
      icon: 'camera-alt',
      title: 'Cal AI',
      description: 'Snap a photo of any meal. Get instant calorie counts, macro breakdowns, and health scores.',
      color: theme.colors.secondary,
      gradient: theme.gradients.sunset,
    },
    {
      icon: 'kitchen',
      title: 'Fridge AI',
      description: "Don't know what to cook? Scan your ingredients and let AI generate chef-quality recipes.",
      color: theme.colors.primary,
      gradient: theme.gradients.ocean,
    },
    {
      icon: 'insights',
      title: 'Smart Insights',
      description: 'Track your progress with beautiful charts and personalized health recommendations.',
      color: theme.colors.accent,
      gradient: theme.gradients.aurora,
    },
  ];

  return (
    <GradientBackground>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero Section */}
        <Animatable.View
          animation="floatIn"
          duration={1200}
          easing="ease-out-quart"
          style={styles.heroSection}
        >
          {/* Premium Logo */}
          <View style={styles.logoContainer}>
            <Animatable.View
              animation="glowPulse"
              iterationCount="infinite"
              duration={3000}
              style={styles.logoGlow}
            />
            <LinearGradient
              colors={[theme.colors.white, 'rgba(255,255,255,0.7)']}
              style={styles.logoCircle}
            >
              <Icon name="eco" size={70} color={theme.colors.primary} />
            </LinearGradient>
          </View>

          <Animatable.Text
            animation="fadeIn"
            delay={300}
            duration={800}
            style={styles.heroTitle}
          >
            Airo
          </Animatable.Text>
          
          <Animatable.Text
            animation="fadeIn"
            delay={500}
            duration={800}
            style={styles.heroTagline}
          >
            Nutrition Intelligence,{'\n'}Reimagined.
          </Animatable.Text>
        </Animatable.View>

        {/* Features */}
        {features.map((feature, index) => (
          <Animatable.View
            key={feature.title}
            animation="smoothSlideUp"
            delay={700 + index * 200}
            duration={800}
            easing="ease-out-quart"
            style={styles.featureSection}
          >
            <GlassCard style={styles.featureCard} animated={false}>
              {/* Inner gradient accent */}
              <LinearGradient
                colors={['rgba(255,255,255,0.1)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.featureInnerGradient}
              />
              
              <View style={styles.featureHeader}>
                <LinearGradient
                  colors={feature.gradient}
                  style={styles.featureIconBox}
                >
                  <Icon name={feature.icon} size={28} color={theme.colors.white} />
                </LinearGradient>
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </View>
              
              <Text style={styles.featureDescription}>{feature.description}</Text>
              
              {/* Visual element for some features */}
              {index === 0 && (
                <View style={styles.featureVisual}>
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    duration={2000}
                    style={styles.scanLineContainer}
                  >
                    <View style={styles.scanLine} />
                  </Animatable.View>
                  <Icon name="fastfood" size={50} color="rgba(255,255,255,0.6)" />
                </View>
              )}
              
              {index === 1 && (
                <View style={styles.featureVisual}>
                  <View style={styles.recipeIcons}>
                    <Icon name="restaurant-menu" size={40} color="rgba(255,255,255,0.6)" />
                    <Icon name="auto-awesome" size={24} color={theme.colors.accent} style={styles.sparkle} />
                  </View>
                </View>
              )}
            </GlassCard>
          </Animatable.View>
        ))}

        {/* Trust indicators */}
        <Animatable.View
          animation="fadeIn"
          delay={1500}
          duration={800}
          style={styles.trustSection}
        >
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Icon name="verified" size={20} color={theme.colors.success} />
              <Text style={styles.trustText}>AI Powered</Text>
            </View>
            <View style={styles.trustDivider} />
            <View style={styles.trustItem}>
              <Icon name="lock" size={20} color={theme.colors.primary} />
              <Text style={styles.trustText}>Private & Secure</Text>
            </View>
            <View style={styles.trustDivider} />
            <View style={styles.trustItem}>
              <Icon name="bolt" size={20} color={theme.colors.warning} />
              <Text style={styles.trustText}>Instant Results</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Spacer for bottom CTA */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky Bottom CTA */}
      <Animatable.View
        animation="bounceInUp"
        delay={1800}
        duration={1000}
        style={styles.bottomContainer}
      >
        <GlassCard style={styles.bottomCard} blurAmount={25} animated={false}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={theme.gradients.buttonPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <View style={styles.buttonArrow}>
                <Icon name="arrow-forward" size={22} color={theme.colors.white} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </GlassCard>
      </Animatable.View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: height * 0.08,
    paddingBottom: 40,
    paddingHorizontal: theme.spacing.lg,
  },

  // Hero
  heroSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logoContainer: {
    marginBottom: theme.spacing.xl,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: theme.colors.primary,
    opacity: 0.3,
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.cardPremium,
  },
  heroTitle: {
    fontSize: 56,
    fontWeight: '900',
    color: theme.colors.white,
    letterSpacing: -2,
    textShadowColor: 'rgba(0, 216, 160, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 20,
    marginBottom: theme.spacing.md,
  },
  heroTagline: {
    fontSize: 22,
    color: theme.colors.white,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 32,
    fontWeight: '500',
  },

  // Features
  featureSection: {
    marginBottom: theme.spacing.lg,
  },
  featureCard: {
    padding: theme.spacing.xl,
    overflow: 'hidden',
  },
  featureInnerGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.borderRadius.xl,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  featureIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
    ...theme.shadows.md,
  },
  featureTitle: {
    ...theme.typography.h3,
    color: theme.colors.white,
    fontWeight: '700',
  },
  featureDescription: {
    ...theme.typography.body,
    color: theme.colors.textSecondaryLight,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
  },
  featureVisual: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  scanLineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  scanLine: {
    height: 2,
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  recipeIcons: {
    position: 'relative',
  },
  sparkle: {
    position: 'absolute',
    top: -8,
    right: -8,
  },

  // Trust
  trustSection: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  trustText: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  trustDivider: {
    width: 1,
    height: 16,
    backgroundColor: theme.colors.borderPremium,
    marginHorizontal: theme.spacing.md,
  },

  // Bottom CTA
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.lg,
  },
  bottomCard: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.xxl,
  },
  getStartedButton: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.glow,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: theme.borderRadius.xl,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.white,
    marginRight: theme.spacing.md,
    letterSpacing: 0.5,
  },
  buttonArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LandingScreen;
