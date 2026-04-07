import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../theme/ThemeModeContext';
import { useBankingData } from '../state/BankingDataContext';

export function ActivityScreen() {
    const colors = useColors();
    const navigation = useNavigation();
    const { transactions } = useBankingData();

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Activity</Text>
                <Pressable style={[styles.filterBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                    <Ionicons name="filter" size={18} color={colors.textPrimary} />
                </Pressable>
            </View>

            {/* Filter Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                {['All', 'Income', 'Expenses', 'Transfers', 'Bills'].map((chip, i) => (
                    <Pressable key={chip} style={[styles.chip, { backgroundColor: i === 0 ? colors.primary : colors.surfaceSecondary, borderColor: i === 0 ? colors.primary : colors.border }]}>
                        <Text style={[styles.chipText, { color: i === 0 ? '#FFFFFF' : colors.textSecondary }]}>{chip}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>Today</Text>
                {transactions.slice(0, 2).map((tx) => (
                    <View key={tx.id} style={[styles.txRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={[styles.txIcon, { backgroundColor: tx.type === 'credit' ? colors.successLight : colors.errorLight }]}>
                            <Ionicons name={tx.type === 'credit' ? 'arrow-down' : 'arrow-up'} size={18} color={tx.type === 'credit' ? colors.success : colors.error} />
                        </View>
                        <View style={styles.txInfo}>
                            <Text style={[styles.txTitle, { color: colors.textPrimary }]}>{tx.title}</Text>
                            <Text style={[styles.txCat, { color: colors.textSecondary }]}>{tx.category} · {tx.date}</Text>
                        </View>
                        <Text style={[styles.txAmount, { color: tx.type === 'credit' ? colors.success : colors.textPrimary }]}>
                            {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                        </Text>
                    </View>
                ))}

                <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>Yesterday</Text>
                {transactions.slice(2).map((tx) => (
                    <View key={tx.id} style={[styles.txRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={[styles.txIcon, { backgroundColor: tx.type === 'credit' ? colors.successLight : colors.errorLight }]}>
                            <Ionicons name={tx.type === 'credit' ? 'arrow-down' : 'arrow-up'} size={18} color={tx.type === 'credit' ? colors.success : colors.error} />
                        </View>
                        <View style={styles.txInfo}>
                            <Text style={[styles.txTitle, { color: colors.textPrimary }]}>{tx.title}</Text>
                            <Text style={[styles.txCat, { color: colors.textSecondary }]}>{tx.category} · {tx.date}</Text>
                        </View>
                        <Text style={[styles.txAmount, { color: tx.type === 'credit' ? colors.success : colors.textPrimary }]}>
                            {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    backBtn: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontFamily: 'Sora_700Bold', fontSize: 18 },
    filterBtn: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    chipRow: { paddingHorizontal: 20, paddingVertical: 12, gap: 8 },
    chip: { borderRadius: 20, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 8 },
    chipText: { fontFamily: 'DMSans_700Bold', fontSize: 13 },
    scroll: { paddingHorizontal: 20, paddingBottom: 40, gap: 10 },
    groupLabel: { fontFamily: 'DMSans_700Bold', fontSize: 13, marginTop: 8 },
    txRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, borderWidth: 1, padding: 14, gap: 12 },
    txIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    txInfo: { flex: 1, gap: 2 },
    txTitle: { fontFamily: 'DMSans_700Bold', fontSize: 15 },
    txCat: { fontFamily: 'DMSans_500Medium', fontSize: 12 },
    txAmount: { fontFamily: 'Sora_700Bold', fontSize: 15 },
});
