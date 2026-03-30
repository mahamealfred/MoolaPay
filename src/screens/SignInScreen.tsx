import { useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { GradientShell } from '../components/GradientShell';
import { colors, radii, spacing } from '../theme/tokens';

type SignInScreenProps = {
  onSignIn: (identifier: string) => void;
  onBack: () => void;
};

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences';
}) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secureTextEntry ?? false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(focusAnim, { toValue: 1, duration: 180, useNativeDriver: false }).start();
  };
  const handleBlur = () => {
    setFocused(false);
    Animated.timing(focusAnim, { toValue: 0, duration: 180, useNativeDriver: false }).start();
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [error ? colors.coral : colors.line, error ? colors.coral : colors.mint],
  });

  return (
    <View style={inputStyles.wrapper}>
      <Text style={inputStyles.label}>{label}</Text>
      <Animated.View style={[inputStyles.inputRow, { borderColor }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={hidden}
          keyboardType={keyboardType ?? 'default'}
          autoCapitalize={autoCapitalize ?? 'sentences'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyles.input}
        />
        {secureTextEntry && (
          <Pressable onPress={() => setHidden(h => !h)} style={inputStyles.eyeBtn} hitSlop={8}>
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color={focused ? colors.mint : colors.textSecondary}
            />
          </Pressable>
        )}
      </Animated.View>
      {error ? <Text style={inputStyles.error}>{error}</Text> : null}
    </View>
  );
}

const inputStyles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    marginLeft: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderWidth: 1.5,
    borderRadius: radii.button,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    color: colors.textPrimary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
  },
  eyeBtn: { padding: 4 },
  error: {
    color: colors.coral,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    marginLeft: 2,
  },
});

export function SignInScreen({ onSignIn, onBack }: SignInScreenProps) {
  const [identifier, setIdentifier] = useState('');
  const [passcode, setPasscode] = useState('');

  const trimmedIdentifier = identifier.trim();
  const identifierIsValid =
    trimmedIdentifier.includes('@') || trimmedIdentifier.length >= 6;
  const passcodeIsValid = passcode.trim().length >= 6;
  const formIsValid = identifierIsValid && passcodeIsValid;

  const identifierError =
    trimmedIdentifier.length > 0 && !identifierIsValid
      ? 'Enter a valid email or client ID'
      : '';
  const passcodeError =
    passcode.length > 0 && !passcodeIsValid ? 'At least 6 characters required' : '';

  return (
    <GradientShell>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back */}
          <Pressable style={styles.backBtn} onPress={onBack} hitSlop={8}>
            <Ionicons name="arrow-back" size={18} color={colors.textPrimary} />
          </Pressable>

          {/* Brand mark */}
          <View style={styles.logoRow}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoLetter}>M</Text>
            </View>
            <Text style={styles.logoLabel}>MoolaPay</Text>
          </View>

          {/* Heading */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue to your account</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <InputField
              label="Email or Client ID"
              value={identifier}
              onChangeText={setIdentifier}
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={identifierError}
            />
            <InputField
              label="Passcode"
              value={passcode}
              onChangeText={setPasscode}
              placeholder="Enter your passcode"
              secureTextEntry
              error={passcodeError}
            />

            <Pressable style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot passcode?</Text>
            </Pressable>

            <Pressable
              style={[styles.primaryBtn, !formIsValid && styles.primaryBtnDisabled]}
              onPress={() => onSignIn(trimmedIdentifier)}
              disabled={!formIsValid}
            >
              <Text style={styles.primaryBtnText}>Sign In</Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Biometric */}
            <Pressable style={styles.biometricBtn}>
              <View style={styles.biometricIcon}>
                <Ionicons name="finger-print-outline" size={22} color={colors.mint} />
              </View>
              <Text style={styles.biometricText}>Sign in with Biometrics</Text>
            </Pressable>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Your account is protected with end-to-end encryption.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientShell>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  backBtn: {
    marginTop: spacing.sm,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Brand
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: spacing.md,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: '#fff',
    fontFamily: 'Sora_700Bold',
    fontSize: 22,
    lineHeight: 26,
  },
  logoLabel: {
    color: colors.textPrimary,
    fontFamily: 'Sora_700Bold',
    fontSize: 20,
  },
  // Heading
  header: {
    gap: 6,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: 'Sora_700Bold',
    fontSize: 28,
    lineHeight: 36,
  },
  subtitle: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
  },
  // Form
  form: {
    gap: spacing.md,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: -4,
  },
  forgotText: {
    color: colors.mint,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  primaryBtn: {
    backgroundColor: colors.mint,
    borderRadius: radii.button,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryBtnDisabled: {
    opacity: 0.45,
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'Sora_700Bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.line,
  },
  dividerText: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  // Biometric
  biometricBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radii.button,
    paddingVertical: 14,
    backgroundColor: colors.panel,
  },
  biometricIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(21,107,91,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  biometricText: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  // Footer
  footer: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 'auto',
    paddingTop: spacing.lg,
  },
});