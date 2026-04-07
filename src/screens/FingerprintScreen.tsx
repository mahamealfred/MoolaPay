import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../theme/ThemeModeContext';

type FingerprintScreenProps = {
    onBack: () => void;
    onComplete: () => void;
};

export function FingerprintScreen({ onBack, onComplete }: FingerprintScreenProps) {
    const colors = useColors();

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={onBack}>
                <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
            </Pressable>

            <View style={styles.content}>
                <View style={[styles.iconCircle, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons name="finger-print" size={72} color={colors.primary} />
                </View>

                <Text style={[styles.title, { color: colors.textPrimary }]}>Set Your Fingerprint</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Add your fingerprint for faster and{'\n'}more secure sign in
                </Text>

                <View style={[styles.infoCard, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons name="information-circle" size={20} color={colors.primary} />
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                        Please put your finger on the fingerprint scanner to get started.
                    </Text>
                </View>
            </View>

            <View style={styles.buttonsArea}>
                <Pressable style={[styles.primaryBtn, { backgroundColor: colors.primary }]} onPress={onComplete}>
                    <Text style={styles.primaryBtnText}>Enable Fingerprint</Text>
                </Pressable>
                <Pressable style={[styles.skipBtn, { borderColor: colors.border }]} onPress={onComplete}>
                    <Text style={[styles.skipBtnText, { color: colors.textSecondary }]}>Skip for Now</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    backBtn: {
        width: 44, height: 44, borderRadius: 14, borderWidth: 1,
        alignItems: 'center', justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        paddingBottom: 40,
    },
    iconCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Sora_700Bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'DMSans_500Medium',
        textAlign: 'center',
        lineHeight: 22,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 14,
        padding: 14,
        marginTop: 8,
    },
    infoText: {
        flex: 1,
        fontFamily: 'DMSans_500Medium',
        fontSize: 13,
        lineHeight: 20,
    },
    buttonsArea: {
        gap: 12,
        paddingBottom: 40,
    },
    primaryBtn: {
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
    },
    primaryBtnText: {
        color: '#FFFFFF',
        fontFamily: 'Sora_700Bold',
        fontSize: 16,
    },
    skipBtn: {
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1,
    },
    skipBtnText: {
        fontFamily: 'DMSans_700Bold',
        fontSize: 15,
    },
});
