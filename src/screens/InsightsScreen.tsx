import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../theme/ThemeModeContext';
import { useBankingData } from '../state/BankingDataContext';

const spendingCategories = [
  { label: 'Food & Dining', amount: 340, color: '#2563EB', percent: 35 },
  { label: 'Transport', amount: 180, color: '#F59E0B', percent: 18 },
  { label: 'Utilities', amount: 210, color: '#10B981', percent: 22 },
  { label: 'Entertainment', amount: 95, color: '#8B5CF6', percent: 10 },
  { label: 'Other', amount: 150, color: '#64748B', percent: 15 },
];

const monthlyData = [
  { month: 'Jan', income: 2800, expense: 1900 },
  { month: 'Feb', income: 3100, expense: 2100 },
  { month: 'Mar', income: 2900, expense: 1800 },
  { month: 'Apr', income: 3400, expense: 2300 },
];

export function InsightsScreen() {
  const colors = useColors();
  const { accountSummary, weeklySpend } = useBankingData();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Analytics</Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>Your financial overview</Text>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
            <View style={styles.summaryIcon}>
              <Ionicons name="trending-up" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={styles.summaryAmount}>$12,200</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}>
            <View style={[styles.summaryIcon, { backgroundColor: colors.errorLight }]}>
              <Ionicons name="trending-down" size={20} color={colors.error} />
            </View>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Total Expenses</Text>
            <Text style={[styles.summaryAmount, { color: colors.textPrimary }]}>$8,100</Text>
          </View>
        </View>

        {/* Monthly Chart */}
        <View style={[styles.chartCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>Monthly Overview</Text>
          <View style={styles.chartArea}>
            {monthlyData.map((m) => {
              const maxVal = 3500;
              return (
                <View key={m.month} style={styles.barGroup}>
                  <View style={styles.barContainer}>
                    <View style={[styles.bar, { height: `${(m.income / maxVal) * 100}%`, backgroundColor: colors.primary }]} />
                    <View style={[styles.bar, { height: `${(m.expense / maxVal) * 100}%`, backgroundColor: colors.error, opacity: 0.6 }]} />
                  </View>
                  <Text style={[styles.barLabel, { color: colors.textSecondary }]}>{m.month}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>Income</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.error, opacity: 0.6 }]} />
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>Expenses</Text>
            </View>
          </View>
        </View>

        {/* Spending Breakdown */}
        <View style={[styles.breakdownCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>Spending Breakdown</Text>
          {spendingCategories.map((cat) => (
            <View key={cat.label} style={styles.catRow}>
              <View style={styles.catLeft}>
                <View style={[styles.catDot, { backgroundColor: cat.color }]} />
                <Text style={[styles.catLabel, { color: colors.textPrimary }]}>{cat.label}</Text>
              </View>
              <View style={styles.catRight}>
                <View style={[styles.catBar, { backgroundColor: colors.surfaceSecondary }]}>
                  <View style={[styles.catBarFill, { width: `${cat.percent}%`, backgroundColor: cat.color }]} />
                </View>
                <Text style={[styles.catAmount, { color: colors.textSecondary }]}>${cat.amount}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Savings Goal */}
        <View style={[styles.goalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.goalHeader}>
            <Text style={[styles.goalTitle, { color: colors.textPrimary }]}>Emergency Fund</Text>
            <Text style={[styles.goalPercent, { color: colors.primary }]}>74%</Text>
          </View>
          <View style={[styles.goalTrack, { backgroundColor: colors.surfaceSecondary }]}>
            <View style={[styles.goalFill, { backgroundColor: colors.primary }]} />
          </View>
          <Text style={[styles.goalText, { color: colors.textSecondary }]}>$3,700 of $5,000 saved</Text>
        </View>

        {/* Transaction Log */}
        <View style={[styles.logCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>Transaction Log</Text>
          {[
            { title: 'Salary Deposit', amount: '+$1,450', date: 'Apr 1', type: 'credit' },
            { title: 'Rent Payment', amount: '-$800', date: 'Apr 1', type: 'debit' },
            { title: 'Grocery Store', amount: '-$62', date: 'Mar 30', type: 'debit' },
          ].map((tx, i) => (
            <View key={i} style={[styles.logRow, i < 2 && { borderBottomWidth: 1, borderColor: colors.border }]}>
              <View style={[styles.logIcon, { backgroundColor: tx.type === 'credit' ? colors.successLight : colors.errorLight }]}>
                <Ionicons name={tx.type === 'credit' ? 'arrow-down' : 'arrow-up'} size={16} color={tx.type === 'credit' ? colors.success : colors.error} />
              </View>
              <View style={styles.logInfo}>
                <Text style={[styles.logTitle, { color: colors.textPrimary }]}>{tx.title}</Text>
                <Text style={[styles.logDate, { color: colors.textSecondary }]}>{tx.date}</Text>
              </View>
              <Text style={[styles.logAmount, { color: tx.type === 'credit' ? colors.success : colors.textPrimary }]}>{tx.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32, gap: 16 },
  pageTitle: { fontFamily: 'Sora_700Bold', fontSize: 24 },
  pageSubtitle: { fontFamily: 'DMSans_500Medium', fontSize: 14, marginTop: -8 },
  // Summary
  summaryRow: { flexDirection: 'row', gap: 12 },
  summaryCard: { flex: 1, borderRadius: 20, padding: 18, gap: 8 },
  summaryIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  summaryLabel: { color: 'rgba(255,255,255,0.7)', fontFamily: 'DMSans_500Medium', fontSize: 12 },
  summaryAmount: { color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 22 },
  // Chart
  chartCard: { borderRadius: 20, borderWidth: 1, padding: 20, gap: 16 },
  chartTitle: { fontFamily: 'Sora_700Bold', fontSize: 16 },
  chartArea: { flexDirection: 'row', justifyContent: 'space-around', height: 140, alignItems: 'flex-end' },
  barGroup: { alignItems: 'center', gap: 6 },
  barContainer: { flexDirection: 'row', height: 120, alignItems: 'flex-end', gap: 4 },
  bar: { width: 18, borderRadius: 6 },
  barLabel: { fontFamily: 'DMSans_500Medium', fontSize: 12 },
  legendRow: { flexDirection: 'row', gap: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontFamily: 'DMSans_500Medium', fontSize: 12 },
  // Breakdown
  breakdownCard: { borderRadius: 20, borderWidth: 1, padding: 20, gap: 14 },
  catRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  catLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, width: 130 },
  catDot: { width: 10, height: 10, borderRadius: 5 },
  catLabel: { fontFamily: 'DMSans_500Medium', fontSize: 13 },
  catRight: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  catBar: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  catBarFill: { height: '100%', borderRadius: 4 },
  catAmount: { fontFamily: 'DMSans_700Bold', fontSize: 12, width: 48, textAlign: 'right' },
  // Goal
  goalCard: { borderRadius: 20, borderWidth: 1, padding: 20, gap: 10 },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  goalTitle: { fontFamily: 'Sora_700Bold', fontSize: 16 },
  goalPercent: { fontFamily: 'Sora_700Bold', fontSize: 16 },
  goalTrack: { height: 10, borderRadius: 5, overflow: 'hidden' },
  goalFill: { width: '74%', height: '100%', borderRadius: 5 },
  goalText: { fontFamily: 'DMSans_500Medium', fontSize: 13 },
  // Log
  logCard: { borderRadius: 20, borderWidth: 1, padding: 20, gap: 12 },
  logRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingBottom: 12 },
  logIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  logInfo: { flex: 1, gap: 2 },
  logTitle: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
  logDate: { fontFamily: 'DMSans_500Medium', fontSize: 12 },
  logAmount: { fontFamily: 'Sora_700Bold', fontSize: 14 },
});
