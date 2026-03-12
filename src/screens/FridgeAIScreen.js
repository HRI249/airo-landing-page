import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import GradientBackground from '../components/GradientBackground';
import { GlassCard, GradientButton } from '../components/UIComponents';
import { theme } from '../styles/theme';

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

const FridgeAIScreen = ({ navigation }) => {
  const recentScans = [
    { id: 1, date: 'Today, 10:30 AM', items: 'Eggs, Milk, Spinach', icon: 'egg' },
    { id: 2, date: 'Yesterday, 6:15 PM', items: 'Chicken, Rice, Peppers', icon: 'restaurant' },
  ];

  const quickSuggestions = [
    { id: 1, title: 'Breakfast Ideas', icon: 'free-breakfast', color: theme.colors.warning },
    { id: 2, title: 'Quick Lunch', icon: 'lunch-dining', color: theme.colors.primary },
    { id: 3, title: 'Healthy Dinner', icon: 'dinner-dining', color: theme.colors.secondary },
  ];

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            easing="ease-out-quart"
            style={styles.header}
          >
            <GlassCard style={styles.headerCard} delay={0}>
              <View style={styles.headerContent}>
                <View style={styles.iconContainer}>
                  <LinearGradient
                    colors={theme.gradients.sunset}
                    style={styles.iconGradient}
                  >
                    <Icon name="kitchen" size={40} color={theme.colors.white} />
                  </LinearGradient>
                </View>
                <Text style={styles.title}>Fridge AI</Text>
                <Text style={styles.subtitle}>
                  What's in your kitchen? Let's cook something amazing!
                </Text>
              </View>
            </GlassCard>
          </Animatable.View>

          {/* Scan Section */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            delay={200}
            easing="ease-out-quart"
            style={styles.scanSection}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Camera', { type: 'fridge' })}
            >
              <GlassCard style={styles.scanCard} animated={false}>
                {/* Animated dashed border effect */}
                <View style={styles.dashedBorder}>
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    duration={2000}
                    style={styles.scanIconContainer}
                  >
                    <LinearGradient
                      colors={theme.gradients.ocean}
                      style={styles.scanIconGradient}
                    >
                      <Icon name="add-a-photo" size={36} color={theme.colors.white} />
                    </LinearGradient>
                  </Animatable.View>
                  <Text style={styles.scanText}>Scan Your Fridge</Text>
                  <Text style={styles.scanSubtext}>
                    Take a photo of your open fridge or pantry
                  </Text>
                  
                  <View style={styles.scanHints}>
                    <View style={styles.hintItem}>
                      <Icon name="lightbulb" size={14} color={theme.colors.accent} />
                      <Text style={styles.hintText}>AI will detect your ingredients</Text>
                    </View>
                  </View>
                </View>
              </GlassCard>
            </TouchableOpacity>
          </Animatable.View>

          {/* Quick Suggestions */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            delay={400}
            easing="ease-out-quart"
            style={styles.suggestionsSection}
          >
            <Text style={styles.sectionTitle}>Quick Suggestions</Text>
            <View style={styles.suggestionsRow}>
              {quickSuggestions.map((suggestion, index) => (
                <Animatable.View
                  key={suggestion.id}
                  animation="smoothFadeIn"
                  delay={500 + index * 100}
                  style={styles.suggestionCard}
                >
                  <TouchableOpacity activeOpacity={0.8}>
                    <GlassCard style={styles.suggestionCardInner} animated={false}>
                      <View style={[styles.suggestionIcon, { backgroundColor: `${suggestion.color}20` }]}>
                        <Icon name={suggestion.icon} size={24} color={suggestion.color} />
                      </View>
                      <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                    </GlassCard>
                  </TouchableOpacity>
                </Animatable.View>
              ))}
            </View>
          </Animatable.View>

          {/* Recent Scans */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            delay={600}
            easing="ease-out-quart"
            style={styles.recentSection}
          >
            <Text style={styles.sectionTitle}>Recent Scans</Text>
            {recentScans.map((scan, index) => (
              <Animatable.View
                key={scan.id}
                animation="smoothFadeIn"
                delay={700 + index * 100}
              >
                <TouchableOpacity activeOpacity={0.8}>
                  <GlassCard style={styles.recentCard} animated={false}>
                    <View style={styles.recentRow}>
                      <View style={styles.recentIconContainer}>
                        <LinearGradient
                          colors={theme.gradients.nature}
                          style={styles.recentIconGradient}
                        >
                          <Icon name="history" size={20} color={theme.colors.white} />
                        </LinearGradient>
                      </View>
                      <View style={styles.recentInfo}>
                        <Text style={styles.recentDate}>{scan.date}</Text>
                        <Text style={styles.recentItems}>{scan.items}</Text>
                      </View>
                      <View style={styles.recentArrow}>
                        <Icon name="chevron-right" size={22} color={theme.colors.textMuted} />
                      </View>
                    </View>
                  </GlassCard>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </Animatable.View>

          {/* Tips */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            delay={800}
            easing="ease-out-quart"
            style={styles.tipsSection}
          >
            <GlassCard style={styles.tipsCard} animated={false}>
              <View style={styles.tipsHeader}>
                <Icon name="tips-and-updates" size={22} color={theme.colors.accent} />
                <Text style={styles.tipsTitle}>Pro Tips</Text>
              </View>
              <View style={styles.tipsList}>
                {[
                  'Open all compartments for best results',
                  'Good lighting helps AI detect items better',
                  'Include your pantry for more recipe options',
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
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl + 20,
  },

  // Header
  header: {
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.md,
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
    textShadowColor: 'rgba(255, 107, 157, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 16,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondaryLight,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.md,
    lineHeight: 24,
  },

  // Scan section
  scanSection: {
    marginBottom: theme.spacing.xl,
  },
  scanCard: {
    padding: theme.spacing.md,
  },
  dashedBorder: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.borderLight,
    borderStyle: 'dashed',
    borderRadius: theme.borderRadius.lg,
  },
  scanIconContainer: {
    marginBottom: theme.spacing.lg,
  },
  scanIconGradient: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.glow,
  },
  scanText: {
    ...theme.typography.h3,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  scanSubtext: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  scanHints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  hintText: {
    ...theme.typography.caption,
    color: theme.colors.accent,
    fontSize: 12,
  },

  // Suggestions
  suggestionsSection: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h4,
    color: theme.colors.white,
    marginBottom: theme.spacing.md,
  },
  suggestionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  suggestionCard: {
    flex: 1,
  },
  suggestionCardInner: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  suggestionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  suggestionTitle: {
    ...theme.typography.caption,
    color: theme.colors.white,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
  },

  // Recent scans
  recentSection: {
    marginBottom: theme.spacing.xl,
  },
  recentCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentIconContainer: {
    marginRight: theme.spacing.md,
  },
  recentIconGradient: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentInfo: {
    flex: 1,
  },
  recentDate: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.white,
    marginBottom: 2,
  },
  recentItems: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  recentArrow: {
    marginLeft: theme.spacing.sm,
  },

  // Tips
  tipsSection: {
    marginBottom: theme.spacing.lg,
  },
  tipsCard: {
    padding: theme.spacing.xl,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
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

export default FridgeAIScreen;
