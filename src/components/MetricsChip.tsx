import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '../theme/ThemeModeContext';

type MetricsChipProps = {
  label: string;
  value: string;
};

export function MetricsChip({ label, value }: MetricsChipProps) {
  const colors = useColors();

  return (
    <View style={[styles.chip, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
  label: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 11,
  },
  value: {
    marginTop: 4,
    fontFamily: 'Sora_700Bold',
    fontSize: 14,
  },
});