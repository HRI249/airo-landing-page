import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';
import { LoadingSpinner } from '../components/UIComponents';

const { width, height } = Dimensions.get('window');

const CameraScreen = ({ navigation, route }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState(true); // Mock permission

  const takePicture = async () => {
    setIsScanning(true);

    // Simulate processing time
    setTimeout(() => {
      setIsScanning(false);
      navigation.navigate('Results', {
        type: route.params?.type || 'meal', // 'meal' or 'fridge'
      });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Mock Camera View */}
      <View style={styles.cameraView}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' }}
          style={styles.cameraPreview}
          blurRadius={isScanning ? 15 : 0}
        />
        
        {/* Dark overlay when scanning */}
        {isScanning && (
          <View style={styles.darkOverlay} />
        )}

        {/* Camera UI Overlay */}
        <View style={styles.overlay}>
          {/* Header */}
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.headerGradient}
          >
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="close" size={24} color={theme.colors.white} />
              </TouchableOpacity>
              
              <View style={styles.headerControls}>
                <TouchableOpacity style={styles.iconButton}>
                  <Icon name="flash-off" size={24} color={theme.colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Icon name="hdr-on" size={24} color={theme.colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* Scanner Frame */}
          <View style={styles.scannerContainer}>
            {!isScanning ? (
              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
                
                <Animatable.View 
                  animation="pulse" 
                  easing="ease-in-out" 
                  iterationCount="infinite" 
                  style={styles.scanLine} 
                />
                
                <Text style={styles.hintText}>Align food within frame</Text>
              </View>
            ) : (
              <Animatable.View
                animation="fadeIn"
                duration={400}
                style={styles.scanningIndicator}
              >
                <LoadingSpinner size={60} color={theme.colors.primary} />
                <Animatable.Text
                  animation="pulse"
                  iterationCount="infinite"
                  style={styles.scanningText}
                >
                  Analyzing...
                </Animatable.Text>
              </Animatable.View>
            )}
          </View>

          {/* Footer Controls */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={styles.footerGradient}
          >
            <View style={styles.controls}>
              <TouchableOpacity style={styles.galleryButton}>
                <View style={styles.galleryIcon}>
                  <Icon name="photo-library" size={24} color={theme.colors.white} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={takePicture}
                disabled={isScanning}
                activeOpacity={0.8}
              >
                <View style={styles.captureButtonOuter}>
                  <LinearGradient
                    colors={isScanning ? [theme.colors.textMuted, theme.colors.textMuted] : theme.gradients.primaryLight}
                    style={styles.captureButtonGradient}
                  >
                    <View style={styles.captureButtonInner} />
                  </LinearGradient>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.flipButton}>
                <View style={styles.flipIcon}>
                  <Icon name="flip-camera-ios" size={24} color={theme.colors.white} />
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraView: {
    flex: 1,
    position: 'relative',
  },
  cameraPreview: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  // Header
  headerGradient: {
    paddingTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  headerControls: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Scanner Frame
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: width * 0.75,
    height: width * 0.75,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: theme.colors.primary,
    borderWidth: 4,
    borderRadius: 4,
  },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  
  scanLine: {
    width: '90%',
    height: 2,
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  hintText: {
    position: 'absolute',
    bottom: -40,
    color: theme.colors.white,
    ...theme.typography.caption,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
  },

  // Scanning State
  scanningIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanningText: {
    marginTop: theme.spacing.lg,
    color: theme.colors.white,
    ...theme.typography.h4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  // Footer Controls
  footerGradient: {
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  captureButtonOuter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonGradient: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  galleryButton: {
    padding: theme.spacing.sm,
  },
  galleryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  flipButton: {
    padding: theme.spacing.sm,
  },
  flipIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
});

export default CameraScreen;
