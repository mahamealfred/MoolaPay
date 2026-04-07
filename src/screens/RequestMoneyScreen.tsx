import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../theme/ThemeModeContext';

const contacts = [
    { id: '1', name: 'Ange Bizimana', initials: 'AB' },
    { id: '2', name: 'Jean Munezero', initials: 'JM' },
    { id: '3', name: 'Alice Niyonsaba', initials: 'AN' },
];

export function RequestMoneyScreen() {
    const colors = useColors();
    const navigation = useNavigation();
    const [step, setStep] = useState<'contact' | 'amount' | 'success'>('contact');
    const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(null);
    const [amount, setAmount] = useState('');

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={() => step === 'contact' ? navigation.goBack() : setStep('contact')}>
                    <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Request Money</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {step === 'contact' && (
                    <>
                        <Text style={[styles.label, { color: colors.textSecondary }]}>Request From</Text>
                        {contacts.map((c) => (
                            <Pressable key={c.id} style={[styles.contactRow, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => { setSelectedContact(c); setStep('amount'); }}>
                                <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
                                    <Text style={[styles.initials, { color: colors.primary }]}>{c.initials}</Text>
                                </View>
                                <Text style={[styles.name, { color: colors.textPrimary }]}>{c.name}</Text>
                                <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
                            </Pressable>
                        ))}
                    </>
                )}

                {step === 'amount' && (
                    <View style={styles.amountArea}>
                        <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>How much do you want to request?</Text>
                        <View style={styles.amountRow}>
                            <Text style={[styles.dollar, { color: colors.textPrimary }]}>$</Text>
                            <TextInput value={amount} onChangeText={setAmount} placeholder="0" placeholderTextColor={colors.textTertiary} keyboardType="decimal-pad" style={[styles.amountInput, { color: colors.textPrimary }]} autoFocus />
                        </View>
                        <View style={styles.presetRow}>
                            {['50', '100', '200'].map((p) => (
                                <Pressable key={p} style={[styles.preset, { backgroundColor: colors.primarySoft }]} onPress={() => setAmount(p)}>
                                    <Text style={[styles.presetText, { color: colors.primary }]}>${p}</Text>
                                </Pressable>
                            ))}
                        </View>
                        <Pressable style={[styles.btn, { backgroundColor: colors.primary }, !Number(amount) && styles.btnDisabled]} onPress={() => setStep('success')} disabled={!Number(amount)}>
                            <Text style={styles.btnText}>Send Request</Text>
                        </Pressable>
                    </View>
                )}

                {step === 'success' && (
                    <View style={styles.successArea}>
                        <View style={[styles.successIcon, { backgroundColor: colors.primarySoft }]}>
                            <Ionicons name="paper-plane" size={48} color={colors.primary} />
                        </View>
                        <Text style={[styles.successTitle, { color: colors.textPrimary }]}>Request Sent!</Text>
                        <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
                            You requested ${Number(amount).toFixed(2)} from{'\n'}{selectedContact?.name}
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
    scroll: { paddingHorizontal: 20, paddingBottom: 40, gap: 12 },
    label: { fontFamily: 'DMSans_700Bold', fontSize: 13, marginTop: 8 },
    contactRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, borderWidth: 1, padding: 14, gap: 12 },
    avatar: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    initials: { fontFamily: 'DMSans_700Bold', fontSize: 15 },
    name: { flex: 1, fontFamily: 'DMSans_700Bold', fontSize: 15 },
    amountArea: { alignItems: 'center', gap: 24, paddingTop: 40 },
    amountLabel: { fontFamily: 'DMSans_500Medium', fontSize: 14 },
    amountRow: { flexDirection: 'row', alignItems: 'center' },
    dollar: { fontFamily: 'Sora_700Bold', fontSize: 36 },
    amountInput: { fontFamily: 'Sora_700Bold', fontSize: 48, minWidth: 80, textAlign: 'center' },
    presetRow: { flexDirection: 'row', gap: 10 },
    preset: { borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10 },
    presetText: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
    btn: { width: '100%', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
    btnDisabled: { opacity: 0.45 },
    btnText: { color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 16 },
    successArea: { alignItems: 'center', gap: 16, paddingTop: 60 },
    successIcon: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    successTitle: { fontFamily: 'Sora_700Bold', fontSize: 24 },
    successDesc: { fontFamily: 'DMSans_500Medium', fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
