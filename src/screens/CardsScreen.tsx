import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../theme/ThemeModeContext';

export function CardsScreen() {
  const colors = useColors();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>My Cards</Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>Manage your digital and physical cards</Text>

        {/* Virtual Card */}
        <View style={[styles.card, { backgroundColor: colors.primary }]}>
          <View style={styles.cardHead}>
            <Text style={styles.cardBrand}>MoolaPay</Text>
            <Text style={styles.cardChip}>VISA</Text>
          </View>
          <Text style={styles.cardNumber}>****  ****  ****  4012</Text>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardLabel}>Card Holder</Text>
              <Text style={styles.cardValue}>LEATHITIA BWIZA</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expires</Text>
              <Text style={styles.cardValue}>12/29</Text>
            </View>
          </View>
        </View>

        {/* Card Actions */}
        <View style={styles.actionsRow}>
          {[
            { icon: 'snow' as const, label: 'Freeze' },
            { icon: 'settings' as const, label: 'Settings' },
            { icon: 'shield-checkmark' as const, label: 'Security' },
            { icon: 'add-circle' as const, label: 'Add Card' },
          ].map((action) => (
            <Pressable key={action.label} style={[styles.actionBtn, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name={action.icon} size={22} color={colors.primary} />
              <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Card Info */}
        <View style={[styles.infoSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.infoTitle, { color: colors.textPrimary }]}>Card Details</Text>
          {[
            ['Card Type', 'Virtual Debit'],
            ['Network', 'Visa'],
            ['Status', 'Active'],
            ['Daily Limit', '$5,000'],
            ['Monthly Limit', '$25,000'],
          ].map(([label, value]) => (
            <View key={label} style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Recent Card Transactions */}
        <View style={styles.txSection}>
          <Text style={[styles.txHeader, { color: colors.textPrimary }]}>Recent Card Transactions</Text>
          {[
            { id: '1', title: 'Amazon Purchase', amount: -49.99, date: 'Today' },
            { id: '2', title: 'Netflix Subscription', amount: -15.99, date: 'Yesterday' },
            { id: '3', title: 'Gas Station', amount: -35.20, date: '2 days ago' },
          ].map((tx) => (
            <View key={tx.id} style={[styles.txRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={[styles.txIcon, { backgroundColor: colors.errorLight }]}>
                <Ionicons name="card" size={18} color={colors.error} />
              </View>
              <View style={styles.txInfo}>
                <Text style={[styles.txTitle, { color: colors.textPrimary }]}>{tx.title}</Text>
                <Text style={[styles.txDate, { color: colors.textSecondary }]}>{tx.date}</Text>
              </View>
              <Text style={[styles.txAmount, { color: colors.textPrimary }]}>${Math.abs(tx.amount).toFixed(2)}</Text>
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
  // Card
  card: { borderRadius: 24, padding: 24, gap: 20 },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardBrand: { color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 22 },
  cardChip: { color: '#FFFFFF', fontFamily: 'DMSans_700Bold', fontSize: 12, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  cardNumber: { color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 20, letterSpacing: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  cardLabel: { color: 'rgba(255,255,255,0.6)', fontFamily: 'DMSans_500Medium', fontSize: 11 },
  cardValue: { color: '#FFFFFF', fontFamily: 'DMSans_700Bold', fontSize: 14, marginTop: 2 },
  // Actions
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  actionBtn: { flex: 1, alignItems: 'center', gap: 6, borderRadius: 16, paddingVertical: 16 },
  actionLabel: { fontFamily: 'DMSans_700Bold', fontSize: 11 },
  // Info
  infoSection: { borderRadius: 20, borderWidth: 1, padding: 20, gap: 12 },
  infoTitle: { fontFamily: 'Sora_700Bold', fontSize: 16, marginBottom: 4 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  infoLabel: { fontFamily: 'DMSans_500Medium', fontSize: 13 },
  infoValue: { fontFamily: 'DMSans_700Bold', fontSize: 13 },
  // Transactions
  txSection: { gap: 10 },
  txHeader: { fontFamily: 'Sora_700Bold', fontSize: 16 },
  txRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, borderWidth: 1, padding: 14, gap: 12 },
  txIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  txInfo: { flex: 1, gap: 2 },
  txTitle: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
  txDate: { fontFamily: 'DMSans_500Medium', fontSize: 12 },
  txAmount: { fontFamily: 'Sora_700Bold', fontSize: 14 },
});
