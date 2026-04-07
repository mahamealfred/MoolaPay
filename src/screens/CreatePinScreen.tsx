import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../theme/ThemeModeContext';

type CreatePinScreenProps = {
    onBack: () => void;
    onPinCreated: () => void;
};

const PIN_LENGTH = 4;

export function CreatePinScreen({ onBack, onPinCreated }: CreatePinScreenProps) {
    const colors = useColors();
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [step, setStep] = useState<'create' | 'confirm'>('create');
    const [error, setError] = useState('');

    const currentPin = step === 'create' ? pin : confirmPin;

    const appendDigit = (digit: string) => {
        const current = step === 'create' ? pin : confirmPin;
        if (current.length >= PIN_LENGTH) return;

        const next = current + digit;
        if (step === 'create') {
            setPin(next);
            if (next.length === PIN_LENGTH) {
                setTimeout(() => setStep('confirm'), 300);
            }
        } else {
            setConfirmPin(next);
            if (next.length === PIN_LENGTH) {
                if (next === pin) {
                    onPinCreated();
                } else {
                    setError('PINs do not match. Try again.');
                    setConfirmPin('');
                }
            }
        }
        setError('');
    };

    const removeDigit = () => {
        if (step === 'create') {
            setPin((c) => c.slice(0, -1));
        } else {
            setConfirmPin((c) => c.slice(0, -1));
        }
        setError('');
    };

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={step === 'create' ? onBack : () => { setStep('create'); setConfirmPin(''); }}>
                <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
            </Pressable>

            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>
                    {step === 'create' ? 'Create New PIN' : 'Confirm Your PIN'}
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    {step === 'create' ? 'Set up a 4-digit PIN for quick access' : 'Re-enter your PIN to confirm'}
                </Text>
            </View>

            {/* PIN Dots */}
            <View style={styles.pinDotsWrap}>
                <View style={styles.pinDots}>
                    {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.pinDot,
                                {
                                    backgroundColor: i < currentPin.length ? colors.primary : colors.border,
                                    borderColor: i < currentPin.length ? colors.primary : colors.border,
                                },
                            ]}
                        />
                    ))}
                </View>
                {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
            </View>

            {/* Keypad */}
            <View style={styles.keypad}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'].map((key) => {
                    if (!key) return <View key="empty" style={styles.keypadSpacer} />;
                    if (key === 'back') {
                        return (
                            <Pressable key={key} style={[styles.keypadKey, { backgroundColor: colors.surfaceSecondary }]} onPress={removeDigit}>
                                <Ionicons name="backspace-outline" size={24} color={colors.textPrimary} />
                            </Pressable>
                        );
                    }
                    return (
                        <Pressable key={key} style={[styles.keypadKey, { backgroundColor: colors.surfaceSecondary }]} onPress={() => appendDigit(key)}>
                            <Text style={[styles.keypadText, { color: colors.textPrimary }]}>{key}</Text>
                        </Pressable>
                    );
                })}
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
    header: {
        alignItems: 'center',
        gap: 8,
        marginTop: 32,
    },
    title: {
        fontSize: 24, fontFamily: 'Sora_700Bold', textAlign: 'center',
    },
    subtitle: {
        fontSize: 14, fontFamily: 'DMSans_500Medium', textAlign: 'center',
    },
    pinDotsWrap: {
        alignItems: 'center',
        marginTop: 40,
        gap: 12,
    },
    pinDots: {
        flexDirection: 'row',
        gap: 16,
    },
    pinDot: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
    },
    errorText: {
        fontFamily: 'DMSans_500Medium',
        fontSize: 13,
        textAlign: 'center',
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginTop: 'auto',
        marginBottom: 40,
        paddingHorizontal: 16,
    },
    keypadKey: {
        width: '28%',
        aspectRatio: 1.6,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    keypadSpacer: {
        width: '28%',
        aspectRatio: 1.6,
    },
    keypadText: {
        fontSize: 28,
        fontFamily: 'Sora_700Bold',
    },
});
