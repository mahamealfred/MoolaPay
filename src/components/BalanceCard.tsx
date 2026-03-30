import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, radii, spacing } from '../theme/tokens';

type BalanceCardProps = {
  name: string;
  balance: number;
};

export function BalanceCard({ name, balance }: BalanceCardProps) {
  return (
    <LinearGradient colors={colors.gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>Available Balance</Text>
          <Text style={styles.balance}>${balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
        </View>
        <View style={styles.pillMuted}>
          <Text style={styles.pillMutedText}>MoolaPay Plus</Text>
        </View>
      </View>

      <Text style={styles.cardNumber}>****  ****  ****  4821</Text>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.row}>
        <Pressable style={styles.primaryAction}>
          <Text style={styles.primaryActionText}>Add Money</Text>
        </Pressable>
        <Pressable style={styles.secondaryAction}>
          <Text style={styles.secondaryActionText}>Withdraw</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.primary.dark,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.text.secondary,
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
  },
  name: {
    color: colors.text.tertiary,
    fontSize: 15,
    fontFamily: 'DMSans_700Bold',
  },
  balance: {
    color: colors.text.inverse,
    fontSize: 33,
    fontFamily: 'Sora_700Bold',
  },
  cardNumber: {
    marginTop: spacing.sm,
    color: colors.text.secondary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  primaryAction: {
    backgroundColor: colors.secondary.main,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  primaryActionText: {
    color: colors.primary.main,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  secondaryAction: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary.light,
    backgroundColor: colors.primary.dark,
    flex: 1,
    alignItems: 'center',
  },
  secondaryActionText: {
    color: colors.text.tertiary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  pillMuted: {
    backgroundColor: colors.primary.dark,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pillMutedText: {
    color: colors.secondary.light,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
});
