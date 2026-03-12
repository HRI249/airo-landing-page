import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../styles/theme';
import { GradientButton, GlassCard, ScoreDisplay } from '../components/UIComponents';
import GradientBackground from '../components/GradientBackground';

// Custom animations
const customAnimations = {
  smoothSlideUp: {
    from: { opacity: 0, translateY: 30 },
    to: { opacity: 1, translateY: 0 },
  },
  smoothFadeIn: {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1 },
  },
};

Animatable.initializeRegistryWithDefinitions(customAnimations);

const CalAIScreen = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanResult, setLastScanResult] = useState(null);

  const handleScanFood = () => {
    setIsScanning(true);
    navigation.navigate('Camera', {
      type: 'meal',
      onResult: (result) => {
        setLastScanResult(result);
        setIsScanning(false);
      }
    });
  };

  const handleViewResults = () => {
    if (lastScanResult) {
      navigation.navigate('Results', {
        data: lastScanResult,
        type: 'meal'
      });
    }
  };

  const mockFoodData = {
    healthScore: 85,
    calories: 420,
  };

  const features = [
    { 
      icon: 'health-and-safety', 
      title: 'Health Score', 
      description: 'Get an instant health rating from 0-100',
      color: theme.colors.success,
    },
    { 
      icon: 'local-fire-department', 
      title: 'Calorie Count', 
      description: 'Accurate calorie estimation for your meal',
      color: theme.colors.warning,
    },
    { 
      icon: 'analytics', 
      title: 'Macro Analysis', 
      description: 'Detailed breakdown of proteins, carbs & fats',
      color: theme.colors.primary,
    },
  ];

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            easing="ease-out-quart"
            style={styles.headerSection}
          >
            <GlassCard style={styles.headerCard} delay={0}>
              <View style={styles.headerContent}>
                <View style={styles.iconContainer}>
                  <LinearGradient
                    colors={theme.gradients.ocean}
                    style={styles.iconGradient}
                  >
                    <Icon name="camera-alt" size={40} color={theme.colors.white} />
                  </LinearGradient>
                </View>
                <Text style={styles.title}>Cal AI</Text>
                <Text style={styles.subtitle}>
                  Snap a photo of your meal to get instant health insights
                </Text>
              </View>
            </GlassCard>
          </Animatable.View>

          {/* Scan Button */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            delay={200}
            easing="ease-out-quart"
            style={styles.scanSection}
          >
            <GradientButton
              title={isScanning ? "Analyzing..." : "Scan Your Food"}
              onPress={handleScanFood}
              gradient={theme.gradients.ocean}
              size="large"
              loading={isScanning}
              icon={<Icon name="camera" size={22} color={theme.colors.white} />}
            />
          </Animatable.View>

          {/* Last Scan Results */}
          {lastScanResult && (
            <Animatable.View
              animation="smoothSlideUp"
              duration={800}
              style={styles.resultsSection}
            >
              <GlassCard style={styles.resultsCard} animated={false}>
                <Text style={styles.resultsTitle}>Last Scan Results</Text>
                <View style={styles.resultsContent}>
                  <ScoreDisplay
                    score={mockFoodData.healthScore}
                    label="Health Score"
                    color={theme.colors.success}
                    size="large"
                  />
                  <GlassCard style={styles.caloriesCard} animated={false}>
                    <View style={styles.caloriesContent}>
                      <Icon name="local-fire-department" size={24} color={theme.colors.warning} />
                      <Text style={styles.caloriesText}>{mockFoodData.calories}</Text>
                      <Text style={styles.caloriesLabel}>kcal</Text>
                    </View>
                  </GlassCard>
                </View>
                <GradientButton
                  title="View Details"
                  onPress={handleViewResults}
                  gradient={theme.gradients.sunset}
                  size="medium"
                  style={styles.viewResultsButton}
                />
              </GlassCard>
            </Animatable.View>
          )}

          {/* Features Section */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            delay={400}
            easing="ease-out-quart"
            style={styles.featuresSection}
          >
            <Text style={styles.sectionTitle}>What Cal AI Does</Text>
            <GlassCard style={styles.featuresList} animated={false}>
              {features.map((feature, index) => (
                <Animatable.View
                  key={feature.title}
                  animation="smoothFadeIn"
                  delay={500 + index * 100}
                  style={[
                    styles.featureItem,
                    index < features.length - 1 && styles.featureItemBorder,
                  ]}
                >
                  <View style={[styles.featureIconContainer, { backgroundColor: `${feature.color}20` }]}>
                    <Icon name={feature.icon} size={22} color={feature.color} />
                  </View>
                  <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                </Animatable.View>
              ))}
            </GlassCard>
          </Animatable.View>

          {/* Tips Section */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            delay={600}
            easing="ease-out-quart"
            style={styles.tipsSection}
          >
            <GlassCard style={styles.tipsCard} animated={false}>
              <View style={styles.tipsHeader}>
                <View style={styles.tipsIconContainer}>
                  <Icon name="photo-camera" size={22} color={theme.colors.accent} />
                </View>
                <Text style={styles.tipsTitle}>Photo Tips</Text>
              </View>
              <View style={styles.tipsList}>
                {[
                  'Ensure good lighting for clear photos',
                  'Capture the entire meal in frame',
                  'Avoid shadows and blurry images',
                ].map((tip, index) => (
                  <View key={index} style={styles.tipRow}>
                    <View style={styles.tipBullet} />
                    <Text style={styles.tipItem}>{tip}</Text>
                  </View>
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

  // Header
  headerSection: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  headerCard: {
    marginBottom: theme.spacing.md,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  iconContainer: {
    marginBottom: theme.spacing.lg,
    ...theme.shadows.glow,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.white,
    marginBottom: theme.spacing.sm,
    textShadowColor: 'rgba(0, 216, 160, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 16,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondaryLight,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
    lineHeight: 24,
  },

  // Scan button
  scanSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },

  // Results
  resultsSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  resultsCard: {
    padding: theme.spacing.xl,
  },
  resultsTitle: {
    ...theme.typography.h4,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  resultsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  caloriesCard: {
    padding: theme.spacing.lg,
  },
  caloriesContent: {
    alignItems: 'center',
  },
  caloriesText: {
    ...theme.typography.h2,
    color: theme.colors.white,
    marginTop: theme.spacing.sm,
  },
  caloriesLabel: {
    ...theme.typography.overline,
    color: theme.colors.textMuted,
  },
  viewResultsButton: {
    marginTop: theme.spacing.sm,
  },

  // Features
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
  featuresList: {
    padding: theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  featureItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderPremium,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    ...theme.typography.h4,
    color: theme.colors.white,
    marginBottom: 2,
  },
  featureDescription: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    lineHeight: 20,
  },

  // Tips
  tipsSection: {
    paddingHorizontal: theme.spacing.lg,
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
    borderRadius: 12,
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

export default CalAIScreen;
