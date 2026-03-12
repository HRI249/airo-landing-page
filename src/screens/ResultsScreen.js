import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import GradientBackground from '../components/GradientBackground';
import { GlassCard, ScoreDisplay, GradientButton } from '../components/UIComponents';
import { theme } from '../styles/theme';

// Custom animations
const customAnimations = {
  smoothSlideUp: {
    from: { opacity: 0, translateY: 40 },
    to: { opacity: 1, translateY: 0 },
  },
  pulseGlow: {
    0: { opacity: 0.5, scale: 1 },
    0.5: { opacity: 1, scale: 1.05 },
    1: { opacity: 0.5, scale: 1 },
  },
};

Animatable.initializeRegistryWithDefinitions(customAnimations);

// Premium loading animation
const PremiumLoader = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const rotate = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 1000,
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

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View
        style={[
          styles.loaderOuter,
          {
            opacity,
            transform: [{ rotate: spin }, { scale }],
          },
        ]}
      >
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryLight, theme.colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.loaderGradient}
        />
      </Animated.View>
      <View style={styles.loaderInner}>
        <Icon name="psychology" size={32} color={theme.colors.primary} />
      </View>
      <Animatable.Text
        animation="pulse"
        iterationCount="infinite"
        duration={2000}
        style={styles.loaderText}
      >
        AI is analyzing...
      </Animatable.Text>
    </View>
  );
};

const ResultsScreen = ({ navigation, route }) => {
  const { type } = route.params || { type: 'meal' };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const renderMealResults = () => (
    <Animatable.View animation="smoothSlideUp" duration={800} style={styles.resultsContainer}>
      {/* Score Section */}
      <View style={styles.scoreRow}>
        <Animatable.View animation="bounceIn" delay={200}>
          <ScoreDisplay score={85} label="Health Score" size="large" />
        </Animatable.View>
        
        <Animatable.View animation="bounceIn" delay={400}>
          <GlassCard style={styles.caloriesCard} animated={false}>
            <View style={styles.caloriesContent}>
              <Icon name="local-fire-department" size={28} color={theme.colors.warning} />
              <Text style={styles.caloriesValue}>450</Text>
              <Text style={styles.caloriesLabel}>kcal</Text>
            </View>
          </GlassCard>
        </Animatable.View>
      </View>

      {/* Macros Card */}
      <Animatable.View animation="smoothSlideUp" delay={500}>
        <GlassCard style={styles.detailsCard} animated={false}>
          <View style={styles.cardHeader}>
            <Icon name="analytics" size={24} color={theme.colors.primary} />
            <Text style={styles.cardTitle}>Nutritional Breakdown</Text>
          </View>
          
          <View style={styles.macroRow}>
            {[
              { value: '25g', label: 'Protein', color: theme.colors.primary, icon: 'fitness-center' },
              { value: '45g', label: 'Carbs', color: theme.colors.warning, icon: 'grain' },
              { value: '18g', label: 'Fats', color: theme.colors.secondary, icon: 'opacity' },
            ].map((macro, index) => (
              <Animatable.View
                key={macro.label}
                animation="fadeIn"
                delay={700 + index * 100}
                style={styles.macroItem}
              >
                <View style={[styles.macroIconContainer, { backgroundColor: `${macro.color}20` }]}>
                  <Icon name={macro.icon} size={20} color={macro.color} />
                </View>
                <Text style={[styles.macroValue, { color: macro.color }]}>{macro.value}</Text>
                <Text style={styles.macroLabel}>{macro.label}</Text>
              </Animatable.View>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.analysisText}>
            This meal is balanced with a good source of protein. The vegetables provide essential vitamins and minerals for optimal health.
          </Text>
        </GlassCard>
      </Animatable.View>

      {/* Recommendations */}
      <Animatable.View animation="smoothSlideUp" delay={800}>
        <GlassCard style={styles.recommendationsCard} animated={false}>
          <View style={styles.cardHeader}>
            <Icon name="lightbulb" size={24} color={theme.colors.accent} />
            <Text style={styles.cardTitle}>AI Recommendations</Text>
          </View>
          
          <View style={styles.recommendationsList}>
            {[
              'Add more leafy greens for fiber',
              'Consider reducing sodium intake',
              'Great protein-to-calorie ratio!',
            ].map((rec, index) => (
              <View key={index} style={styles.recommendationItem}>
                <View style={styles.recBullet}>
                  <Icon name="check" size={14} color={theme.colors.success} />
                </View>
                <Text style={styles.recommendationText}>{rec}</Text>
              </View>
            ))}
          </View>
        </GlassCard>
      </Animatable.View>
    </Animatable.View>
  );

  const renderFridgeResults = () => (
    <Animatable.View animation="smoothSlideUp" duration={800}>
      <Text style={styles.sectionTitle}>Suggested Meals</Text>

      {[
        {
          title: 'Healthy Salad Bowl',
          time: '15 mins',
          calories: '320 kcal',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
          description: 'Fresh garden salad with mixed greens, cherry tomatoes, and feta cheese.',
          gradient: theme.gradients.nature,
        },
        {
          title: 'Veggie Stir Fry',
          time: '20 mins',
          calories: '410 kcal',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
          description: 'Colorful vegetables stir-fried with aromatic Asian spices.',
          gradient: theme.gradients.sunset,
        },
      ].map((recipe, index) => (
        <Animatable.View
          key={index}
          animation="smoothSlideUp"
          delay={300 + index * 200}
        >
          <GlassCard style={styles.recipeCard} animated={false}>
            <View style={styles.recipeHeader}>
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
              />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View style={styles.recipeMeta}>
                  <View style={styles.metaItem}>
                    <Icon name="schedule" size={14} color={theme.colors.textMuted} />
                    <Text style={styles.metaText}>{recipe.time}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Icon name="local-fire-department" size={14} color={theme.colors.warning} />
                    <Text style={styles.metaText}>{recipe.calories}</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <Text style={styles.recipeDescription}>{recipe.description}</Text>
            
            <GradientButton
              title="View Recipe"
              onPress={() => {}}
              gradient={recipe.gradient}
              size="small"
              style={styles.recipeButton}
            />
          </GlassCard>
        </Animatable.View>
      ))}
    </Animatable.View>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Premium Header */}
        <Animatable.View animation="fadeInDown" duration={600} style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Home')} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
              style={styles.backButtonGradient}
            >
              <Icon name="arrow-back" size={22} color={theme.colors.white} />
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              {type === 'meal' ? 'Meal Analysis' : 'Meal Suggestions'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {type === 'meal' ? 'Powered by AI' : 'Based on your ingredients'}
            </Text>
          </View>
          
          <View style={{ width: 44 }} />
        </Animatable.View>

        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <PremiumLoader />
          ) : (
            type === 'meal' ? renderMealResults() : renderFridgeResults()
          )}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  backButton: {
    borderRadius: 22,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  backButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderPremium,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    ...theme.typography.h4,
    color: theme.colors.white,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    ...theme.typography.overline,
    color: theme.colors.primary,
    marginTop: 2,
  },

  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },

  // Loader styles
  loaderContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    ...theme.shadows.glow,
  },
  loaderGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  loaderInner: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.darkSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    top: 'auto',
  },
  loaderText: {
    ...theme.typography.h4,
    color: theme.colors.white,
    marginTop: theme.spacing.xl,
    opacity: 0.8,
  },

  // Results styles
  resultsContainer: {
    gap: theme.spacing.lg,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  caloriesCard: {
    padding: theme.spacing.lg,
  },
  caloriesContent: {
    alignItems: 'center',
  },
  caloriesValue: {
    ...theme.typography.h1,
    color: theme.colors.white,
    marginTop: theme.spacing.sm,
  },
  caloriesLabel: {
    ...theme.typography.overline,
    color: theme.colors.textMuted,
  },

  // Details card
  detailsCard: {
    padding: theme.spacing.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    ...theme.typography.h4,
    color: theme.colors.white,
    marginLeft: theme.spacing.md,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  macroItem: {
    flex: 1,
    alignItems: 'center',
  },
  macroIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  macroValue: {
    ...theme.typography.h3,
    fontWeight: '700',
    marginBottom: 2,
  },
  macroLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderPremium,
    marginBottom: theme.spacing.lg,
  },
  analysisText: {
    ...theme.typography.body,
    color: theme.colors.textSecondaryLight,
    lineHeight: 24,
  },

  // Recommendations
  recommendationsCard: {
    padding: theme.spacing.xl,
  },
  recommendationsList: {
    gap: theme.spacing.md,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: `${theme.colors.success}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  recommendationText: {
    ...theme.typography.body,
    color: theme.colors.textSecondaryLight,
    flex: 1,
  },

  // Fridge results styles
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.white,
    marginBottom: theme.spacing.lg,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  recipeCard: {
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
  },
  recipeHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  recipeImage: {
    width: 90,
    height: 90,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.md,
  },
  recipeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recipeTitle: {
    ...theme.typography.h4,
    color: theme.colors.white,
    marginBottom: theme.spacing.sm,
  },
  recipeMeta: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  recipeDescription: {
    ...theme.typography.body,
    color: theme.colors.textSecondaryLight,
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  recipeButton: {
    marginTop: 0,
  },
});

export default ResultsScreen;
