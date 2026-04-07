import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../theme/ThemeModeContext';
import { useBankingData } from '../state/BankingDataContext';

const banks = [
    { id: '1', name: 'Bank of Kigali', code: 'BK' },
    { id: '2', name: 'Equity Bank', code: 'EQ' },
    { id: '3', name: 'I&M Bank', code: 'IM' },
    { id: '4', name: 'Access Bank', code: 'AB' },
];

export function TransferToBankScreen() {
    const colors = useColors();
    const navigation = useNavigation();
    const { makeTransfer } = useBankingData();
    const [step, setStep] = useState<'bank' | 'details' | 'success'>('bank');
    const [selectedBank, setSelectedBank] = useState<typeof banks[0] | null>(null);
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [reference, setReference] = useState('');

    const numAmount = Number(amount);
    const fee = numAmount > 0 ? Math.max(2, numAmount * 0.01) : 0;

    const handleTransfer = () => {
        if (!selectedBank || numAmount <= 0) return;
        const r = makeTransfer({ recipient: `${selectedBank.name} - ${accountNumber}`, amount: numAmount, fee, route: selectedBank.name });
        setReference(r.reference);
        setStep('success');
    };

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={() => step === 'bank' ? navigation.goBack() : setStep('bank')}>
                    <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Transfer to Bank</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {step === 'bank' && (
                    <>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>Select Your Bank</Text>
                        {banks.map((b) => (
                            <Pressable key={b.id} style={[styles.bankRow, { backgroundColor: colors.surface, borderColor: selectedBank?.id === b.id ? colors.primary : colors.border }]} onPress={() => setSelectedBank(b)}>
                                <View style={[styles.bankIcon, { backgroundColor: colors.primarySoft }]}>
                                    <Text style={[styles.bankCode, { color: colors.primary }]}>{b.code}</Text>
                                </View>
                                <Text style={[styles.bankName, { color: colors.textPrimary }]}>{b.name}</Text>
                                {selectedBank?.id === b.id && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
                            </Pressable>
                        ))}
                        <View style={styles.inputWrapper}>
                            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Account Number</Text>
                            <TextInput value={accountNumber} onChangeText={setAccountNumber} placeholder="Enter account number" placeholderTextColor={colors.textTertiary} keyboardType="number-pad" style={[styles.textInput, { color: colors.textPrimary, backgroundColor: colors.inputBackground, borderColor: colors.border }]} />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Amount</Text>
                            <View style={[styles.amountRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                                <Text style={[styles.currency, { color: colors.textTertiary }]}>$</Text>
                                <TextInput value={amount} onChangeText={setAmount} placeholder="0.00" placeholderTextColor={colors.textTertiary} keyboardType="decimal-pad" style={[styles.amountInput, { color: colors.textPrimary }]} />
                            </View>
                        </View>
                        {numAmount > 0 && (
                            <View style={[styles.feeCard, { backgroundColor: colors.surfaceSecondary }]}>
                                <View style={styles.feeRow}><Text style={[styles.feeLabel, { color: colors.textSecondary }]}>Transfer Fee</Text><Text style={[styles.feeValue, { color: colors.textPrimary }]}>${fee.toFixed(2)}</Text></View>
                                <View style={styles.feeRow}><Text style={[styles.feeLabel, { color: colors.textSecondary }]}>Total</Text><Text style={[styles.feeValue, { color: colors.primary }]}>${(numAmount + fee).toFixed(2)}</Text></View>
                            </View>
                        )}
                        <Pressable style={[styles.btn, { backgroundColor: colors.primary }, (!selectedBank || !accountNumber || numAmount <= 0) && styles.btnDisabled]} onPress={handleTransfer} disabled={!selectedBank || !accountNumber || numAmount <= 0}>
                            <Text style={styles.btnText}>Transfer Now</Text>
                        </Pressable>
                    </>
                )}

                {step === 'success' && (
                    <View style={styles.successArea}>
                        <View style={[styles.successCircle, { backgroundColor: colors.successLight }]}>
                            <Ionicons name="checkmark-circle" size={64} color={colors.success} />
                        </View>
                        <Text style={[styles.successTitle, { color: colors.textPrimary }]}>Transfer Successful!</Text>
                        <Text style={[styles.successAmount, { color: colors.primary }]}>${numAmount.toFixed(2)}</Text>
                        <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
                            Your ${numAmount.toFixed(2)} is on its way!{'\n'}Reference: {reference}
                        </Text>
                        <Pressable style={[styles.btn, { backgroundColor: colors.primary }]} onPress={() => navigation.goBack()}>
                            <Text style={styles.btnText}>Done</Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
    backBtn: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontFamily: 'Sora_700Bold', fontSize: 18 },
    scroll: { paddingHorizontal: 20, paddingBottom: 40, gap: 14 },
    label: { fontFamily: 'DMSans_700Bold', fontSize: 14, marginTop: 4 },
    bankRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, borderWidth: 1.5, padding: 16, gap: 12 },
    bankIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    bankCode: { fontFamily: 'Sora_700Bold', fontSize: 14 },
    bankName: { flex: 1, fontFamily: 'DMSans_700Bold', fontSize: 15 },
    inputWrapper: { gap: 6, marginTop: 4 },
    inputLabel: { fontFamily: 'DMSans_700Bold', fontSize: 13, marginLeft: 2 },
    textInput: { borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, height: 50, fontFamily: 'DMSans_500Medium', fontSize: 15 },
    amountRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, height: 50 },
    currency: { fontFamily: 'Sora_700Bold', fontSize: 18, marginRight: 4 },
    amountInput: { flex: 1, fontFamily: 'DMSans_500Medium', fontSize: 15 },
    feeCard: { borderRadius: 14, padding: 14, gap: 8 },
    feeRow: { flexDirection: 'row', justifyContent: 'space-between' },
    feeLabel: { fontFamily: 'DMSans_500Medium', fontSize: 13 },
    feeValue: { fontFamily: 'DMSans_700Bold', fontSize: 13 },
    btn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
    btnDisabled: { opacity: 0.45 },
    btnText: { color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 16 },
    successArea: { alignItems: 'center', gap: 16, paddingTop: 48 },
    successCircle: { width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center' },
    successTitle: { fontFamily: 'Sora_700Bold', fontSize: 24 },
    successAmount: { fontFamily: 'Sora_700Bold', fontSize: 36 },
    successDesc: { fontFamily: 'DMSans_500Medium', fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
