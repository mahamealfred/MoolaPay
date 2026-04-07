import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../theme/ThemeModeContext';

const friends = [
    { id: '1', name: 'Ange Bizimana', initials: 'AB', selected: false },
    { id: '2', name: 'Jean Munezero', initials: 'JM', selected: false },
    { id: '3', name: 'Alice Niyonsaba', initials: 'AN', selected: false },
    { id: '4', name: 'Aline Mukiza', initials: 'AM', selected: false },
    { id: '5', name: 'David Habimana', initials: 'DH', selected: false },
];

export function SplitBillScreen() {
    const colors = useColors();
    const navigation = useNavigation();
    const [step, setStep] = useState<'members' | 'amount' | 'review' | 'success'>('members');
    const [selected, setSelected] = useState<string[]>([]);
    const [totalAmount, setTotalAmount] = useState('');

    const numAmount = Number(totalAmount);
    const splitCount = selected.length + 1; // includes self
    const perPerson = numAmount > 0 ? numAmount / splitCount : 0;

    const toggleMember = (id: string) => {
        setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    };

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={() => step === 'members' ? navigation.goBack() : setStep(step === 'review' ? 'amount' : step === 'amount' ? 'members' : 'members')}>
                    <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Split Bill</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {step === 'members' && (
                    <>
                        <Text style={[styles.label, { color: colors.textPrimary }]}>Who's Splitting the Bill?</Text>
                        <Text style={[styles.sublabel, { color: colors.textSecondary }]}>Select friends to split with</Text>
                        {friends.map((f) => {
                            const isSelected = selected.includes(f.id);
                            return (
                                <Pressable key={f.id} style={[styles.personRow, { backgroundColor: colors.surface, borderColor: isSelected ? colors.primary : colors.border }]} onPress={() => toggleMember(f.id)}>
                                    <View style={[styles.avatar, { backgroundColor: isSelected ? colors.primary : colors.primarySoft }]}>
                                        <Text style={[styles.initials, { color: isSelected ? '#FFFFFF' : colors.primary }]}>{f.initials}</Text>
                                    </View>
                                    <Text style={[styles.personName, { color: colors.textPrimary }]}>{f.name}</Text>
                                    <View style={[styles.checkCircle, { borderColor: isSelected ? colors.primary : colors.border, backgroundColor: isSelected ? colors.primary : 'transparent' }]}>
                                        {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                                    </View>
                                </Pressable>
                            );
                        })}
                        <Pressable style={[styles.btn, { backgroundColor: colors.primary }, selected.length === 0 && styles.btnDisabled]} onPress={() => setStep('amount')} disabled={selected.length === 0}>
                            <Text style={styles.btnText}>Continue ({selected.length} selected)</Text>
                        </Pressable>
                    </>
                )}

                {step === 'amount' && (
                    <View style={styles.amountArea}>
                        <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>Total Bill Amount</Text>
                        <View style={styles.amountRow}>
                            <Text style={[styles.dollar, { color: colors.textPrimary }]}>$</Text>
                            <TextInput value={totalAmount} onChangeText={setTotalAmount} placeholder="0" placeholderTextColor={colors.textTertiary} keyboardType="decimal-pad" style={[styles.amountInput, { color: colors.textPrimary }]} autoFocus />
                        </View>
                        {numAmount > 0 && (
                            <View style={[styles.splitInfo, { backgroundColor: colors.primarySoft }]}>
                                <Text style={[styles.splitText, { color: colors.primary }]}>
                                    ${perPerson.toFixed(2)} per person ({splitCount} people)
                                </Text>
                            </View>
                        )}
                        <Pressable style={[styles.btn, { backgroundColor: colors.primary }, numAmount <= 0 && styles.btnDisabled]} onPress={() => setStep('review')} disabled={numAmount <= 0}>
                            <Text style={styles.btnText}>Review Split</Text>
                        </Pressable>
                    </View>
                )}

                {step === 'review' && (
                    <View style={styles.reviewArea}>
                        <Text style={[styles.reviewTitle, { color: colors.textPrimary }]}>Review Summary</Text>
                        <View style={[styles.reviewCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <View style={styles.reviewRow}><Text style={[styles.rowLabel, { color: colors.textSecondary }]}>Total</Text><Text style={[styles.rowValue, { color: colors.textPrimary }]}>${numAmount.toFixed(2)}</Text></View>
                            <View style={styles.reviewRow}><Text style={[styles.rowLabel, { color: colors.textSecondary }]}>People</Text><Text style={[styles.rowValue, { color: colors.textPrimary }]}>{splitCount}</Text></View>
                            <View style={[styles.divider, { borderColor: colors.border }]} />
                            <View style={styles.reviewRow}><Text style={[styles.rowLabel, { color: colors.textSecondary }]}>Per person</Text><Text style={[styles.rowValue, { color: colors.primary }]}>${perPerson.toFixed(2)}</Text></View>
                        </View>
                        <Pressable style={[styles.btn, { backgroundColor: colors.primary }]} onPress={() => setStep('success')}>
                            <Text style={styles.btnText}>Send Split Request</Text>
                        </Pressable>
                    </View>
                )}

                {step === 'success' && (
                    <View style={styles.successArea}>
                        <View style={[styles.successIcon, { backgroundColor: colors.successLight }]}>
                            <Ionicons name="people" size={48} color={colors.success} />
                        </View>
                        <Text style={[styles.successTitle, { color: colors.textPrimary }]}>Split Sent!</Text>
                        <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
                            You're splitting a bill of ${numAmount.toFixed(2)}{'\n'}${perPerson.toFixed(2)} per person
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
    label: { fontFamily: 'Sora_700Bold', fontSize: 20, marginTop: 8 },
    sublabel: { fontFamily: 'DMSans_500Medium', fontSize: 14 },
    personRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, borderWidth: 1.5, padding: 14, gap: 12 },
    avatar: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    initials: { fontFamily: 'DMSans_700Bold', fontSize: 15 },
    personName: { flex: 1, fontFamily: 'DMSans_700Bold', fontSize: 15 },
    checkCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
    btn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
    btnDisabled: { opacity: 0.45 },
    btnText: { color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 16 },
    amountArea: { alignItems: 'center', gap: 24, paddingTop: 40 },
    amountLabel: { fontFamily: 'DMSans_500Medium', fontSize: 14 },
    amountRow: { flexDirection: 'row', alignItems: 'center' },
    dollar: { fontFamily: 'Sora_700Bold', fontSize: 36 },
    amountInput: { fontFamily: 'Sora_700Bold', fontSize: 48, minWidth: 80, textAlign: 'center' },
    splitInfo: { borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12 },
    splitText: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
    reviewArea: { gap: 16, paddingTop: 16 },
    reviewTitle: { fontFamily: 'Sora_700Bold', fontSize: 20, textAlign: 'center' },
    reviewCard: { borderRadius: 20, borderWidth: 1, padding: 20, gap: 14 },
    reviewRow: { flexDirection: 'row', justifyContent: 'space-between' },
    rowLabel: { fontFamily: 'DMSans_500Medium', fontSize: 14 },
    rowValue: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
    divider: { borderBottomWidth: 1 },
    successArea: { alignItems: 'center', gap: 16, paddingTop: 48 },
    successIcon: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    successTitle: { fontFamily: 'Sora_700Bold', fontSize: 24 },
    successDesc: { fontFamily: 'DMSans_500Medium', fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
