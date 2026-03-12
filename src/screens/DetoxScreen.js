import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Vibration,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';
import { GlassCard } from '../components/UIComponents';
import GradientBackground from '../components/GradientBackground';

const { width } = Dimensions.get('window');

// Custom animations
const customAnimations = {
  smoothSlideUp: {
    from: { opacity: 0, translateY: 30 },
    to: { opacity: 1, translateY: 0 },
  },
  smoothFadeIn: {
    from: { opacity: 0, scale: 0.96 },
    to: { opacity: 1, scale: 1 },
  },
  breathe: {
    0: { scale: 1 },
    0.5: { scale: 1.05 },
    1: { scale: 1 },
  },
};

Animatable.initializeRegistryWithDefinitions(customAnimations);

// Premium animated character component
const AnimatedCharacter = ({ health }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0.3)).current;
  
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 0.6,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.3,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();
    glow.start();

    return () => {
      pulse.stop();
      glow.stop();
    };
  }, []);

  const healthColor = health > 0.8 ? theme.colors.success : 
                      health > 0.5 ? theme.colors.warning : theme.colors.error;

  return (
    <View style={styles.characterWrapper}>
      {/* Outer glow */}
      <Animated.View
        style={[
          styles.characterGlow,
          {
            opacity: glowOpacity,
            backgroundColor: healthColor,
          },
        ]}
      />
      
      {/* Main character container */}
      <Animated.View
        style={[
          styles.characterContainer,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
          style={styles.characterGradient}
        >
          <Icon name="psychology" size={80} color={healthColor} />
          
          {/* Status indicator */}
          <Animatable.View
            animation="breathe"
            iterationCount="infinite"
            duration={2000}
            style={[styles.statusIndicator, { backgroundColor: healthColor }]}
          />
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

// Premium score display
const ScoreDisplay = ({ score, label }) => {
  const countAnim = useRef(new Animated.Value(0)).current;
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    Animated.timing(countAnim, {
      toValue: score,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    countAnim.addListener(({ value }) => {
      setDisplayScore(Math.round(value));
    });

    return () => countAnim.removeAllListeners();
  }, [score]);

  const scoreColor = score > 80 ? theme.colors.success : 
                     score > 50 ? theme.colors.warning : theme.colors.error;

  return (
    <View style={styles.scoreContainer}>
      <Text style={[styles.scoreValue, { color: scoreColor }]}>{displayScore}</Text>
      <Text style={styles.scoreLabel}>{label}</Text>
    </View>
  );
};

const DetoxScreen = () => {
  const [personality, setPersonality] = useState('Bestie');
  const [isBlockingEnabled, setIsBlockingEnabled] = useState(true);
  const [rouletteEnabled, setRouletteEnabled] = useState(false);
  const [flashbangEnabled, setFlashbangEnabled] = useState(false);

  // Mock Data
  const brainHealth = 0.92;
  const screenTime = '2h 23m';
  const pickups = 65;
  
  const offenders = [
    { name: 'YouTube', time: '58m', icon: 'play-circle-filled', color: '#FF0000', gradient: ['#FF0000', '#CC0000'] },
    { name: 'Instagram', time: '58m', icon: 'photo-camera', color: '#C13584', gradient: ['#C13584', '#E1306C'] },
    { name: 'X', time: '26m', icon: 'close', color: '#1DA1F2', gradient: ['#1DA1F2', '#0D8BD9'] },
  ];

  const personalities = [
    { id: 'Drill Sergeant', icon: 'military-tech', color: theme.colors.error },
    { id: 'Grandma', icon: 'elderly', color: theme.colors.accent },
    { id: 'Bestie', icon: 'favorite', color: theme.colors.secondary },
  ];

  const getPersonalityMessage = () => {
    switch (personality) {
      case 'Drill Sergeant': return "Drop and give me 20! That screen time is higher than your productivity!";
      case 'Grandma': return "Oh sweetie, maybe rest your eyes a bit? Have you eaten today?";
      case 'Bestie': return "It's giving 'I need a break' energy. Let's touch some grass bestie 💅";
      default: return "Stay focused!";
    }
  };

  const cyclePersonality = () => {
    const modes = ['Drill Sergeant', 'Grandma', 'Bestie'];
    const currentIndex = modes.indexOf(personality);
    setPersonality(modes[(currentIndex + 1) % modes.length]);
  };

  const handleAppPress = (appName) => {
    if (!isBlockingEnabled) {
      Alert.alert("Access Granted", `Opening ${appName}...`);
      return;
    }

    if (flashbangEnabled) {
      Vibration.vibrate([0, 500, 200, 500]);
      Alert.alert(
        "🔊 FLASHBANG ACTIVATED 🔊",
        "Your attempt has been logged. Stay focused!",
        [{ text: "I'll be better!", style: "destructive" }]
      );
      return;
    }

    if (rouletteEnabled) {
      const risk = Math.random();
      if (risk < 0.5) {
        const messages = ["I'm trying to be more productive", "Screen time break!", "Digital wellness matters"];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        Alert.alert(
          "🎲 ROULETTE RESULT 🎲",
          `Close call! Your wellness reminder: "${randomMsg}"`,
          [{ text: "Thanks for the save!", style: "destructive" }]
        );
      } else {
        Alert.alert("🍀 LUCKY", `You won this round. Opening ${appName}...`);
      }
      return;
    }

    Alert.alert("Blocked", `${personality} says: Focus mode is ON! 💪`);
  };

  const currentPersonality = personalities.find(p => p.id === personality);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animatable.View animation="fadeInDown" duration={800} style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>Brainrot</Text>
              <Text style={styles.headerSubtitle}>Digital Wellness</Text>
            </View>
            
            <TouchableOpacity 
              onPress={cyclePersonality} 
              style={styles.personalityButton}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
                style={styles.personalityButtonGradient}
              >
                <Icon name={currentPersonality?.icon} size={18} color={currentPersonality?.color} />
                <Text style={styles.personalityText}>{personality}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>

          {/* Character */}
          <Animatable.View animation="bounceIn" duration={1200} delay={200}>
            <AnimatedCharacter health={brainHealth} />
          </Animatable.View>

          {/* Score */}
          <Animatable.View animation="smoothFadeIn" delay={400}>
            <ScoreDisplay score={Math.round(brainHealth * 100)} label="Brain Health" />
          </Animatable.View>

          {/* Health Bar */}
          <Animatable.View animation="smoothSlideUp" delay={500} style={styles.healthBarSection}>
            <View style={styles.healthBarContainer}>
              <ProgressBar
                progress={brainHealth}
                color={brainHealth > 0.8 ? theme.colors.success : theme.colors.warning}
                style={styles.progressBar}
              />
            </View>
            <View style={styles.healthLabels}>
              <Text style={styles.healthLabel}>Unhealthy</Text>
              <Text style={styles.healthLabel}>Healthy</Text>
            </View>
          </Animatable.View>

          {/* Personality Message */}
          <Animatable.View animation="smoothSlideUp" delay={600}>
            <GlassCard style={styles.messageCard} animated={false}>
              <View style={styles.messageHeader}>
                <Icon name="chat-bubble" size={20} color={theme.colors.primary} />
                <Text style={styles.messageLabel}>{personality} says:</Text>
              </View>
              <Text style={styles.messageText}>"{getPersonalityMessage()}"</Text>
            </GlassCard>
          </Animatable.View>

          {/* Stats Row */}
          <Animatable.View animation="smoothSlideUp" delay={700} style={styles.statsRow}>
            <GlassCard style={styles.statCard} animated={false}>
              <Icon name="timer" size={28} color={theme.colors.secondary} />
              <Text style={styles.statValue}>{screenTime}</Text>
              <Text style={styles.statLabel}>Screen Time</Text>
            </GlassCard>
            
            <GlassCard style={styles.statCard} animated={false}>
              <Icon name="touch-app" size={28} color={theme.colors.primary} />
              <Text style={styles.statValue}>{pickups}</Text>
              <Text style={styles.statLabel}>Pickups</Text>
            </GlassCard>
          </Animatable.View>

          {/* Top Offenders */}
          <Animatable.View animation="smoothSlideUp" delay={800} style={styles.offendersSection}>
            <Text style={styles.sectionTitle}>Top Offenders</Text>
            <Text style={styles.sectionSubtitle}>Tap to test your willpower</Text>
            
            {offenders.map((app, index) => (
              <Animatable.View
                key={index}
                animation="smoothFadeIn"
                delay={900 + index * 100}
              >
                <TouchableOpacity
                  style={styles.offenderRow}
                  onPress={() => handleAppPress(app.name)}
                  activeOpacity={0.7}
                >
                  <View style={styles.appInfo}>
                    <LinearGradient
                      colors={app.gradient}
                      style={styles.appIconContainer}
                    >
                      <Icon name={app.icon} size={20} color={theme.colors.white} />
                    </LinearGradient>
                    <Text style={styles.appName}>{app.name}</Text>
                  </View>
                  <View style={styles.appTimeContainer}>
                    <Text style={styles.appTime}>{app.time}</Text>
                    <Icon name="chevron-right" size={20} color={theme.colors.textMuted} />
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </Animatable.View>

          {/* Controls Section */}
          <Animatable.View animation="smoothSlideUp" delay={1100}>
            <GlassCard style={styles.settingsCard} animated={false}>
              <Text style={styles.sectionTitle}>Controls</Text>
              
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Icon name="block" size={22} color={theme.colors.primary} />
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingText}>Anti-Doomscroll Mode</Text>
                    <Text style={styles.settingSubtext}>Block distracting apps</Text>
                  </View>
                </View>
                <Switch
                  value={isBlockingEnabled}
                  onValueChange={setIsBlockingEnabled}
                  trackColor={{ false: "#3e3e3e", true: theme.colors.primary }}
                  thumbColor={isBlockingEnabled ? theme.colors.white : "#f4f3f4"}
                />
              </View>
            </GlassCard>
          </Animatable.View>

          {/* High Stakes Mode */}
          {isBlockingEnabled && (
            <Animatable.View animation="smoothSlideUp" delay={1200}>
              <GlassCard style={[styles.settingsCard, styles.dangerCard]} animated={false}>
                <View style={styles.dangerHeader}>
                  <Icon name="warning" size={20} color={theme.colors.error} />
                  <Text style={[styles.sectionTitle, styles.dangerTitle]}>High Stakes Mode</Text>
                </View>
                
                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Icon name="casino" size={22} color={theme.colors.warning} />
                    <View style={styles.settingTextContainer}>
                      <Text style={styles.settingText}>Doomscroll Roulette</Text>
                      <Text style={styles.settingSubtext}>50% chance to access apps</Text>
                    </View>
                  </View>
                  <Switch
                    value={rouletteEnabled}
                    onValueChange={(val) => {
                      setRouletteEnabled(val);
                      if (val) setFlashbangEnabled(false);
                    }}
                    trackColor={{ false: "#3e3e3e", true: theme.colors.error }}
                    thumbColor={rouletteEnabled ? theme.colors.white : "#f4f3f4"}
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Icon name="flash-on" size={22} color={theme.colors.accent} />
                    <View style={styles.settingTextContainer}>
                      <Text style={styles.settingText}>Flashbang Mode</Text>
                      <Text style={styles.settingSubtext}>Vibration alert when trying to access</Text>
                    </View>
                  </View>
                  <Switch
                    value={flashbangEnabled}
                    onValueChange={(val) => {
                      setFlashbangEnabled(val);
                      if (val) setRouletteEnabled(false);
                    }}
                    trackColor={{ false: "#3e3e3e", true: theme.colors.error }}
                    thumbColor={flashbangEnabled ? theme.colors.white : "#f4f3f4"}
                  />
                </View>
              </GlassCard>
            </Animatable.View>
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
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl + 20,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.md,
  },
  headerLeft: {},
  headerTitle: {
    ...theme.typography.h1,
    color: theme.colors.white,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  headerSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  personalityButton: {
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
  },
  personalityButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.borderPremium,
    gap: theme.spacing.sm,
  },
  personalityText: {
    ...theme.typography.caption,
    color: theme.colors.white,
    fontWeight: '600',
  },

  // Character
  characterWrapper: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    height: 160,
    justifyContent: 'center',
  },
  characterGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  characterContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: 'hidden',
    ...theme.shadows.glow,
  },
  characterGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 65,
    borderWidth: 2,
    borderColor: theme.colors.borderPremium,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: theme.colors.darkSecondary,
  },

  // Score
  scoreContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  scoreValue: {
    fontSize: 72,
    fontWeight: '900',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  scoreLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },

  // Health bar
  healthBarSection: {
    marginBottom: theme.spacing.xl,
  },
  healthBarContainer: {
    paddingHorizontal: theme.spacing.xl,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  healthLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.sm,
  },
  healthLabel: {
    ...theme.typography.overline,
    color: theme.colors.textMuted,
    fontSize: 10,
  },

  // Message
  messageCard: {
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.xl,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  messageLabel: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  messageText: {
    ...theme.typography.bodyLarge,
    color: theme.colors.white,
    fontStyle: 'italic',
    lineHeight: 26,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  statValue: {
    ...theme.typography.h2,
    color: theme.colors.white,
    marginTop: theme.spacing.sm,
    marginBottom: 2,
  },
  statLabel: {
    ...theme.typography.overline,
    color: theme.colors.textMuted,
    fontSize: 10,
  },

  // Offenders
  offendersSection: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h4,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  sectionSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg,
  },
  offenderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderPremium,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  appIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    ...theme.typography.body,
    color: theme.colors.white,
    fontWeight: '600',
  },
  appTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  appTime: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },

  // Settings
  settingsCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.xl,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingText: {
    ...theme.typography.body,
    color: theme.colors.white,
    fontWeight: '600',
  },
  settingSubtext: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderPremium,
    marginVertical: theme.spacing.md,
  },

  // Danger zone
  dangerCard: {
    borderWidth: 1,
    borderColor: `${theme.colors.error}40`,
  },
  dangerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  dangerTitle: {
    color: theme.colors.error,
    marginBottom: 0,
  },
});

export default DetoxScreen;
