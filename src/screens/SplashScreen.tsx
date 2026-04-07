import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../theme/ThemeModeContext';

export function SplashScreen() {
  const colors = useColors();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={[styles.root, { backgroundColor: colors.primary }]}>
      <Animated.View style={[styles.center, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoWrap}>
          <Ionicons name="wallet" size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.appName}>MoolaPay</Text>
        <Text style={styles.tagline}>Your Digital Wallet</Text>
      </Animated.View>

      <View style={styles.dotsRow}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    gap: 12,
  },
  logoWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Sora_700Bold',
    letterSpacing: 1,
  },
  tagline: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  dotsRow: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
    borderRadius: 4,
  },
});
