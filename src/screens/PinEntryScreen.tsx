import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../theme/ThemeModeContext';

type PinEntryScreenProps = {
  identifier: string;
  onBack: () => void;
  onVerified: () => void;
};

const PIN_LENGTH = 4;
const DEMO_PIN = '2026';

export function PinEntryScreen({ identifier, onBack, onVerified }: PinEntryScreenProps) {
  const colors = useColors();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const maskedIdentifier = useMemo(() => {
    if (identifier.includes('@')) {
      const [name, domain] = identifier.split('@');
      return `${name.slice(0, 2)}***@${domain}`;
    }
    if (identifier.length <= 4) return identifier;
    return `${identifier.slice(0, 2)}***${identifier.slice(-2)}`;
  }, [identifier]);

  const appendDigit = (digit: string) => {
    if (pin.length >= PIN_LENGTH) return;
    const nextPin = pin + digit;
    setPin(nextPin);
    setError('');

    if (nextPin.length === PIN_LENGTH) {
      if (nextPin === DEMO_PIN) {
        onVerified();
        return;
      }
      setError('Incorrect PIN. Use 2026 for demo.');
      setPin('');
    }
  };

  const removeDigit = () => {
    setPin((c) => c.slice(0, -1));
    setError('');
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={onBack}>
        <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
      </Pressable>

      <View style={styles.header}>
        <View style={[styles.lockIcon, { backgroundColor: colors.primarySoft }]}>
          <Ionicons name="lock-closed" size={28} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Enter Your PIN</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Verifying session for {maskedIdentifier}
        </Text>
        <Text style={[styles.hint, { color: colors.primary }]}>Demo PIN: 2026</Text>
      </View>

      {/* PIN Dots */}
      <View style={styles.pinDots}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.pinDot,
              {
                backgroundColor: i < pin.length ? colors.primary : 'transparent',
                borderColor: i < pin.length ? colors.primary : colors.border,
              },
            ]}
          />
        ))}
      </View>
      {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}

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

      <Pressable>
        <Text style={[styles.forgotPin, { color: colors.primary }]}>Forgot PIN?</Text>
      </Pressable>
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
  lockIcon: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  title: {
    fontSize: 24, fontFamily: 'Sora_700Bold',
  },
  subtitle: {
    fontSize: 14, fontFamily: 'DMSans_500Medium', textAlign: 'center',
  },
  hint: {
    fontSize: 12, fontFamily: 'DMSans_700Bold', marginTop: 4,
  },
  pinDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 32,
  },
  pinDot: {
    width: 18, height: 18, borderRadius: 9, borderWidth: 2,
  },
  errorText: {
    fontFamily: 'DMSans_500Medium', fontSize: 13,
    textAlign: 'center', marginTop: 12,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 'auto',
    marginBottom: 16,
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
    fontSize: 28, fontFamily: 'Sora_700Bold',
  },
  forgotPin: {
    textAlign: 'center',
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
    marginBottom: 32,
  },
});