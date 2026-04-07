import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { GradientShell } from '../components/GradientShell';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { SectionTitle } from '../components/SectionTitle';
import { TransactionRow } from '../components/TransactionRow';
import { useBankingData } from '../state/BankingDataContext';
import { useColors } from '../theme/ThemeModeContext';

const quickActions = [
  { id: 'send', icon: 'arrow-up-circle' as const, label: 'Send', screen: 'SendMoney' as const },
  { id: 'request', icon: 'arrow-down-circle' as const, label: 'Request', screen: 'RequestMoney' as const },
  { id: 'topup', icon: 'add-circle' as const, label: 'Top Up', screen: 'TransferToBank' as const },
  { id: 'more', icon: 'grid' as const, label: 'More', screen: 'Activity' as const },
];

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const colors = useColors();
  const { accountSummary, clearHighlightedTransaction, highlightedTransactionId, transactions, user } = useBankingData();

  useEffect(() => {
    if (!highlightedTransactionId) return;
    const t = setTimeout(() => clearHighlightedTransaction(), 4500);
    return () => clearTimeout(t);
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
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>{user.firstName[0]}{user.lastName[0]}</Text>
            </View>
            <View>
              <Text style={[styles.greeting, { color: colors.textSecondary }]}>{greeting} 👋</Text>
              <Text style={[styles.userName, { color: colors.textPrimary }]}>{user.firstName} {user.lastName}</Text>
            </View>
          </View>
          <Pressable
            style={[styles.notifyBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
            <View style={[styles.notifyDot, { backgroundColor: colors.error }]} />
          </Pressable>
        </View>

        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            ${accountSummary.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
          <Text style={styles.balanceSub}>Current Balance</Text>

          {/* Quick Actions */}
          <View style={styles.quickActionsRow}>
            {quickActions.map((action) => (
              <Pressable key={action.id} style={styles.quickAction} onPress={() => navigation.navigate(action.screen)}>
                <View style={styles.quickActionIcon}>
                  <Ionicons name={action.icon} size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Metrics */}
        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.metricIcon, { backgroundColor: colors.successLight }]}>
              <Ionicons name="trending-up" size={16} color={colors.success} />
            </View>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Income</Text>
            <Text style={[styles.metricValue, { color: colors.textPrimary }]}>$1,450</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.metricIcon, { backgroundColor: colors.errorLight }]}>
              <Ionicons name="trending-down" size={16} color={colors.error} />
            </View>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Expenses</Text>
            <Text style={[styles.metricValue, { color: colors.textPrimary }]}>$348</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.metricIcon, { backgroundColor: colors.warningLight }]}>
              <Ionicons name="star" size={16} color={colors.warning} />
            </View>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Rewards</Text>
            <Text style={[styles.metricValue, { color: colors.textPrimary }]}>${accountSummary.rewards.toFixed(0)}</Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Recent Transactions</Text>
            <Pressable onPress={() => navigation.navigate('Activity')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
            </Pressable>
          </View>
          <View style={[styles.transactionsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {transactions.slice(0, 4).map((item) => (
              <TransactionRow key={item.id} item={item} highlighted={item.id === highlightedTransactionId} />
            ))}
          </View>
        </View>
      </ScrollView>
    </GradientShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 8,
    gap: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48, height: 48, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF', fontFamily: 'DMSans_700Bold', fontSize: 16,
  },
  greeting: {
    fontFamily: 'DMSans_500Medium', fontSize: 13,
  },
  userName: {
    fontFamily: 'Sora_700Bold', fontSize: 18,
  },
  notifyBtn: {
    width: 44, height: 44, borderRadius: 14, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  notifyDot: {
    position: 'absolute', top: 10, right: 10,
    width: 8, height: 8, borderRadius: 4,
  },
  // Balance Card
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    gap: 4,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.7)', fontFamily: 'DMSans_500Medium', fontSize: 14,
  },
  balanceAmount: {
    color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 36, marginVertical: 4,
  },
  balanceSub: {
    color: 'rgba(255,255,255,0.6)', fontFamily: 'DMSans_500Medium', fontSize: 12,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  quickAction: {
    alignItems: 'center', gap: 6,
  },
  quickActionIcon: {
    width: 48, height: 48, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  quickActionLabel: {
    color: '#FFFFFF', fontFamily: 'DMSans_700Bold', fontSize: 12,
  },
  // Metrics
  metricsRow: {
    flexDirection: 'row', gap: 10,
  },
  metricCard: {
    flex: 1, borderRadius: 16, borderWidth: 1, padding: 14, gap: 6,
  },
  metricIcon: {
    width: 32, height: 32, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  metricLabel: {
    fontFamily: 'DMSans_500Medium', fontSize: 11, marginTop: 2,
  },
  metricValue: {
    fontFamily: 'Sora_700Bold', fontSize: 16,
  },
  // Transactions
  section: { gap: 12 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Sora_700Bold', fontSize: 18,
  },
  seeAll: {
    fontFamily: 'DMSans_700Bold', fontSize: 13,
  },
  transactionsCard: {
    borderRadius: 16, borderWidth: 1, overflow: 'hidden',
  },
});