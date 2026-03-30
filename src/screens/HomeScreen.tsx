import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { BalanceCard } from '../components/BalanceCard';
import { GradientShell } from '../components/GradientShell';
import type { RootTabsParamList } from '../navigation/AppNavigator';
import { SectionTitle } from '../components/SectionTitle';
import { homeServices } from '../services/paymentServices';
import { TransactionRow } from '../components/TransactionRow';
import { useBankingData } from '../state/BankingDataContext';
import { colors, spacing } from '../theme/tokens';

export function HomeScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabsParamList>>();
  const { accountSummary, clearHighlightedTransaction, highlightedTransactionId, transactions, user, weeklySpend } = useBankingData();
  const budgetLimit = 500;
  const spendProgress = Math.min((weeklySpend / budgetLimit) * 100, 100);

  useEffect(() => {
    if (!highlightedTransactionId) {
      return;
    }

    const timeoutId = setTimeout(() => {
      clearHighlightedTransaction();
    }, 4500);

    return () => clearTimeout(timeoutId);
  }, [clearHighlightedTransaction, highlightedTransactionId]);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <GradientShell>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.kicker}>{greeting}</Text>
            <Text style={styles.headline}>{user.firstName}</Text>
          </View>
          <Pressable style={styles.notifyBtn}>
            <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
          </Pressable>
        </View>

        <BalanceCard name={user.firstName} balance={accountSummary.availableBalance} />

        <View style={styles.metricsContainer}>
          <View style={styles.metricChip}>
            <Text style={styles.metricLabel}>Invested</Text>
            <Text style={styles.metricValue}>${accountSummary.invested.toFixed(0)}</Text>
          </View>
          <View style={styles.metricChip}>
            <Text style={styles.metricLabel}>Rewards</Text>
            <Text style={styles.metricValue}>${accountSummary.rewards.toFixed(0)}</Text>
          </View>
          <View style={styles.metricChip}>
            <Text style={styles.metricLabel}>This week</Text>
            <Text style={styles.metricValue}>-${weeklySpend.toFixed(0)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <SectionTitle title="Services" subtitle="Transfer, bill payment, airtime, utilities, and subscriptions" />
          <View style={styles.servicesGrid}>
            {homeServices.map((service) => (
              <Pressable
                key={service.id}
                style={styles.serviceCard}
                onPress={() =>
                  navigation.navigate('Payments', {
                    initialMode: service.mode,
                    initialService: service.service,
                  })
                }
              >
                <View style={styles.serviceIconWrap}>
                  <Ionicons name={service.icon} size={14} color={colors.sky} />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.budgetPanel}>
          <View style={styles.budgetHeader}>
            <Text style={styles.budgetTitle}>Weekly spending budget</Text>
            <Text style={styles.budgetValue}>{spendProgress.toFixed(0)}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${spendProgress}%` }]} />
          </View>
          <Text style={styles.budgetHint}>${weeklySpend.toFixed(2)} of ${budgetLimit.toFixed(2)} used</Text>
        </View>

        <View style={styles.section}>
          <SectionTitle title="Recent Activity" subtitle="Your latest transactions" />
          <View style={styles.transactionsList}>
            {transactions.slice(0, 4).map((item) => (
              <TransactionRow key={item.id} item={item} highlighted={item.id === highlightedTransactionId} />
            ))}
          </View>
        </View>
 
        <View style={styles.summaryPanel}>
          <Text style={styles.summaryLabel}>Rewards Balance</Text>
          <Text style={styles.summaryValue}>${accountSummary.rewards.toFixed(2)}</Text>
          <Text style={styles.summaryHint}>Earn more rewards with every transaction</Text>
        </View>
      </ScrollView>
    </GradientShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    paddingTop: spacing.sm,
    gap: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kicker: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  headline: {
    color: colors.textPrimary,
    fontFamily: 'Sora_700Bold',
    fontSize: 27,
  },
  notifyBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metricChip: {
    flex: 1,
    backgroundColor: colors.surface.secondary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
  },
  metricLabel: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 11,
  },
  metricValue: {
    marginTop: 4,
    color: colors.textPrimary,
    fontFamily: 'Sora_700Bold',
    fontSize: 14,
  },
  section: {
    gap: spacing.sm,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  serviceCard: {
    width: 72,
    height: 88,
    borderRadius: 18,
    backgroundColor: colors.surface.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    shadowColor: colors.primary.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    gap: 6,
  },
  serviceIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  serviceTitle: {
    color: colors.text.primary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
  serviceSubtitle: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    lineHeight: 18,
  },
  budgetPanel: {
    borderRadius: 18,
    backgroundColor: colors.surface.primary,
    borderColor: colors.line,
    borderWidth: 1,
    padding: spacing.md,
    gap: 8,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetTitle: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  budgetValue: {
    color: colors.mint,
    fontFamily: 'Sora_700Bold',
    fontSize: 14,
  },
  progressTrack: {
    height: 8,
    borderRadius: 20,
    backgroundColor: colors.surface.secondary,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 20,
    backgroundColor: colors.mint,
  },
  budgetHint: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
  transactionsList: {
    gap: spacing.sm,
  },
  summaryPanel: {
    borderRadius: 18,
    backgroundColor: colors.surface.secondary,
    borderColor: colors.primary.light,
    borderWidth: 1,
    padding: spacing.md,
    gap: 2,
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  summaryValue: {
    color: colors.mint,
    fontFamily: 'Sora_700Bold',
    fontSize: 24,
  },
  summaryHint: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
});