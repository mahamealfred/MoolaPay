import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { GradientShell } from '../components/GradientShell';
import type { RootStackParamList, RootTabsParamList } from '../navigation/AppNavigator';
import { TransactionRow } from '../components/TransactionRow';
import { useBankingData } from '../state/BankingDataContext';
import { useColors } from '../theme/ThemeModeContext';

const quickActions = [
  { id: 'send', icon: 'arrow-up-circle' as const, label: 'Send', screen: 'SendMoney' as const },
  { id: 'request', icon: 'arrow-down-circle' as const, label: 'Request', screen: 'RequestMoney' as const },
  { id: 'topup', icon: 'add-circle' as const, label: 'Top Up', screen: 'TransferToBank' as const },
  { id: 'more', icon: 'grid' as const, label: 'More', screen: 'Activity' as const },
];

const services = [
  { id: 'send', icon: 'arrow-up-circle' as const, label: 'Send\nMoney', screen: 'SendMoney' as const, type: 'stack' as const },
  { id: 'request', icon: 'arrow-down-circle' as const, label: 'Request\nMoney', screen: 'RequestMoney' as const, type: 'stack' as const },
  { id: 'bank', icon: 'business' as const, label: 'To\nBank', screen: 'TransferToBank' as const, type: 'stack' as const },
  { id: 'split', icon: 'people' as const, label: 'Split\nBill', screen: 'SplitBill' as const, type: 'stack' as const },
  { id: 'invoice', icon: 'document-text' as const, label: 'Invoice', screen: 'Invoice' as const, type: 'stack' as const },
  { id: 'qr', icon: 'qr-code' as const, label: 'QR\nPay', screen: 'QRCode' as const, type: 'stack' as const },
  { id: 'bills', icon: 'receipt' as const, label: 'Pay\nBills', screen: 'Payments' as const, type: 'tab' as const },
];

// Mock BTC prices
const BTC_USD = 68542.3;
const BTC_RWF = 91_234_560;

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<RootTabsParamList>>();
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

  const handleServicePress = (service: (typeof services)[number]) => {
    if (service.type === 'tab') {
      tabNavigation.navigate('Payments', { initialMode: 'bill' });
    } else {
      (navigation.navigate as (screen: string) => void)(service.screen);
    }
  };

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
          <View style={styles.balanceBottom}>
            <Text style={styles.balanceSub}>Current Balance</Text>
            <View style={styles.rewardsBadge}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.rewardsText}>{Math.round(accountSummary.rewards).toLocaleString()} pts</Text>
            </View>
          </View>

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

        {/* Bitcoin Price Card */}
        <Pressable
          style={[styles.btcCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => navigation.navigate('CurrencyExchange')}
        >
          <View style={styles.btcLeft}>
            <View style={[styles.btcIcon, { backgroundColor: '#FFF3E0' }]}>
              <Text style={styles.btcSymbol}>₿</Text>
            </View>
            <View style={styles.btcInfo}>
              <Text style={[styles.btcTitle, { color: colors.textPrimary }]}>Bitcoin</Text>
              <Text style={[styles.btcLive, { color: colors.textTertiary }]}>Live Price</Text>
            </View>
          </View>
          <View style={styles.btcRight}>
            <Text style={[styles.btcPriceUSD, { color: colors.textPrimary }]}>
              ${BTC_USD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>
            <Text style={[styles.btcPriceRWF, { color: colors.textSecondary }]}>
              RWF {BTC_RWF.toLocaleString()}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
        </Pressable>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Services</Text>
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <Pressable
                key={service.id}
                style={[styles.serviceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => handleServicePress(service)}
              >
                <View style={[styles.serviceIcon, { backgroundColor: colors.primarySoft }]}>
                  <Ionicons name={service.icon} size={22} color={colors.primary} />
                </View>
                <Text style={[styles.serviceLabel, { color: colors.textPrimary }]}>{service.label}</Text>
              </Pressable>
            ))}
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
              <TransactionRow key={item.id} item={item} highlighted={item.id === highlightedTransactionId} minimal />
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
  balanceBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceSub: {
    color: 'rgba(255,255,255,0.6)', fontFamily: 'DMSans_500Medium', fontSize: 12,
  },
  rewardsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  rewardsText: {
    color: '#FFFFFF', fontFamily: 'DMSans_700Bold', fontSize: 13,
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
  // Bitcoin Card
  btcCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  btcLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  btcIcon: {
    width: 44, height: 44, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  btcSymbol: {
    fontSize: 22, fontFamily: 'Sora_700Bold', color: '#F7931A',
  },
  btcInfo: {
    gap: 2,
  },
  btcTitle: {
    fontFamily: 'Sora_700Bold', fontSize: 16,
  },
  btcLive: {
    fontFamily: 'DMSans_500Medium', fontSize: 11,
  },
  btcRight: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 2,
  },
  btcPriceUSD: {
    fontFamily: 'Sora_700Bold', fontSize: 16,
  },
  btcPriceRWF: {
    fontFamily: 'DMSans_500Medium', fontSize: 11,
  },
  // Services
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  serviceCard: {
    width: '22.5%',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 8,
  },
  serviceIcon: {
    width: 44, height: 44, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  serviceLabel: {
    fontFamily: 'DMSans_700Bold', fontSize: 10, textAlign: 'center', lineHeight: 14,
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