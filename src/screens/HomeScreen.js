import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { theme, globalStyles } from '../styles/theme';
import { FeatureCard, GlassCard, StatsCard } from '../components/UIComponents';
import GradientBackground from '../components/GradientBackground';

const { width } = Dimensions.get('window');

// Custom animations for buttery smooth effects
const customAnimations = {
  smoothSlideUp: {
    from: { opacity: 0, translateY: 30 },
    to: { opacity: 1, translateY: 0 },
  },
  smoothFadeIn: {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1 },
  },
  floatIn: {
    from: { opacity: 0, translateY: 50, scale: 0.9 },
    to: { opacity: 1, translateY: 0, scale: 1 },
  },
};

// Register custom animations
Animatable.initializeRegistryWithDefinitions(customAnimations);

const HomeScreen = ({ navigation }) => {
  const features = [
    {
      id: 'cal-ai',
      title: 'Cal AI',
      description: 'Snap, scan, and know your food',
      icon: <Icon name="camera-alt" size={28} color={theme.colors.white} />,
      gradient: theme.gradients.ocean,
      onPress: () => navigation.navigate('Cal AI'),
    },
    {
      id: 'fridge-ai',
      title: 'Fridge AI',
      description: 'From fridge to table, effortlessly',
      icon: <Icon name="kitchen" size={28} color={theme.colors.white} />,
      gradient: theme.gradients.sunset,
      onPress: () => navigation.navigate('Fridge AI'),
    },
  ];

  const stats = [
    { value: '0', label: 'Meals Scanned', icon: <Icon name="restaurant" size={24} color={theme.colors.primary} /> },
    { value: '0', label: 'Recipes Made', icon: <Icon name="menu-book" size={24} color={theme.colors.secondary} /> },
    { value: '0', label: 'Calories', icon: <Icon name="local-fire-department" size={24} color={theme.colors.warning} /> },
  ];

  return (
    <GradientBackground>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          overScrollMode="always"
        >
          {/* Header Section */}
          <Animatable.View
            animation="floatIn"
            duration={1000}
            easing="ease-out-quart"
            style={styles.headerSection}
          >
            <GlassCard style={styles.headerCard} delay={0}>
              <View style={styles.headerContent}>
                {/* Premium logo container with glow */}
                <View style={styles.logoContainer}>
                  <View style={styles.logoGlow} />
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    duration={3000}
                    easing="ease-in-out"
                    style={styles.logoInner}
                  >
                    <Icon name="eco" size={42} color={theme.colors.primary} />
                  </Animatable.View>
                </View>
                
                <Animatable.Text
                  animation="fadeIn"
                  delay={300}
                  style={styles.appTitle}
                >
                  Airo
                </Animatable.Text>
                
                <Animatable.Text 
                  animation="fadeIn" 
                  delay={400}
                  style={styles.tagline}
                >
                  Nutrition Intelligence, Reimagined
                </Animatable.Text>
                
                <Animatable.Text 
                  animation="fadeIn" 
                  delay={500}
                  style={styles.subtitle}
                >
                  Healthy meals, smarter planning
                </Animatable.Text>
              </View>
            </GlassCard>
          </Animatable.View>

          {/* Features Section */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={1000}
            delay={200}
            easing="ease-out-quart"
            style={styles.featuresSection}
          >
            <Text style={styles.sectionTitle}>Choose Your AI Assistant</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <Animatable.View
                  key={feature.id}
                  animation="smoothSlideUp"
                  duration={800}
                  delay={400 + index * 150}
                  easing="ease-out-quart"
                  style={styles.featureWrapper}
                >
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    gradient={feature.gradient}
                    onPress={feature.onPress}
                    style={styles.featureCard}
                  />
                </Animatable.View>
              ))}
            </View>
          </Animatable.View>

          {/* Stats Section */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={1000}
            delay={500}
            easing="ease-out-quart"
            style={styles.statsSection}
          >
            <Text style={styles.sectionTitle}>Your Journey</Text>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <Animatable.View
                  key={index}
                  animation="smoothFadeIn"
                  duration={600}
                  delay={600 + index * 100}
                  easing="ease-out-quart"
                  style={styles.statItem}
                >
                  <GlassCard style={styles.statCard} animated={false}>
                    <View style={styles.statContent}>
                      <View style={styles.statIconContainer}>
                        {stat.icon}
                      </View>
                      <Text style={styles.statNumber}>{stat.value}</Text>
                      <Text style={styles.statLabel}>{stat.label}</Text>
                    </View>
                  </GlassCard>
                </Animatable.View>
              ))}
            </View>
          </Animatable.View>

          {/* Quick Tips Section */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={1000}
            delay={700}
            easing="ease-out-quart"
            style={styles.tipsSection}
          >
            <GlassCard style={styles.tipsCard} delay={800}>
              <View style={styles.tipsHeader}>
                <View style={styles.tipsIconContainer}>
                  <Icon name="lightbulb" size={24} color={theme.colors.accent} />
                </View>
                <Text style={styles.tipsTitle}>Quick Tips</Text>
              </View>
              <View style={styles.tipsList}>
                {[
                  'Take clear photos with good lighting for better AI analysis',
                  'Include all ingredients in your fridge photos',
                  'Use Cal AI to track your daily nutrition goals',
                ].map((tip, index) => (
                  <Animatable.View
                    key={index}
                    animation="fadeIn"
                    delay={900 + index * 100}
                    style={styles.tipRow}
                  >
                    <View style={styles.tipBullet} />
                    <Text style={styles.tipItem}>{tip}</Text>
                  </Animatable.View>
                ))}
              </View>
            </GlassCard>
          </Animatable.View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxxl,
  },
  
  // Header styles
  headerSection: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
  },
  headerCard: {
    marginBottom: theme.spacing.md,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: theme.spacing.lg,
  },
  logoGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    opacity: 0.2,
    left: -15,
    top: -15,
  },
  logoInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 216, 160, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(0, 216, 160, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    ...theme.typography.display,
    fontSize: 52,
    color: theme.colors.white,
    textShadowColor: 'rgba(0, 216, 160, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 20,
    marginBottom: theme.spacing.sm,
    letterSpacing: -2,
  },
  tagline: {
    ...theme.typography.h4,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
    fontWeight: '600',
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondaryLight,
    textAlign: 'center',
    opacity: 0.8,
  },

  // Features styles
  featuresSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  featureWrapper: {
    flex: 1,
  },
  featureCard: {
    minHeight: 170,
  },

  // Stats styles
  statsSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  statItem: {
    flex: 1,
  },
  statCard: {
    padding: theme.spacing.md,
  },
  statContent: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  statNumber: {
    ...theme.typography.h2,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.overline,
    color: theme.colors.textMuted,
    textAlign: 'center',
    fontSize: 10,
  },

  // Tips styles
  tipsSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  tipsCard: {
    padding: theme.spacing.xl,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  tipsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 224, 102, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  tipsTitle: {
    ...theme.typography.h4,
    color: theme.colors.white,
  },
  tipsList: {
    gap: theme.spacing.md,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginTop: 8,
    marginRight: theme.spacing.md,
  },
  tipItem: {
    ...theme.typography.body,
    color: theme.colors.textSecondaryLight,
    flex: 1,
    lineHeight: 22,
  },
});

export default HomeScreen;
