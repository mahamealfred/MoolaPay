import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { GradientShell } from '../components/GradientShell';
import { colors, radii, spacing } from '../theme/tokens';

type PinEntryScreenProps = {
  identifier: string;
  onBack: () => void;
  onVerified: () => void;
};

const PIN_LENGTH = 4;
const DEMO_PIN = '2026';

export function PinEntryScreen({ identifier, onBack, onVerified }: PinEntryScreenProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const maskedIdentifier = useMemo(() => {
    if (identifier.includes('@')) {
      const [name, domain] = identifier.split('@');
      return `${name.slice(0, 2)}***@${domain}`;
    }

    if (identifier.length <= 4) {
      return identifier;
    }

    return `${identifier.slice(0, 2)}***${identifier.slice(-2)}`;
  }, [identifier]);

  const appendDigit = (digit: string) => {
    if (pin.length >= PIN_LENGTH) {
      return;
    }

    const nextPin = `${pin}${digit}`;
    setPin(nextPin);
    setError('');

    if (nextPin.length === PIN_LENGTH) {
      if (nextPin === DEMO_PIN) {
        onVerified();
        return;
      }

      setError('Incorrect secure PIN. Use 2026 for this demo flow.');
      setPin('');
    }
  };

  const removeDigit = () => {
    setPin((current) => current.slice(0, -1));
    setError('');
  };

  return (
    <GradientShell>
      <View style={styles.root}>
        <Pressable style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={18} color={colors.textPrimary} />
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>Secure verification</Text>
          <Text style={styles.title}>Enter your 4-digit secure PIN</Text>
          <Text style={styles.subtitle}>Verifying session for {maskedIdentifier}</Text>
        </View>

        <View style={styles.pinCard}>
          <View style={styles.pinDots}>
            {Array.from({ length: PIN_LENGTH }).map((_, index) => (
              <View key={index} style={[styles.pinDot, index < pin.length && styles.pinDotActive]} />
            ))}
          </View>
          <Text style={styles.helperText}>Demo PIN: 2026</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.keypad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'backspace'].map((key) => {
            if (!key) {
              return <View key="empty" style={styles.keypadSpacer} />;
            }

            if (key === 'backspace') {
              return (
                <Pressable key={key} style={styles.keypadKey} onPress={removeDigit}>
                  <Ionicons name="backspace-outline" size={22} color={colors.textPrimary} />
                </Pressable>
              );
            }

            return (
              <Pressable key={key} style={styles.keypadKey} onPress={() => appendDigit(key)}>
                <Text style={styles.keypadText}>{key}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </GradientShell>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.lg,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  eyebrow: {
    color: colors.amber,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: 'Sora_700Bold',
    fontSize: 30,
    lineHeight: 40,
  },
  subtitle: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
    lineHeight: 24,
  },
  pinCard: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.card,
    padding: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  pinDots: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: radii.full,
    backgroundColor: colors.surface.tertiary,
    borderWidth: 1,
    borderColor: colors.line,
  },
  pinDotActive: {
    backgroundColor: colors.mint,
    borderColor: colors.mint,
  },
  helperText: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  errorText: {
    color: colors.coral,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    textAlign: 'center',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  keypadKey: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keypadSpacer: {
    width: '30%',
  },
  keypadText: {
    color: colors.textPrimary,
    fontFamily: 'Sora_700Bold',
    fontSize: 24,
  },
});