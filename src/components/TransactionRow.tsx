import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../types/banking';
import { useColors } from '../theme/ThemeModeContext';

type TransactionRowProps = {
  item: Transaction;
  highlighted?: boolean;
};

export function TransactionRow({ item, highlighted }: TransactionRowProps) {
  const colors = useColors();
  const isCredit = item.type === 'credit';

  return (
    <View style={[
      styles.row,
      {
        backgroundColor: highlighted ? colors.primarySoft : colors.surface,
        borderBottomColor: colors.border,
      },
    ]}>
      <View style={[styles.iconWrap, { backgroundColor: isCredit ? colors.successLight : colors.errorLight }]}>
        <Ionicons
          name={isCredit ? 'arrow-down' : 'arrow-up'}
          size={16}
          color={isCredit ? colors.success : colors.error}
        />
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
        <Text style={[styles.category, { color: colors.textSecondary }]}>{item.category} · {item.date}</Text>
      </View>
      <Text style={[styles.amount, { color: isCredit ? colors.success : colors.textPrimary }]}>
        {isCredit ? '+' : '-'}${item.amount.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  category: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
  amount: {
    fontFamily: 'Sora_700Bold',
    fontSize: 14,
  },
});
