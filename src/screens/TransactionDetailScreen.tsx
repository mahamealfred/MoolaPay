import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useColors } from '../theme/ThemeModeContext';
import type { RootStackParamList } from '../navigation/AppNavigator';

type DetailRoute = RouteProp<RootStackParamList, 'TransactionDetail'>;

export function TransactionDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute<DetailRoute>();
    const colors = useColors();
    const { transaction } = route.params;
    const isCredit = transaction.type === 'credit';

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
                </Pressable>
                <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Transaction Details</Text>
                <View style={{ width: 44 }} />
            </View>

            <View style={styles.body}>
                {/* Icon + Amount Hero */}
                <View style={styles.hero}>
                    <View style={[styles.heroIcon, { backgroundColor: isCredit ? colors.successLight : colors.errorLight }]}>
                        <Ionicons
                            name={isCredit ? 'arrow-down' : 'arrow-up'}
                            size={32}
                            color={isCredit ? colors.success : colors.error}
                        />
                    </View>
                    <Text style={[styles.heroAmount, { color: isCredit ? colors.success : colors.textPrimary }]}>
                        {isCredit ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: colors.successLight }]}>
                        <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
                        <Text style={[styles.statusText, { color: colors.success }]}>Completed</Text>
                    </View>
                </View>

                {/* Detail Card */}
                <View style={[styles.detailCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <DetailRow label="Recipient / Source" value={transaction.title} colors={colors} />
                    <DetailRow label="Category" value={transaction.category} colors={colors} />
                    <DetailRow label="Date" value={transaction.date} colors={colors} />
                    <DetailRow label="Type" value={isCredit ? 'Credit' : 'Debit'} colors={colors} />
                    <DetailRow label="Reference" value={`MP-${transaction.id.replace('txn_', '')}`} colors={colors} />
                    <DetailRow label="Status" value="Completed" colors={colors} isLast />
                </View>
            </View>
        </View>
    );
}

function DetailRow({
    label,
    value,
    colors,
    isLast,
}: {
    label: string;
    value: string;
    colors: ReturnType<typeof useColors>;
    isLast?: boolean;
}) {
    return (
        <View style={[detailRowStyles.row, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
            <Text style={[detailRowStyles.label, { color: colors.textSecondary }]}>{label}</Text>
            <Text style={[detailRowStyles.value, { color: colors.textPrimary }]}>{value}</Text>
        </View>
    );
}

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
    body: { paddingHorizontal: 20, gap: 24, paddingTop: 16 },
    hero: { alignItems: 'center', gap: 12 },
    heroIcon: {
        width: 72,
        height: 72,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroAmount: { fontFamily: 'Sora_700Bold', fontSize: 36 },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    statusDot: { width: 8, height: 8, borderRadius: 4 },
    statusText: { fontFamily: 'DMSans_700Bold', fontSize: 13 },
    detailCard: {
        borderRadius: 20,
        borderWidth: 1,
        overflow: 'hidden',
    },
});

const detailRowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 16,
    },
    label: { fontFamily: 'DMSans_500Medium', fontSize: 14 },
    value: { fontFamily: 'DMSans_700Bold', fontSize: 14, textAlign: 'right', maxWidth: '55%' },
});
