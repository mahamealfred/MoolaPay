import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useColors } from '../theme/ThemeModeContext';

const billCategories = [
  { id: 'electricity', icon: 'flash' as const, label: 'Electricity' },
  { id: 'internet', icon: 'wifi' as const, label: 'Internet' },
  { id: 'water', icon: 'water' as const, label: 'Water' },
  { id: 'phone', icon: 'call' as const, label: 'Phone' },
  { id: 'tv', icon: 'tv' as const, label: 'TV/Cable' },
  { id: 'insurance', icon: 'shield' as const, label: 'Insurance' },
];

const quickActions = [
  { id: 'send', icon: 'arrow-up-circle' as const, label: 'Send Money', screen: 'SendMoney' as const },
  { id: 'request', icon: 'arrow-down-circle' as const, label: 'Request Money', screen: 'RequestMoney' as const },
  { id: 'bank', icon: 'business' as const, label: 'To Bank', screen: 'TransferToBank' as const },
  { id: 'split', icon: 'people' as const, label: 'Split Bill', screen: 'SplitBill' as const },
  { id: 'invoice', icon: 'document-text' as const, label: 'Invoice', screen: 'Invoice' as const },
  { id: 'qr', icon: 'qr-code' as const, label: 'QR Pay', screen: 'QRCode' as const },
];

export function PaymentsScreen() {
  const colors = useColors();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedBill, selectBill] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [billStep, setBillStep] = useState<'list' | 'pay' | 'success'>('list');

  const resetBill = () => { selectBill(null); setAmount(''); setBillStep('list'); };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Payments</Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>Send, receive, and manage payments</Text>

        {/* Quick Actions */}
        <View style={styles.quickGrid}>
          {quickActions.map((action) => (
            <Pressable
              key={action.id}
              style={[styles.quickCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => navigation.navigate(action.screen)}
            >
              <View style={[styles.quickIcon, { backgroundColor: colors.primarySoft }]}>
                <Ionicons name={action.icon} size={22} color={colors.primary} />
              </View>
              <Text style={[styles.quickLabel, { color: colors.textPrimary }]}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Bill Payments */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Pay Bills</Text>

          {billStep === 'list' && (
            <View style={styles.billGrid}>
              {billCategories.map((bill) => (
                <Pressable
                  key={bill.id}
                  style={[styles.billCard, { backgroundColor: colors.surface, borderColor: selectedBill === bill.id ? colors.primary : colors.border }]}
                  onPress={() => { selectBill(bill.id); setBillStep('pay'); }}
                >
                  <View style={[styles.billIcon, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons name={bill.icon} size={22} color={colors.primary} />
                  </View>
                  <Text style={[styles.billLabel, { color: colors.textPrimary }]}>{bill.label}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {billStep === 'pay' && (
            <View style={styles.payArea}>
              <View style={[styles.selectedBillRow, { backgroundColor: colors.primarySoft }]}>
                <Ionicons name={billCategories.find(b => b.id === selectedBill)?.icon || 'receipt'} size={24} color={colors.primary} />
                <Text style={[styles.selectedBillLabel, { color: colors.primary }]}>{billCategories.find(b => b.id === selectedBill)?.label}</Text>
              </View>
              <TextInput
                placeholder="Account/Ref Number"
                placeholderTextColor={colors.textTertiary}
                style={[styles.textInput, { color: colors.textPrimary, backgroundColor: colors.inputBackground, borderColor: colors.border }]}
              />
              <View style={[styles.amountRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                <Text style={[styles.currency, { color: colors.textTertiary }]}>$</Text>
                <TextInput value={amount} onChangeText={setAmount} placeholder="0.00" placeholderTextColor={colors.textTertiary} keyboardType="decimal-pad" style={[styles.amountInput, { color: colors.textPrimary }]} />
              </View>
              <View style={styles.btnRow}>
                <Pressable style={[styles.outlineBtn, { borderColor: colors.border }]} onPress={resetBill}>
                  <Text style={[styles.outlineBtnText, { color: colors.textSecondary }]}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.primaryBtn, { backgroundColor: colors.primary }, !Number(amount) && styles.disabled]} onPress={() => setBillStep('success')} disabled={!Number(amount)}>
                  <Text style={styles.primaryBtnText}>Pay Now</Text>
                </Pressable>
              </View>
            </View>
          )}

          {billStep === 'success' && (
            <View style={styles.successArea}>
              <View style={[styles.successCircle, { backgroundColor: colors.successLight }]}>
                <Ionicons name="checkmark-circle" size={56} color={colors.success} />
              </View>
              <Text style={[styles.successTitle, { color: colors.textPrimary }]}>Bill Paid!</Text>
              <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
                ${Number(amount).toFixed(2)} paid for {billCategories.find(b => b.id === selectedBill)?.label}
              </Text>
              <Pressable style={[styles.primaryBtn, { backgroundColor: colors.primary, marginTop: 12 }]} onPress={resetBill}>
                <Text style={styles.primaryBtnText}>Done</Text>
              </Pressable>
            </View>
          )}
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
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quickCard: { width: '31%', borderRadius: 16, borderWidth: 1, padding: 14, alignItems: 'center', gap: 8 },
  quickIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { fontFamily: 'DMSans_700Bold', fontSize: 11, textAlign: 'center' },
  section: { gap: 12, marginTop: 4 },
  sectionTitle: { fontFamily: 'Sora_700Bold', fontSize: 18 },
  billGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  billCard: { width: '31%', borderRadius: 16, borderWidth: 1, padding: 14, alignItems: 'center', gap: 8 },
  billIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  billLabel: { fontFamily: 'DMSans_700Bold', fontSize: 11, textAlign: 'center' },
  payArea: { gap: 14 },
  selectedBillRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 14, padding: 14 },
  selectedBillLabel: { fontFamily: 'DMSans_700Bold', fontSize: 15 },
  textInput: { borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, height: 50, fontFamily: 'DMSans_500Medium', fontSize: 15 },
  amountRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, height: 50 },
  currency: { fontFamily: 'Sora_700Bold', fontSize: 18, marginRight: 4 },
  amountInput: { flex: 1, fontFamily: 'DMSans_500Medium', fontSize: 15 },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  outlineBtn: { flex: 1, borderRadius: 14, borderWidth: 1, paddingVertical: 14, alignItems: 'center' },
  outlineBtnText: { fontFamily: 'DMSans_700Bold', fontSize: 15 },
  primaryBtn: { flex: 1, borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  disabled: { opacity: 0.45 },
  primaryBtnText: { color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 15 },
  successArea: { alignItems: 'center', gap: 12, paddingTop: 32, paddingBottom: 16 },
  successCircle: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  successTitle: { fontFamily: 'Sora_700Bold', fontSize: 22 },
  successDesc: { fontFamily: 'DMSans_500Medium', fontSize: 14, textAlign: 'center' },
});
