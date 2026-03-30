import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { GradientShell } from '../components/GradientShell';
import { InsightCard } from '../components/InsightCard';
import { SectionTitle } from '../components/SectionTitle';
import { insights } from '../services/mockData';
import { colors, radii, spacing } from '../theme/tokens';

export function InsightsScreen() {
  return (
    <GradientShell>
      <ScrollView contentContainerStyle={styles.root} showsVerticalScrollIndicator={false}>
        <SectionTitle title="Insights" subtitle="Smart analysis for your money habits" />

        <View style={styles.summaryRow}>
          <View style={styles.summaryTile}>
            <Text style={styles.summaryLabel}>Savings Rate</Text>
            <Text style={styles.summaryValue}>+18%</Text>
          </View>
          <View style={styles.summaryTile}>
            <Text style={styles.summaryLabel}>Bills Paid</Text>
            <Text style={styles.summaryValue}>12/12</Text>
          </View>
        </View>

        <View style={styles.stack}>
          {insights.map((item) => (
            <InsightCard key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.goalCard}>
          <Text style={styles.goalLabel}>Emergency Fund</Text>
          <Text style={styles.goalValue}>$3,700 of $5,000</Text>
          <View style={styles.progressBg}>
            <View style={styles.progressFill} />
          </View>
        </View>
      </ScrollView>
    </GradientShell>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: spacing.md,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  stack: {
    gap: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  summaryTile: {
    flex: 1,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    padding: spacing.md,
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: 'DMSans_500Medium',
  },
  summaryValue: {
    marginTop: 3,
    color: colors.textPrimary,
    fontSize: 20,
    fontFamily: 'Sora_700Bold',
  },
  goalCard: {
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  goalLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: 'DMSans_700Bold',
  },
  goalValue: {
    color: colors.textPrimary,
    fontSize: 20,
    fontFamily: 'Sora_700Bold',
  },
  progressBg: {
    height: 8,
    borderRadius: 8,
    backgroundColor: '#DDD4C5',
  },
  progressFill: {
    width: '74%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.amber,
  },
});
