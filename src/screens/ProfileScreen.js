import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

import { theme, globalStyles } from '../styles/theme';
import { GlassCard } from '../components/UIComponents';
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

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(true);

  const profileStats = [
    { value: '0', label: 'Meals Scanned', icon: 'restaurant', color: theme.colors.primary },
    { value: '0', label: 'Recipes Made', icon: 'menu-book', color: theme.colors.secondary },
    { value: '0', label: 'Calories', icon: 'local-fire-department', color: theme.colors.warning },
    { value: '0', label: 'Day Streak', icon: 'whatshot', color: theme.colors.error },
  ];

  const menuItems = [
    { id: 'goals', title: 'Nutrition Goals', icon: 'flag', color: theme.colors.success },
    { id: 'history', title: 'Scan History', icon: 'history', color: theme.colors.primary },
    { id: 'favorites', title: 'Favorite Meals', icon: 'favorite', color: theme.colors.secondary },
    { id: 'settings', title: 'Settings', icon: 'settings', color: theme.colors.textMuted },
    { id: 'help', title: 'Help & Support', icon: 'help', color: theme.colors.accent },
    { id: 'about', title: 'About Airo', icon: 'info', color: theme.colors.primary },
  ];

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            easing="ease-out-quart"
            style={styles.profileHeader}
          >
            <GlassCard style={styles.profileCard} delay={0}>
              <View style={styles.profileContent}>
                <Animatable.View
                  animation="bounceIn"
                  duration={1200}
                  delay={200}
                  style={styles.avatarContainer}
                >
                  <LinearGradient
                    colors={theme.gradients.ocean}
                    style={styles.avatar}
                  >
                    <Icon name="person" size={42} color={theme.colors.white} />
                  </LinearGradient>
                  {/* Online indicator */}
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    duration={2000}
                    style={styles.onlineIndicator}
                  />
                </Animatable.View>
                <Text style={styles.userName}>Welcome to Airo</Text>
                <Text style={styles.userEmail}>Start your healthy journey today!</Text>
                
                {/* Quick action */}
                <TouchableOpacity style={styles.editProfileButton} activeOpacity={0.8}>
                  <Icon name="edit" size={16} color={theme.colors.primary} />
                  <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </Animatable.View>

          {/* Stats Section */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            delay={200}
            easing="ease-out-quart"
            style={styles.statsSection}
          >
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <View style={styles.statsGrid}>
              {profileStats.map((stat, index) => (
                <Animatable.View
                  key={stat.label}
                  animation="smoothFadeIn"
                  delay={300 + index * 80}
                  style={styles.statCard}
                >
                  <GlassCard style={styles.statCardInner} animated={false}>
                    <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                      <Icon name={stat.icon} size={22} color={stat.color} />
                    </View>
                    <Text style={styles.statNumber}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </GlassCard>
                </Animatable.View>
              ))}
            </View>
          </Animatable.View>

          {/* Quick Settings */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            delay={400}
            easing="ease-out-quart"
            style={styles.settingsSection}
          >
            <Text style={styles.sectionTitle}>Quick Settings</Text>
            <GlassCard style={styles.settingsCard} animated={false}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={[styles.settingIconContainer, { backgroundColor: `${theme.colors.primary}20` }]}>
                    <Icon name="notifications" size={20} color={theme.colors.primary} />
                  </View>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Push Notifications</Text>
                    <Text style={styles.settingDescription}>Get meal scanning reminders</Text>
                  </View>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#3e3e3e', true: theme.colors.primary }}
                  thumbColor={theme.colors.white}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={[styles.settingIconContainer, { backgroundColor: `${theme.colors.accent}20` }]}>
                    <Icon name="dark-mode" size={20} color={theme.colors.accent} />
                  </View>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>Dark Mode</Text>
                    <Text style={styles.settingDescription}>Premium dark theme (on)</Text>
                  </View>
                </View>
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: '#3e3e3e', true: theme.colors.primary }}
                  thumbColor={theme.colors.white}
                />
              </View>
            </GlassCard>
          </Animatable.View>

          {/* Menu Items */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            delay={600}
            easing="ease-out-quart"
            style={styles.menuSection}
          >
            <Text style={styles.sectionTitle}>Menu</Text>
            <GlassCard style={styles.menuCard} animated={false}>
              {menuItems.map((item, index) => (
                <Animatable.View
                  key={item.id}
                  animation="smoothFadeIn"
                  delay={700 + index * 60}
                >
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => console.log(item.title)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuItemContent}>
                      <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}15` }]}>
                        <Icon name={item.icon} size={20} color={item.color} />
                      </View>
                      <Text style={styles.menuItemText}>{item.title}</Text>
                    </View>
                    <Icon name="chevron-right" size={22} color={theme.colors.textMuted} />
                  </TouchableOpacity>
                  {index < menuItems.length - 1 && <View style={styles.menuDivider} />}
                </Animatable.View>
              ))}
            </GlassCard>
          </Animatable.View>

          {/* App Info */}
          <Animatable.View
            animation="smoothSlideUp"
            duration={800}
            delay={800}
            easing="ease-out-quart"
            style={styles.appInfoSection}
          >
            <GlassCard style={styles.appInfoCard} animated={false}>
              <Animatable.View
                animation="pulse"
                iterationCount="infinite"
                duration={3000}
                style={styles.appLogoContainer}
              >
                <LinearGradient
                  colors={theme.gradients.ocean}
                  style={styles.appLogo}
                >
                  <Icon name="eco" size={28} color={theme.colors.white} />
                </LinearGradient>
              </Animatable.View>
              <Text style={styles.appName}>Airo</Text>
              <Text style={styles.appVersion}>Version 1.0.0</Text>
              <Text style={styles.appTagline}>Nutrition Intelligence, Reimagined</Text>
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
    paddingBottom: theme.spacing.xxxl + 20,
  },

  // Profile header
  profileHeader: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  profileCard: {
    padding: theme.spacing.xl,
  },
  profileContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: theme.spacing.lg,
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.glow,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.success,
    borderWidth: 3,
    borderColor: theme.colors.darkSecondary,
  },
  userName: {
    ...theme.typography.h2,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  editProfileText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
  },

  // Section title
  sectionTitle: {
    ...theme.typography.h4,
    color: theme.colors.white,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },

  // Stats
  statsSection: {
    marginBottom: theme.spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  statCard: {
    width: '48%',
  },
  statCardInner: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  statNumber: {
    ...theme.typography.h2,
    color: theme.colors.white,
    marginBottom: 2,
  },
  statLabel: {
    ...theme.typography.overline,
    color: theme.colors.textMuted,
    textAlign: 'center',
    fontSize: 10,
  },

  // Settings
  settingsSection: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  settingsCard: {
    padding: theme.spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.white,
    marginBottom: 2,
  },
  settingDescription: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  settingDivider: {
    height: 1,
    backgroundColor: theme.colors.borderPremium,
    marginVertical: theme.spacing.md,
    marginLeft: 56,
  },

  // Menu
  menuSection: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  menuCard: {
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  menuItemText: {
    ...theme.typography.body,
    color: theme.colors.white,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: theme.colors.borderPremium,
    marginLeft: 70,
  },

  // App info
  appInfoSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  appInfoCard: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  appLogoContainer: {
    marginBottom: theme.spacing.md,
  },
  appLogo: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.glow,
  },
  appName: {
    ...theme.typography.h2,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  appVersion: {
    ...theme.typography.overline,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  appTagline: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    textAlign: 'center',
  },
});

export default ProfileScreen;
