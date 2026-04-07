import { useState } from 'react';
import {
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

type SignUpScreenProps = {
    onBack: () => void;
    onSignUp: (identifier: string) => void;
};

export function SignUpScreen({ onBack, onSignUp }: SignUpScreenProps) {
    const colors = useColors();
    const [step, setStep] = useState<'info' | 'password' | 'verify'>('info');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const infoIsValid = fullName.trim().length >= 2 && email.includes('@');
    const passwordIsValid = password.length >= 6 && password === confirmPassword;

    const renderInfo = () => (
        <>
            <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Full Name</Text>
                <View style={[styles.inputRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                    <Ionicons name="person-outline" size={18} color={colors.textTertiary} style={{ marginRight: 10 }} />
                    <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Enter your full name"
                        placeholderTextColor={colors.textTertiary}
                        style={[styles.input, { color: colors.textPrimary }]}
                    />
                </View>
            </View>

            <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email Address</Text>
                <View style={[styles.inputRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                    <Ionicons name="mail-outline" size={18} color={colors.textTertiary} style={{ marginRight: 10 }} />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="name@example.com"
                        placeholderTextColor={colors.textTertiary}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={[styles.input, { color: colors.textPrimary }]}
                    />
                </View>
            </View>

            <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Phone Number</Text>
                <View style={[styles.inputRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                    <Ionicons name="call-outline" size={18} color={colors.textTertiary} style={{ marginRight: 10 }} />
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="+250 7XX XXX XXX"
                        placeholderTextColor={colors.textTertiary}
                        keyboardType="phone-pad"
                        style={[styles.input, { color: colors.textPrimary }]}
                    />
                </View>
            </View>

            <Pressable
                style={[styles.primaryBtn, { backgroundColor: colors.primary }, !infoIsValid && styles.btnDisabled]}
                onPress={() => setStep('password')}
                disabled={!infoIsValid}
            >
                <Text style={styles.primaryBtnText}>Continue</Text>
            </Pressable>
        </>
    );

    const renderPassword = () => (
        <>
            <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Create Password</Text>
                <View style={[styles.inputRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                    <Ionicons name="lock-closed-outline" size={18} color={colors.textTertiary} style={{ marginRight: 10 }} />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Min. 6 characters"
                        placeholderTextColor={colors.textTertiary}
                        secureTextEntry={!showPassword}
                        style={[styles.input, { color: colors.textPrimary }]}
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textTertiary} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Confirm Password</Text>
                <View style={[styles.inputRow, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                    <Ionicons name="lock-closed-outline" size={18} color={colors.textTertiary} style={{ marginRight: 10 }} />
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Re-enter password"
                        placeholderTextColor={colors.textTertiary}
                        secureTextEntry={!showPassword}
                        style={[styles.input, { color: colors.textPrimary }]}
                    />
                </View>
            </View>

            {/* Terms */}
            <Pressable style={styles.termsRow} onPress={() => setAgreedToTerms(!agreedToTerms)}>
                <View style={[styles.checkbox, { borderColor: agreedToTerms ? colors.primary : colors.border, backgroundColor: agreedToTerms ? colors.primary : 'transparent' }]}>
                    {agreedToTerms && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                </View>
                <Text style={[styles.termsText, { color: colors.textSecondary }]}>
                    I agree to the{' '}
                    <Text style={{ color: colors.primary }}>Terms & Conditions</Text>
                </Text>
            </Pressable>

            <Pressable
                style={[styles.primaryBtn, { backgroundColor: colors.primary }, (!passwordIsValid || !agreedToTerms) && styles.btnDisabled]}
                onPress={() => setStep('verify')}
                disabled={!passwordIsValid || !agreedToTerms}
            >
                <Text style={styles.primaryBtnText}>Create Account</Text>
            </Pressable>
        </>
    );

    const renderVerify = () => (
        <>
            <View style={styles.verifyCenter}>
                <View style={[styles.verifyIcon, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons name="mail-open" size={40} color={colors.primary} />
                </View>
                <Text style={[styles.verifyTitle, { color: colors.textPrimary }]}>Verify Your Email</Text>
                <Text style={[styles.verifyDesc, { color: colors.textSecondary }]}>
                    We've sent a verification code to{'\n'}{email}
                </Text>
            </View>

            <View style={styles.otpRow}>
                {[0, 1, 2, 3].map((i) => (
                    <View key={i} style={[styles.otpBox, { borderColor: otp.length > i ? colors.primary : colors.border, backgroundColor: colors.inputBackground }]}>
                        <Text style={[styles.otpText, { color: colors.textPrimary }]}>{otp[i] || ''}</Text>
                    </View>
                ))}
            </View>

            {/* Hidden input for OTP */}
            <TextInput
                value={otp}
                onChangeText={(v) => setOtp(v.slice(0, 4))}
                keyboardType="number-pad"
                maxLength={4}
                style={{ position: 'absolute', opacity: 0 }}
                autoFocus
            />

            <Pressable
                style={[styles.primaryBtn, { backgroundColor: colors.primary }, otp.length < 4 && styles.btnDisabled]}
                onPress={() => onSignUp(email)}
                disabled={otp.length < 4}
            >
                <Text style={styles.primaryBtnText}>Verify & Continue</Text>
            </Pressable>

            <Pressable style={styles.resendRow}>
                <Text style={[styles.resendText, { color: colors.textSecondary }]}>
                    Didn't receive code?{' '}
                    <Text style={{ color: colors.primary, fontFamily: 'DMSans_700Bold' }}>Resend</Text>
                </Text>
            </Pressable>
        </>
    );

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <View style={styles.topRow}>
                        <Pressable style={[styles.backBtn, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]} onPress={step === 'info' ? onBack : () => setStep(step === 'verify' ? 'password' : 'info')}>
                            <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
                        </Pressable>
                    </View>

                    {/* Logo */}
                    <View style={styles.logoRow}>
                        <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
                            <Ionicons name="wallet" size={24} color="#FFFFFF" />
                        </View>
                    </View>

                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.textPrimary }]}>
                            {step === 'verify' ? 'Verify Email' : 'Create New\nAccount'}
                        </Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            {step === 'info' ? 'Fill in your details to get started' :
                                step === 'password' ? 'Create a secure password' :
                                    'Enter the code we sent to your email'}
                        </Text>
                    </View>

                    {/* Step Indicator */}
                    <View style={styles.stepsRow}>
                        {['info', 'password', 'verify'].map((s, i) => (
                            <View key={s} style={styles.stepItem}>
                                <View style={[styles.stepDot, {
                                    backgroundColor: (['info', 'password', 'verify'].indexOf(step) >= i) ? colors.primary : colors.border,
                                }]} />
                            </View>
                        ))}
                    </View>

                    {step === 'info' && renderInfo()}
                    {step === 'password' && renderPassword()}
                    {step === 'verify' && renderVerify()}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 32,
        gap: 18,
    },
    topRow: { marginTop: 16 },
    backBtn: {
        width: 44, height: 44, borderRadius: 14, borderWidth: 1,
        alignItems: 'center', justifyContent: 'center',
    },
    logoRow: { alignItems: 'center', marginTop: 4 },
    logoCircle: {
        width: 64, height: 64, borderRadius: 20,
        alignItems: 'center', justifyContent: 'center',
    },
    header: { gap: 8, alignItems: 'center' },
    title: {
        fontSize: 26, fontFamily: 'Sora_700Bold', lineHeight: 34, textAlign: 'center',
    },
    subtitle: {
        fontSize: 14, fontFamily: 'DMSans_500Medium', textAlign: 'center',
    },
    stepsRow: {
        flexDirection: 'row', justifyContent: 'center', gap: 8,
    },
    stepItem: {},
    stepDot: {
        width: 40, height: 4, borderRadius: 2,
    },
    inputWrapper: { gap: 6 },
    inputLabel: {
        fontFamily: 'DMSans_700Bold', fontSize: 13, marginLeft: 2,
    },
    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, height: 52,
    },
    input: {
        flex: 1, fontFamily: 'DMSans_500Medium', fontSize: 15,
    },
    primaryBtn: {
        borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 4,
    },
    btnDisabled: { opacity: 0.45 },
    primaryBtnText: {
        color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 16,
    },
    termsRow: {
        flexDirection: 'row', alignItems: 'center', gap: 10,
    },
    checkbox: {
        width: 22, height: 22, borderRadius: 6, borderWidth: 1.5,
        alignItems: 'center', justifyContent: 'center',
    },
    termsText: {
        flex: 1, fontFamily: 'DMSans_500Medium', fontSize: 13,
    },
    verifyCenter: { alignItems: 'center', gap: 12, marginTop: 8 },
    verifyIcon: {
        width: 80, height: 80, borderRadius: 40,
        alignItems: 'center', justifyContent: 'center',
    },
    verifyTitle: {
        fontSize: 22, fontFamily: 'Sora_700Bold',
    },
    verifyDesc: {
        fontSize: 14, fontFamily: 'DMSans_500Medium', textAlign: 'center', lineHeight: 22,
    },
    otpRow: {
        flexDirection: 'row', justifyContent: 'center', gap: 12,
    },
    otpBox: {
        width: 56, height: 56, borderRadius: 14, borderWidth: 1.5,
        alignItems: 'center', justifyContent: 'center',
    },
    otpText: {
        fontSize: 24, fontFamily: 'Sora_700Bold',
    },
    resendRow: { alignItems: 'center' },
    resendText: {
        fontFamily: 'DMSans_500Medium', fontSize: 14,
    },
});
