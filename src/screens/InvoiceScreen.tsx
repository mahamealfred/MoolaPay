import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../theme/ThemeModeContext';

export function InvoiceScreen() {
    const colors = useColors();
    const navigation = useNavigation();
    const [step, setStep] = useState<'create' | 'success'>('create');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [clientName, setClientName] = useState('');
    const invoiceNumber = `INV-${Math.floor(1000 + Math.random() * 9000)}`;

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Create Invoice</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {step === 'create' && (
                    <>
                        <View style={[styles.invoiceHeader, { backgroundColor: colors.primarySoft }]}>
                            <Ionicons name="document-text" size={32} color={colors.primary} />
                            <Text style={[styles.invoiceNum, { color: colors.primary }]}>{invoiceNumber}</Text>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Client Name</Text>
                            <TextInput value={clientName} onChangeText={setClientName} placeholder="Enter client name" placeholderTextColor={colors.textTertiary} style={[styles.input, { color: colors.textPrimary, backgroundColor: colors.inputBackground, borderColor: colors.border }]} />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Amount</Text>
                            <View style={[styles.amountRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                                <Text style={[styles.currency, { color: colors.textTertiary }]}>$</Text>
                                <TextInput value={amount} onChangeText={setAmount} placeholder="0.00" placeholderTextColor={colors.textTertiary} keyboardType="decimal-pad" style={[styles.amountInput, { color: colors.textPrimary }]} />
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Description</Text>
                            <TextInput value={description} onChangeText={setDescription} placeholder="What's this invoice for?" placeholderTextColor={colors.textTertiary} multiline numberOfLines={3} style={[styles.input, styles.textArea, { color: colors.textPrimary, backgroundColor: colors.inputBackground, borderColor: colors.border }]} />
                        </View>

                        <Pressable style={[styles.btn, { backgroundColor: colors.primary }, (!clientName || !Number(amount)) && styles.btnDisabled]} onPress={() => setStep('success')} disabled={!clientName || !Number(amount)}>
                            <Text style={styles.btnText}>Create Invoice</Text>
                        </Pressable>
                    </>
                )}

                {step === 'success' && (
                    <View style={styles.successArea}>
                        <View style={[styles.successIcon, { backgroundColor: colors.primarySoft }]}>
                            <Ionicons name="checkmark-done" size={48} color={colors.primary} />
                        </View>
                        <Text style={[styles.successTitle, { color: colors.textPrimary }]}>Invoice Created!</Text>
                        <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
                            Your invoice link is ready to share
                        </Text>
                        <View style={[styles.invoiceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>Invoice {invoiceNumber}</Text>
                            <Text style={[styles.cardAmount, { color: colors.textPrimary }]}>${Number(amount).toFixed(2)}</Text>
                            <Text style={[styles.cardClient, { color: colors.textSecondary }]}>For: {clientName}</Text>
                        </View>
                        <View style={styles.shareRow}>
                            <Pressable style={[styles.shareBtn, { backgroundColor: colors.primarySoft }]}>
                                <Ionicons name="copy" size={20} color={colors.primary} />
                                <Text style={[styles.shareBtnText, { color: colors.primary }]}>Copy Link</Text>
                            </Pressable>
                            <Pressable style={[styles.shareBtn, { backgroundColor: colors.primarySoft }]}>
                                <Ionicons name="share-social" size={20} color={colors.primary} />
                                <Text style={[styles.shareBtnText, { color: colors.primary }]}>Share</Text>
                            </Pressable>
                        </View>
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
    scroll: { paddingHorizontal: 20, paddingBottom: 40, gap: 16 },
    invoiceHeader: { borderRadius: 16, padding: 20, alignItems: 'center', gap: 8 },
    invoiceNum: { fontFamily: 'Sora_700Bold', fontSize: 16 },
    inputWrapper: { gap: 6 },
    inputLabel: { fontFamily: 'DMSans_700Bold', fontSize: 13, marginLeft: 2 },
    input: { borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, height: 50, fontFamily: 'DMSans_500Medium', fontSize: 15 },
    textArea: { height: 100, textAlignVertical: 'top', paddingTop: 14 },
    amountRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, height: 50 },
    currency: { fontFamily: 'Sora_700Bold', fontSize: 18, marginRight: 4 },
    amountInput: { flex: 1, fontFamily: 'DMSans_500Medium', fontSize: 15 },
    btn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
    btnDisabled: { opacity: 0.45 },
    btnText: { color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 16 },
    successArea: { alignItems: 'center', gap: 16, paddingTop: 32 },
    successIcon: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    successTitle: { fontFamily: 'Sora_700Bold', fontSize: 24 },
    successDesc: { fontFamily: 'DMSans_500Medium', fontSize: 14, textAlign: 'center' },
    invoiceCard: { borderRadius: 16, borderWidth: 1, padding: 20, gap: 6, width: '100%', alignItems: 'center' },
    cardLabel: { fontFamily: 'DMSans_500Medium', fontSize: 12 },
    cardAmount: { fontFamily: 'Sora_700Bold', fontSize: 32 },
    cardClient: { fontFamily: 'DMSans_500Medium', fontSize: 13 },
    shareRow: { flexDirection: 'row', gap: 12 },
    shareBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12 },
    shareBtnText: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
});
