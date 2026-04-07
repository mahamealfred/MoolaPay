import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../theme/ThemeModeContext';

export function QRCodeScreen() {
    const colors = useColors();
    const navigation = useNavigation();

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Scan QR Code</Text>
                <View style={{ width: 44 }} />
            </View>

            <View style={styles.content}>
                {/* QR Display Area */}
                <View style={[styles.qrCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <View style={[styles.qrPlaceholder, { backgroundColor: colors.surfaceSecondary }]}>
                        <Ionicons name="qr-code" size={160} color={colors.textPrimary} />
                    </View>
                    <Text style={[styles.qrLabel, { color: colors.textPrimary }]}>Your Payment QR</Text>
                    <Text style={[styles.qrDesc, { color: colors.textSecondary }]}>
                        Let someone scan this code to send you money
                    </Text>
                </View>

                {/* Actions */}
                <View style={styles.actionsRow}>
                    <Pressable style={[styles.actionBtn, { backgroundColor: colors.primarySoft }]}>
                        <Ionicons name="scan" size={24} color={colors.primary} />
                        <Text style={[styles.actionText, { color: colors.primary }]}>Scan Code</Text>
                    </Pressable>
                    <Pressable style={[styles.actionBtn, { backgroundColor: colors.primarySoft }]}>
                        <Ionicons name="share-social" size={24} color={colors.primary} />
                        <Text style={[styles.actionText, { color: colors.primary }]}>Share</Text>
                    </Pressable>
                    <Pressable style={[styles.actionBtn, { backgroundColor: colors.primarySoft }]}>
                        <Ionicons name="download" size={24} color={colors.primary} />
                        <Text style={[styles.actionText, { color: colors.primary }]}>Save</Text>
                    </Pressable>
                </View>

                <View style={[styles.infoCard, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons name="information-circle" size={18} color={colors.primary} />
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                        Point your camera at a QR code to scan it or share your code to receive payments instantly.
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
    backBtn: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontFamily: 'Sora_700Bold', fontSize: 18 },
    content: { flex: 1, paddingHorizontal: 20, gap: 24, paddingTop: 16 },
    qrCard: { borderRadius: 24, borderWidth: 1, padding: 24, alignItems: 'center', gap: 12 },
    qrPlaceholder: { width: 220, height: 220, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    qrLabel: { fontFamily: 'Sora_700Bold', fontSize: 18 },
    qrDesc: { fontFamily: 'DMSans_500Medium', fontSize: 13, textAlign: 'center' },
    actionsRow: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
    actionBtn: { alignItems: 'center', gap: 6, borderRadius: 16, paddingHorizontal: 20, paddingVertical: 16, minWidth: 90 },
    actionText: { fontFamily: 'DMSans_700Bold', fontSize: 12 },
    infoCard: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 14, padding: 14 },
    infoText: { flex: 1, fontFamily: 'DMSans_500Medium', fontSize: 13, lineHeight: 20 },
});
