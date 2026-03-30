import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, radii, spacing } from '../theme/tokens';

type OnboardingScreenProps = {
  onContinue: () => void;
};

export function OnboardingScreen({ onContinue }: OnboardingScreenProps) {
  return (
    <LinearGradient colors={['#17304D', '#0F2238', '#0B1A2B']} style={styles.root}>
      <View style={styles.topBlock}>
        <View style={styles.logoWrap}>
          <Ionicons name="wallet-outline" size={28} color="#F7F3EB" />
        </View>
        <Text style={styles.brand}>MoolaPay</Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Private banking for modern finance</Text>
        <Text style={styles.title}>Move money, manage cards, and track growth in one secure place.</Text>
        <Text style={styles.body}>
          Built for fast transfers, disciplined spending, and premium account control with a clean banking experience.
        </Text>

        <View style={styles.featureList}>
          <View style={styles.featureRow}>
            <Ionicons name="shield-checkmark" size={18} color="#E6D19D" />
            <Text style={styles.featureText}>Protected payments and card controls</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="swap-horizontal" size={18} color="#E6D19D" />
            <Text style={styles.featureText}>Instant transfers and wallet actions</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="analytics" size={18} color="#E6D19D" />
            <Text style={styles.featureText}>Live insights for spending and savings</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.xl,
    justifyContent: 'space-between',
  },
  topBlock: {
    gap: spacing.sm,
  },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: 'rgba(248, 246, 241, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(248, 246, 241, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    color: '#F7F3EB',
    fontFamily: 'Sora_700Bold',
    fontSize: 24,
  },
  heroCard: {
    borderRadius: radii.xl,
    backgroundColor: 'rgba(248, 246, 241, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(248, 246, 241, 0.14)',
    padding: spacing.lg,
    gap: spacing.md,
  },
  eyebrow: {
    color: '#E6D19D',
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: '#F7F3EB',
    fontFamily: 'Sora_700Bold',
    fontSize: 30,
    lineHeight: 40,
  },
  body: {
    color: '#C3D0DD',
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
    lineHeight: 24,
  },
  featureList: {
    gap: spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    flex: 1,
    color: '#E7EDF3',
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#E6D19D',
    borderRadius: radii.button,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#2F240F',
    fontFamily: 'Sora_700Bold',
    fontSize: 16,
  },
});