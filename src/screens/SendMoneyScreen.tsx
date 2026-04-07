import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../theme/ThemeModeContext';
import { useBankingData } from '../state/BankingDataContext';

const contacts = [
    { id: '1', name: 'Ange Bizimana', initials: 'AB', account: 'MW-20498' },
    { id: '2', name: 'Jean Munezero', initials: 'JM', account: 'BK-883120' },
    { id: '3', name: 'Alice Niyonsaba', initials: 'AN', account: 'AG-44381' },
    { id: '4', name: 'Aline Mukiza', initials: 'AM', account: 'MW-33012' },
    { id: '5', name: 'David Habimana', initials: 'DH', account: 'BK-55210' },
];

export function SendMoneyScreen() {
    const colors = useColors();
    const navigation = useNavigation();
    const { makeTransfer } = useBankingData();
    const [step, setStep] = useState<'contact' | 'amount' | 'summary' | 'success'>('contact');
    const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(null);
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [reference, setReference] = useState('');

    const numAmount = Number(amount);
    const fee = numAmount > 0 ? Math.max(1.25, numAmount * 0.005) : 0;

    const handleSend = () => {
        if (!selectedContact || numAmount <= 0) return;
        const result = makeTransfer({ recipient: selectedContact.name, amount: numAmount, fee, route: 'MoolaPay' });
        setReference(result.reference);
        setStep('success');
    };

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={() => step === 'contact' ? navigation.goBack() : setStep(step === 'summary' ? 'amount' : step === 'amount' ? 'contact' : 'contact')}>
                    <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Send Money To</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {step === 'contact' && (
                    <>
                        {/* Search */}
                        <View style={[styles.searchRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                            <Ionicons name="search" size={18} color={colors.textTertiary} />
                            <TextInput placeholder="Search contacts..." placeholderTextColor={colors.textTertiary} style={[styles.searchInput, { color: colors.textPrimary }]} />
                        </View>

                        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Recent Contacts</Text>
                        {contacts.map((c) => (
                            <Pressable key={c.id} style={[styles.contactRow, { backgroundColor: colors.surface, borderColor: selectedContact?.id === c.id ? colors.primary : colors.border }]} onPress={() => { setSelectedContact(c); setStep('amount'); }}>
                                <View style={[styles.contactAvatar, { backgroundColor: colors.primarySoft }]}>
                                    <Text style={[styles.contactInitials, { color: colors.primary }]}>{c.initials}</Text>
                                </View>
                                <View style={styles.contactInfo}>
                                    <Text style={[styles.contactName, { color: colors.textPrimary }]}>{c.name}</Text>
                                    <Text style={[styles.contactAccount, { color: colors.textSecondary }]}>{c.account}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
                            </Pressable>
                        ))}
                    </>
                )}

                {step === 'amount' && (
                    <View style={styles.amountArea}>
                        <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>Enter Amount</Text>
                        <View style={styles.amountInputRow}>
                            <Text style={[styles.currencySign, { color: colors.textPrimary }]}>$</Text>
                            <TextInput
                                value={amount}
                                onChangeText={setAmount}
                                placeholder="0"
                                placeholderTextColor={colors.textTertiary}
                                keyboardType="decimal-pad"
                                style={[styles.amountInput, { color: colors.textPrimary }]}
                                autoFocus
                            />
                        </View>
                        <View style={styles.presetRow}>
                            {['50', '100', '200', '500'].map((p) => (
                                <Pressable key={p} style={[styles.presetChip, { backgroundColor: colors.primarySoft, borderColor: colors.border }]} onPress={() => setAmount(p)}>
                                    <Text style={[styles.presetText, { color: colors.primary }]}>${p}</Text>
                                </Pressable>
                            ))}
                        </View>
                        <TextInput
                            value={note}
                            onChangeText={setNote}
                            placeholder="Add a note (optional)"
                            placeholderTextColor={colors.textTertiary}
                            style={[styles.noteInput, { color: colors.textPrimary, backgroundColor: colors.inputBackground, borderColor: colors.border }]}
                        />
                        <Pressable style={[styles.primaryBtn, { backgroundColor: colors.primary }, numAmount <= 0 && styles.btnDisabled]} onPress={() => setStep('summary')} disabled={numAmount <= 0}>
                            <Text style={styles.primaryBtnText}>Continue</Text>
                        </Pressable>
                    </View>
                )}

                {step === 'summary' && (
                    <View style={styles.summaryArea}>
                        <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <Text style={[styles.summaryTitle, { color: colors.textPrimary }]}>Transfer Summary</Text>
                            <View style={[styles.summaryContactRow]}>
                                <View style={[styles.contactAvatar, { backgroundColor: colors.primarySoft }]}>
                                    <Text style={[styles.contactInitials, { color: colors.primary }]}>{selectedContact?.initials}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.contactName, { color: colors.textPrimary }]}>{selectedContact?.name}</Text>
                                    <Text style={[styles.contactAccount, { color: colors.textSecondary }]}>{selectedContact?.account}</Text>
                                </View>
                            </View>
                            <View style={[styles.summaryDivider, { borderColor: colors.border }]} />
                            {[
                                ['Amount', `$${numAmount.toFixed(2)}`],
                                ['Fee', `$${fee.toFixed(2)}`],
                                ['Total', `$${(numAmount + fee).toFixed(2)}`],
                            ].map(([label, value]) => (
                                <View key={label} style={styles.summaryRow}>
                                    <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>{label}</Text>
                                    <Text style={[styles.summaryValue, { color: colors.textPrimary, fontFamily: label === 'Total' ? 'Sora_700Bold' : 'DMSans_700Bold' }]}>{value}</Text>
                                </View>
                            ))}
                        </View>
                        <Pressable style={[styles.primaryBtn, { backgroundColor: colors.primary }]} onPress={handleSend}>
                            <Text style={styles.primaryBtnText}>Confirm & Send</Text>
                        </Pressable>
                    </View>
                )}

                {step === 'success' && (
                    <View style={styles.successArea}>
                        <View style={[styles.successIcon, { backgroundColor: colors.successLight }]}>
                            <Ionicons name="checkmark-circle" size={64} color={colors.success} />
                        </View>
                        <Text style={[styles.successTitle, { color: colors.textPrimary }]}>Transfer Successful!</Text>
                        <Text style={[styles.successAmount, { color: colors.primary }]}>${numAmount.toFixed(2)}</Text>
                        <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
                            Sent to {selectedContact?.name}{'\n'}Reference: {reference}
                        </Text>
                        <Pressable style={[styles.primaryBtn, { backgroundColor: colors.primary }]} onPress={() => navigation.goBack()}>
                            <Text style={styles.primaryBtnText}>Done</Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
    },
    backBtn: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontFamily: 'Sora_700Bold', fontSize: 18 },
    scroll: { paddingHorizontal: 20, paddingBottom: 40, gap: 12 },
    searchRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, height: 48, gap: 10 },
    searchInput: { flex: 1, fontFamily: 'DMSans_500Medium', fontSize: 14 },
    sectionLabel: { fontFamily: 'DMSans_700Bold', fontSize: 13, marginTop: 8 },
    contactRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, borderWidth: 1, padding: 14, gap: 12 },
    contactAvatar: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    contactInitials: { fontFamily: 'DMSans_700Bold', fontSize: 16 },
    contactInfo: { flex: 1, gap: 2 },
    contactName: { fontFamily: 'DMSans_700Bold', fontSize: 15 },
    contactAccount: { fontFamily: 'DMSans_500Medium', fontSize: 12 },
    amountArea: { alignItems: 'center', gap: 20, paddingTop: 32 },
    amountLabel: { fontFamily: 'DMSans_500Medium', fontSize: 14 },
    amountInputRow: { flexDirection: 'row', alignItems: 'center' },
    currencySign: { fontFamily: 'Sora_700Bold', fontSize: 36 },
    amountInput: { fontFamily: 'Sora_700Bold', fontSize: 48, minWidth: 100, textAlign: 'center' },
    presetRow: { flexDirection: 'row', gap: 10 },
    presetChip: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 10 },
    presetText: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
    noteInput: { width: '100%', borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 14, fontFamily: 'DMSans_500Medium', fontSize: 14 },
    primaryBtn: { width: '100%', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
    btnDisabled: { opacity: 0.45 },
    primaryBtnText: { color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 16 },
    summaryArea: { gap: 20, paddingTop: 16 },
    summaryCard: { borderRadius: 20, borderWidth: 1, padding: 20, gap: 14 },
    summaryTitle: { fontFamily: 'Sora_700Bold', fontSize: 18, textAlign: 'center' },
    summaryContactRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    summaryDivider: { borderBottomWidth: 1 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
    summaryLabel: { fontFamily: 'DMSans_500Medium', fontSize: 14 },
    summaryValue: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
    successArea: { alignItems: 'center', gap: 16, paddingTop: 48 },
    successIcon: { width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center' },
    successTitle: { fontFamily: 'Sora_700Bold', fontSize: 24 },
    successAmount: { fontFamily: 'Sora_700Bold', fontSize: 36 },
    successDesc: { fontFamily: 'DMSans_500Medium', fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
