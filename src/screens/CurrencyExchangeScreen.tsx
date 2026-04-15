import { useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../theme/ThemeModeContext';

// ── Mock exchange rates (all relative to 1 USD) ──
const RATES_TO_USD: Record<string, number> = {
    USD: 1,
    BTC: 0.0000146,
    RWF: 1340,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 154.5,
    CHF: 0.88,
    CAD: 1.37,
    AUD: 1.55,
    KES: 129,
    UGX: 3780,
    TZS: 2560,
    NGN: 1570,
    ZAR: 18.5,
    CNY: 7.26,
    INR: 83.4,
    GHS: 15.2,
    BIF: 2870,
};

type CurrencyMeta = { code: string; name: string; flag: string };

const CURRENCIES: CurrencyMeta[] = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'BTC', name: 'Bitcoin', flag: '₿' },
    { code: 'RWF', name: 'Rwandan Franc', flag: '🇷🇼' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
    { code: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬' },
    { code: 'TZS', name: 'Tanzanian Shilling', flag: '🇹🇿' },
    { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
    { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'GHS', name: 'Ghanaian Cedi', flag: '🇬🇭' },
    { code: 'BIF', name: 'Burundian Franc', flag: '🇧🇮' },
];

function convert(amount: number, from: string, to: string): number {
    const fromRate = RATES_TO_USD[from] ?? 1;
    const toRate = RATES_TO_USD[to] ?? 1;
    // amount in "from" → USD → "to"
    return (amount / fromRate) * toRate;
}

function formatConverted(value: number, code: string): string {
    if (code === 'BTC') return value.toFixed(8);
    if (['JPY', 'RWF', 'UGX', 'TZS', 'KES', 'NGN', 'BIF'].includes(code)) return Math.round(value).toLocaleString();
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getRate(from: string, to: string): string {
    const r = convert(1, from, to);
    return formatConverted(r, to);
}

// ── Currency Picker Modal ──
function CurrencyPicker({
    visible,
    onClose,
    onSelect,
    selected,
    colors,
}: {
    visible: boolean;
    onClose: () => void;
    onSelect: (code: string) => void;
    selected: string;
    colors: ReturnType<typeof useColors>;
}) {
    const [search, setSearch] = useState('');

    const filtered = useMemo(
        () =>
            CURRENCIES.filter(
                (c) =>
                    c.code.toLowerCase().includes(search.toLowerCase()) ||
                    c.name.toLowerCase().includes(search.toLowerCase()),
            ),
        [search],
    );

    const renderItem = useCallback(
        ({ item }: { item: CurrencyMeta }) => {
            const isSelected = item.code === selected;
            return (
                <Pressable
                    style={[
                        pickerStyles.row,
                        { borderBottomColor: colors.border },
                        isSelected && { backgroundColor: colors.primarySoft },
                    ]}
                    onPress={() => {
                        onSelect(item.code);
                        setSearch('');
                        onClose();
                    }}
                >
                    <Text style={pickerStyles.flag}>{item.flag}</Text>
                    <View style={pickerStyles.rowInfo}>
                        <Text style={[pickerStyles.rowCode, { color: colors.textPrimary }]}>{item.code}</Text>
                        <Text style={[pickerStyles.rowName, { color: colors.textSecondary }]}>{item.name}</Text>
                    </View>
                    {isSelected && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
                </Pressable>
            );
        },
        [colors, onClose, onSelect, selected],
    );

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={[pickerStyles.overlay]}>
                <View style={[pickerStyles.sheet, { backgroundColor: colors.surface }]}>
                    <View style={pickerStyles.header}>
                        <Text style={[pickerStyles.title, { color: colors.textPrimary }]}>Select Currency</Text>
                        <Pressable onPress={onClose}>
                            <Ionicons name="close-circle" size={28} color={colors.textTertiary} />
                        </Pressable>
                    </View>
                    <View style={[pickerStyles.searchWrap, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                        <Ionicons name="search" size={18} color={colors.textTertiary} />
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Search currency..."
                            placeholderTextColor={colors.textTertiary}
                            style={[pickerStyles.searchInput, { color: colors.textPrimary }]}
                        />
                    </View>
                    <FlatList
                        data={filtered}
                        keyExtractor={(i) => i.code}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </Modal>
    );
}

// ── Main Screen ──
export function CurrencyExchangeScreen() {
    const navigation = useNavigation();
    const colors = useColors();

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('RWF');
    const [amount, setAmount] = useState('1');
    const [pickerTarget, setPickerTarget] = useState<'from' | 'to' | null>(null);

    const numericAmount = parseFloat(amount) || 0;
    const converted = convert(numericAmount, fromCurrency, toCurrency);
    const rateStr = getRate(fromCurrency, toCurrency);
    const fromMeta = CURRENCIES.find((c) => c.code === fromCurrency)!;
    const toMeta = CURRENCIES.find((c) => c.code === toCurrency)!;

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
                </Pressable>
                <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Currency Exchange</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* From Card */}
                <View style={[styles.exchangeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>From</Text>
                    <Pressable style={[styles.currencyRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]} onPress={() => setPickerTarget('from')}>
                        <Text style={styles.currencyFlag}>{fromMeta.flag}</Text>
                        <Text style={[styles.currencyCode, { color: colors.textPrimary }]}>{fromCurrency}</Text>
                        <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                    </Pressable>
                    <View style={[styles.amountRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                        <TextInput
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="decimal-pad"
                            style={[styles.amountInput, { color: colors.textPrimary }]}
                            placeholder="0"
                            placeholderTextColor={colors.textTertiary}
                        />
                    </View>
                </View>

                {/* Swap Button */}
                <View style={styles.swapWrap}>
                    <Pressable style={[styles.swapBtn, { backgroundColor: colors.primary }]} onPress={handleSwap}>
                        <Ionicons name="swap-vertical" size={24} color="#FFFFFF" />
                    </Pressable>
                    <View style={[styles.ratePill, { backgroundColor: colors.primarySoft }]}>
                        <Text style={[styles.rateText, { color: colors.primary }]}>
                            1 {fromCurrency} = {rateStr} {toCurrency}
                        </Text>
                    </View>
                </View>

                {/* To Card */}
                <View style={[styles.exchangeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>To</Text>
                    <Pressable style={[styles.currencyRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]} onPress={() => setPickerTarget('to')}>
                        <Text style={styles.currencyFlag}>{toMeta.flag}</Text>
                        <Text style={[styles.currencyCode, { color: colors.textPrimary }]}>{toCurrency}</Text>
                        <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
                    </Pressable>
                    <View style={[styles.resultBox, { backgroundColor: colors.primarySoft }]}>
                        <Text style={[styles.resultValue, { color: colors.primary }]}>
                            {formatConverted(converted, toCurrency)}
                        </Text>
                        <Text style={[styles.resultLabel, { color: colors.textSecondary }]}>{toMeta.name}</Text>
                    </View>
                </View>

                {/* Convert Button */}
                <Pressable style={[styles.convertBtn, { backgroundColor: colors.primary }]}>
                    <Ionicons name="repeat" size={20} color="#FFFFFF" />
                    <Text style={styles.convertBtnText}>Convert</Text>
                </Pressable>

                {/* Info */}
                <View style={[styles.infoCard, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                    <Ionicons name="information-circle-outline" size={18} color={colors.textTertiary} />
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                        Rates are indicative and updated periodically. Final rates may vary at the time of conversion.
                    </Text>
                </View>
            </ScrollView>

            {/* Picker Modal */}
            <CurrencyPicker
                visible={pickerTarget !== null}
                onClose={() => setPickerTarget(null)}
                onSelect={(code) => {
                    if (pickerTarget === 'from') setFromCurrency(code);
                    else setToCurrency(code);
                }}
                selected={pickerTarget === 'from' ? fromCurrency : toCurrency}
                colors={colors}
            />
        </View>
    );
}

// ── Styles ──
const styles = StyleSheet.create({
    root: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 8,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageTitle: { fontFamily: 'Sora_700Bold', fontSize: 20 },
    scroll: { paddingHorizontal: 20, paddingBottom: 40, gap: 16, paddingTop: 8 },
    exchangeCard: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 18,
        gap: 12,
    },
    cardLabel: { fontFamily: 'DMSans_700Bold', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 },
    currencyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    currencyFlag: { fontSize: 22 },
    currencyCode: { fontFamily: 'Sora_700Bold', fontSize: 18, flex: 1 },
    amountRow: {
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 16,
        height: 56,
        justifyContent: 'center',
    },
    amountInput: { fontFamily: 'Sora_700Bold', fontSize: 28 },
    swapWrap: { alignItems: 'center', gap: 8, marginVertical: -4 },
    swapBtn: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratePill: {
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    rateText: { fontFamily: 'DMSans_700Bold', fontSize: 13 },
    resultBox: {
        borderRadius: 14,
        padding: 16,
        alignItems: 'center',
        gap: 4,
    },
    resultValue: { fontFamily: 'Sora_700Bold', fontSize: 30 },
    resultLabel: { fontFamily: 'DMSans_500Medium', fontSize: 13 },
    convertBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 16,
        paddingVertical: 16,
        marginTop: 4,
    },
    convertBtnText: { color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 16 },
    infoCard: {
        flexDirection: 'row',
        gap: 10,
        borderRadius: 14,
        borderWidth: 1,
        padding: 14,
    },
    infoText: { fontFamily: 'DMSans_500Medium', fontSize: 12, flex: 1 },
});

const pickerStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    sheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 16,
        paddingHorizontal: 20,
        maxHeight: '75%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: { fontFamily: 'Sora_700Bold', fontSize: 20 },
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 14,
        height: 46,
        marginBottom: 8,
    },
    searchInput: { flex: 1, fontFamily: 'DMSans_500Medium', fontSize: 15 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
    },
    flag: { fontSize: 26 },
    rowInfo: { flex: 1, gap: 2 },
    rowCode: { fontFamily: 'Sora_700Bold', fontSize: 16 },
    rowName: { fontFamily: 'DMSans_500Medium', fontSize: 12 },
});
