import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../theme/ThemeModeContext';

const notifications = [
    { id: '1', icon: 'arrow-down-circle' as const, title: 'Payment Received', desc: 'You received $150 from Jean Munezero', time: '2 min ago', type: 'success' as const },
    { id: '2', icon: 'card' as const, title: 'Card Transaction', desc: 'Online purchase at Amazon - $49.99', time: '1 hour ago', type: 'info' as const },
    { id: '3', icon: 'shield-checkmark' as const, title: 'Security Alert', desc: 'New login detected from Kigali, RW', time: '3 hours ago', type: 'warning' as const },
    { id: '4', icon: 'arrow-up-circle' as const, title: 'Transfer Sent', desc: '$200 sent to Alice Niyonsaba', time: 'Yesterday', type: 'default' as const },
    { id: '5', icon: 'star' as const, title: 'Rewards Earned', desc: 'You earned $5.25 in rewards this week', time: 'Yesterday', type: 'success' as const },
    { id: '6', icon: 'megaphone' as const, title: 'New Feature', desc: 'Split bills with friends is now available!', time: '2 days ago', type: 'info' as const },
];

export function NotificationsScreen() {
    const colors = useColors();
    const navigation = useNavigation();

    const getIconColor = (type: string) => {
        switch (type) {
            case 'success': return colors.success;
            case 'warning': return colors.warning;
            case 'info': return colors.primary;
            default: return colors.textSecondary;
        }
    };

    const getIconBg = (type: string) => {
        switch (type) {
            case 'success': return colors.successLight;
            case 'warning': return colors.warningLight;
            case 'info': return colors.primarySoft;
            default: return colors.surfaceSecondary;
        }
    };

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Notifications</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
                <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>Today</Text>
                {notifications.slice(0, 3).map((item) => (
                    <View key={item.id} style={[styles.notifCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={[styles.notifIcon, { backgroundColor: getIconBg(item.type) }]}>
                            <Ionicons name={item.icon} size={20} color={getIconColor(item.type)} />
                        </View>
                        <View style={styles.notifContent}>
                            <Text style={[styles.notifTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                            <Text style={[styles.notifDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
                        </View>
                        <Text style={[styles.notifTime, { color: colors.textTertiary }]}>{item.time}</Text>
                    </View>
                ))}

                <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>Earlier</Text>
                {notifications.slice(3).map((item) => (
                    <View key={item.id} style={[styles.notifCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={[styles.notifIcon, { backgroundColor: getIconBg(item.type) }]}>
                            <Ionicons name={item.icon} size={20} color={getIconColor(item.type)} />
                        </View>
                        <View style={styles.notifContent}>
                            <Text style={[styles.notifTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                            <Text style={[styles.notifDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
                        </View>
                        <Text style={[styles.notifTime, { color: colors.textTertiary }]}>{item.time}</Text>
                    </View>
                ))}
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
    backBtn: {
        width: 44, height: 44, borderRadius: 14, borderWidth: 1,
        alignItems: 'center', justifyContent: 'center',
    },
    headerTitle: {
        fontFamily: 'Sora_700Bold', fontSize: 18,
    },
    list: { paddingHorizontal: 20, paddingBottom: 32, gap: 10 },
    groupLabel: {
        fontFamily: 'DMSans_700Bold', fontSize: 13, marginTop: 8, marginBottom: 4,
    },
    notifCard: {
        flexDirection: 'row', alignItems: 'center',
        borderRadius: 16, borderWidth: 1, padding: 14, gap: 12,
    },
    notifIcon: {
        width: 44, height: 44, borderRadius: 14,
        alignItems: 'center', justifyContent: 'center',
    },
    notifContent: { flex: 1, gap: 2 },
    notifTitle: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
    notifDesc: { fontFamily: 'DMSans_500Medium', fontSize: 12, lineHeight: 18 },
    notifTime: { fontFamily: 'DMSans_500Medium', fontSize: 11 },
});
