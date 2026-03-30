import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Insight } from '../types/banking';
import { colors, radii, spacing } from '../theme/tokens';

type InsightCardProps = {
  item: Insight;
};

export function InsightCard({ item }: InsightCardProps) {
  const iconName = item.trend === 'up' ? 'trending-up' : item.trend === 'down' ? 'trending-down' : 'remove';

  return (
    <View style={styles.card}>
      <Ionicons name={iconName} color={colors.amber} size={20} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    padding: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
  },
  body: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: 'DMSans_500Medium',
  },
});
