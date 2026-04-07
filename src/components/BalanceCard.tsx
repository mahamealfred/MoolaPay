import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../theme/ThemeModeContext';
import { radii, spacing } from '../theme/tokens';

type BalanceCardProps = {
  name: string;
  balance: number;
};

export function BalanceCard({ name, balance }: BalanceCardProps) {
  const colors = useColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.primary }]}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>Available Balance</Text>
          <Text style={styles.balance}>${balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>MoolaPay Plus</Text>
        </View>
      </View>

      <Text style={styles.cardNumber}>****  ****  ****  4821</Text>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.row}>
        <Pressable style={styles.primaryAction}>
          <Text style={[styles.primaryActionText, { color: colors.primary }]}>Add Money</Text>
        </Pressable>
        <Pressable style={styles.secondaryAction}>
          <Text style={styles.secondaryActionText}>Withdraw</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  label: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 33,
    fontFamily: 'Sora_700Bold',
  },
  name: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    fontFamily: 'DMSans_700Bold',
  },
  cardNumber: {
    marginTop: spacing.sm,
    color: 'rgba(255,255,255,0.6)',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  primaryActionText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  secondaryAction: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    flex: 1,
    alignItems: 'center',
  },
  secondaryActionText: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pillText: {
    color: '#FFFFFF',
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
});
