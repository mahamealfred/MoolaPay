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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../theme/ThemeModeContext';

type SignInScreenProps = {
  onSignIn: (identifier: string) => void;
  onBack: () => void;
  onSignUp: () => void;
};

export function SignInScreen({ onSignIn, onBack, onSignUp }: SignInScreenProps) {
  const colors = useColors();
  const [identifier, setIdentifier] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const trimmedIdentifier = identifier.trim();
  const identifierIsValid = trimmedIdentifier.includes('@') || trimmedIdentifier.length >= 6;
  const passcodeIsValid = passcode.trim().length >= 6;
  const formIsValid = identifierIsValid && passcodeIsValid;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
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
          <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
          </Pressable>

          {/* Logo */}
          <View style={styles.logoRow}>
            <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
              <Ionicons name="wallet" size={24} color="#FFFFFF" />
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Login to Your{'\n'}Account</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Enter your credentials to access your account
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email or Phone</Text>
              <View style={[styles.inputRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                <Ionicons name="mail-outline" size={18} color={colors.textTertiary} style={{ marginRight: 10 }} />
                <TextInput
                  value={identifier}
                  onChangeText={setIdentifier}
                  placeholder="name@example.com"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={[styles.input, { color: colors.textPrimary }]}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Password</Text>
              <View style={[styles.inputRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                <Ionicons name="lock-closed-outline" size={18} color={colors.textTertiary} style={{ marginRight: 10 }} />
                <TextInput
                  value={passcode}
                  onChangeText={setPasscode}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textTertiary}
                  secureTextEntry={!showPassword}
                  style={[styles.input, { color: colors.textPrimary }]}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={colors.textTertiary}
                  />
                </Pressable>
              </View>
            </View>

            {/* Remember & Forgot */}
            <View style={styles.optionsRow}>
              <View style={styles.rememberRow}>
                <View style={[styles.checkbox, { borderColor: colors.primary, backgroundColor: colors.primary }]}>
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                </View>
                <Text style={[styles.rememberText, { color: colors.textSecondary }]}>Remember me</Text>
              </View>
              <Pressable>
                <Text style={[styles.forgotText, { color: colors.primary }]}>Forgot Password?</Text>
              </Pressable>
            </View>

            {/* Sign In Button */}
            <Pressable
              style={[styles.primaryBtn, { backgroundColor: colors.primary }, !formIsValid && styles.btnDisabled]}
              onPress={() => onSignIn(trimmedIdentifier)}
              disabled={!formIsValid}
            >
              <Text style={styles.primaryBtnText}>Sign In</Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.textTertiary }]}>or continue with</Text>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <Pressable style={[styles.socialBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                <Ionicons name="logo-google" size={20} color={colors.textPrimary} />
              </Pressable>
              <Pressable style={[styles.socialBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                <Ionicons name="logo-apple" size={20} color={colors.textPrimary} />
              </Pressable>
              <Pressable style={[styles.socialBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                <Ionicons name="finger-print" size={20} color={colors.textPrimary} />
              </Pressable>
            </View>
          </View>

          {/* Footer */}
          <Pressable onPress={onSignUp} style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Don't have an account?{' '}
              <Text style={{ color: colors.primary, fontFamily: 'DMSans_700Bold' }}>Sign Up</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 20,
  },
  backBtn: {
    marginTop: 16,
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    alignItems: 'center',
    marginTop: 8,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    gap: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Sora_700Bold',
    lineHeight: 34,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputWrapper: {
    gap: 6,
  },
  inputLabel: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    marginLeft: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  input: {
    flex: 1,
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  forgotText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  primaryBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  btnDisabled: {
    opacity: 0.45,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontFamily: 'Sora_700Bold',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 16,
  },
  footerText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
  },
});