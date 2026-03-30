import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Transaction } from '../types/banking';
import { colors, radii, spacing } from '../theme/tokens';

type TransactionRowProps = {
  item: Transaction;
  highlighted?: boolean;
};

export function TransactionRow({ item, highlighted = false }: TransactionRowProps) {
  const isCredit = item.type === 'credit';

  return (
    <View style={[styles.row, highlighted && styles.rowHighlighted]}>
      <View style={styles.left}>
        <View style={[styles.icon, isCredit ? styles.creditIcon : styles.debitIcon]}>
          <Ionicons
            name={isCredit ? 'arrow-down' : 'arrow-up'}
            size={16}
            color={isCredit ? '#8FF0CC' : '#FFC2B8'}
          />
        </View>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{`${item.category}  .  ${item.date}`}</Text>
        </View>
      </View>
      <Text style={[styles.amount, isCredit ? styles.creditAmount : styles.debitAmount]}>
        {isCredit ? '+' : '-'}${item.amount.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  rowHighlighted: {
    borderColor: colors.mint,
    backgroundColor: 'rgba(230, 209, 157, 0.14)',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditIcon: {
    backgroundColor: 'rgba(56, 143, 104, 0.25)',
  },
  debitIcon: {
    backgroundColor: 'rgba(201, 79, 79, 0.25)',
  },
  title: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  meta: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 11,
  },
  amount: {
    fontFamily: 'Sora_700Bold',
    fontSize: 14,
  },
  creditAmount: {
    color: colors.mint,
  },
  debitAmount: {
    color: colors.coral,
  },
});
