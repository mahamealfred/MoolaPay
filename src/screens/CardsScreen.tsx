import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { GradientShell } from '../components/GradientShell';
import { SectionTitle } from '../components/SectionTitle';
import { colors, radii, spacing } from '../theme/tokens';

export function CardsScreen() {
  return (
    <GradientShell>
      <View style={styles.root}>
        <SectionTitle title="Cards" subtitle="Manage your digital and physical cards" />

        <LinearGradient colors={['#1B3B61', '#122A46', '#0F2238']} style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.brand}>MoolaPay</Text>
            <Text style={styles.chip}>VISA</Text>
          </View>
          <Text style={styles.number}>****  ****  ****  4012</Text>
          <View style={styles.footer}>
            <Text style={styles.footerText}>LEATHITIA B.</Text>
            <Text style={styles.footerText}>12/29</Text>
          </View>
        </LinearGradient>

        <View style={styles.controlsRow}>
          <Pressable style={styles.controlTile}>
            <Ionicons name="snow" size={18} color={colors.textPrimary} />
            <Text style={styles.controlTitle}>Freeze</Text>
            <Text style={styles.controlHint}>Temporarily lock</Text>
          </Pressable>
          <Pressable style={styles.controlTile}>
            <Ionicons name="shield-checkmark" size={18} color={colors.textPrimary} />
            <Text style={styles.controlTitle}>Secure</Text>
            <Text style={styles.controlHint}>Set spending limits</Text>
          </Pressable>
        </View>

        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>Card controls</Text>
          <Text style={styles.infoText}>Enable online payments, update ATM limits, and manage NFC usage from one place.</Text>
        </View>
      </View>
    </GradientShell>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  card: {
    minHeight: 200,
    borderRadius: radii.xl,
    padding: spacing.lg,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#3B5878',
  },
  cardHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#E8F4FF',
    fontFamily: 'Sora_700Bold',
    fontSize: 24,
  },
  chip: {
    color: '#382B12',
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: '#E6D19D',
  },
  number: {
    color: '#FFFFFF',
    fontFamily: 'Sora_700Bold',
    letterSpacing: 1.5,
    fontSize: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    color: '#D6E7FF',
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  controlTile: {
    flex: 1,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: 4,
  },
  controlTitle: {
    marginTop: 4,
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  controlHint: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
  infoPanel: {
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    padding: spacing.md,
    gap: 4,
  },
  infoTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: 'Sora_700Bold',
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
  },
});
