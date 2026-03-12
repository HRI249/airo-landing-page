import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View, StyleSheet } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import CalAIScreen from './src/screens/CalAIScreen';
import FridgeAIScreen from './src/screens/FridgeAIScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CameraScreen from './src/screens/CameraScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LandingScreen from './src/screens/LandingScreen';
import DetoxScreen from './src/screens/DetoxScreen';

// Import theme
import { theme } from './src/styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

// Stack navigator for Cal AI flow
function CalAIStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CalAIMain" component={CalAIScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
}

// Stack navigator for Fridge AI flow
function FridgeAIStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FridgeAIMain" component={FridgeAIScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
}

// Premium Tab Bar Background
const TabBarBackground = () => (
  <View style={styles.tabBarBackground}>
    <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
    <LinearGradient
      colors={['rgba(26, 26, 46, 0.9)', 'rgba(15, 15, 26, 0.95)']}
      style={StyleSheet.absoluteFill}
    />
    {/* Top border glow */}
    <LinearGradient
      colors={['rgba(0, 216, 160, 0.3)', 'transparent']}
      style={styles.tabBarTopBorder}
    />
  </View>
);

// Main tab navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Cal AI') {
            iconName = 'camera-alt';
          } else if (route.name === 'Fridge AI') {
            iconName = 'kitchen';
          } else if (route.name === 'Detox') {
            iconName = 'psychology';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <Icon name={iconName} size={focused ? 26 : 24} color={color} />
              {focused && <View style={[styles.iconDot, { backgroundColor: color }]} />}
            </View>
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
        tabBarBackground: () => <TabBarBackground />,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 85,
          paddingBottom: 20,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.3,
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cal AI" component={CalAIStack} />
      <Tab.Screen name="Fridge AI" component={FridgeAIStack} />
      <Tab.Screen name="Detox" component={DetoxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
      <RootStack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyle: { backgroundColor: theme.colors.darkPrimary },
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
        }} 
        initialRouteName="Landing"
      >
        <RootStack.Screen name="Landing" component={LandingScreen} />
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
        <RootStack.Screen name="MainApp" component={TabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  tabBarTopBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  iconContainerFocused: {
    transform: [{ scale: 1.05 }],
  },
  iconDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
    opacity: 0.8,
  },
});
