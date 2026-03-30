// components/MetricsChip.tsx
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/format';
import { colors, spacing, typography, radii } from '../theme/tokens';

interface MetricsChipProps {
  label: string;
  value: number;
  format?: 'currency' | 'percentage' | 'number';
  style?: ViewStyle;
}

export function MetricsChip({ label, value, format = 'number', style }: MetricsChipProps) {
  const formattedValue = () => {
    switch (format) {
      case 'currency':
        return formatCurrency(Math.abs(value));
      case 'percentage':
        return formatPercentage(value);
      default:
        return formatNumber(value);
    }
  };

  const isNegative = value < 0;
  const displayValue = isNegative ? `-${formattedValue()}` : formattedValue();

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, isNegative && styles.negativeValue]}>
        {displayValue}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface.secondary,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border.primary,
    padding: spacing.sm,
  },
  label: {
    color: colors.text.secondary,
    fontFamily: typography.fonts.medium,
    fontSize: typography.sizes.xs,
    marginBottom: spacing.xs,
  },
  value: {
    color: colors.text.primary,
    fontFamily: typography.fonts.bold,
    fontSize: typography.sizes.lg,
  },
  negativeValue: {
    color: colors.accent.error,
  },
});