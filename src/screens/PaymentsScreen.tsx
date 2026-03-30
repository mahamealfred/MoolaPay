import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { GradientShell } from '../components/GradientShell';
import type { RootTabsParamList } from '../navigation/AppNavigator';
import { SectionTitle } from '../components/SectionTitle';
import { paymentModes, serviceCatalog } from '../services/paymentServices';
import { useBankingData } from '../state/BankingDataContext';
import { colors, radii, spacing } from '../theme/tokens';

const amountPresets = ['50', '150', '500', '1000'] as const;
const transferSteps = ['Details', 'Review', 'Success'] as const;
const serviceFieldConfig = {
  'Airtime Service': {
    label: 'Phone number',
    placeholder: 'Mobile number to recharge',
    listLabel: 'Recent numbers',
    reviewLabel: 'Mobile number',
    noteTitle: 'Instant airtime delivery',
    noteBody: 'Airtime purchases are validated against the recipient number before submission.',
  },
  Remittance: {
    label: 'Recipient',
    placeholder: 'Name, account number, or route',
    listLabel: 'Recent beneficiaries',
    reviewLabel: 'Account reference',
    noteTitle: 'Secure transfer routing',
    noteBody: 'Transfers are reviewed with beneficiary and fee confirmation before submission.',
  },
  'Water Service': {
    label: 'Water account',
    placeholder: 'Customer name or water account number',
    listLabel: 'Saved water payees',
    reviewLabel: 'Water account',
    noteTitle: 'Utility payment check',
    noteBody: 'Bill references are validated before payment is submitted.',
  },
  'RRA Service': {
    label: 'TIN or declaration',
    placeholder: 'Taxpayer number or declaration reference',
    listLabel: 'Saved RRA payees',
    reviewLabel: 'Tax reference',
    noteTitle: 'Revenue payment check',
    noteBody: 'Tax references are validated before final confirmation.',
  },
  'Electricity Service': {
    label: 'Meter number',
    placeholder: 'Postpaid meter or customer account number',
    listLabel: 'Saved electricity payees',
    reviewLabel: 'Meter number',
    noteTitle: 'Electricity bill check',
    noteBody: 'Electricity accounts are reviewed against the selected service before payment.',
  },
  'IRemboPay Service': {
    label: 'Reference number',
    placeholder: 'IRemboPay reference number',
    listLabel: 'Saved IRemboPay payees',
    reviewLabel: 'Reference number',
    noteTitle: 'Civic payment check',
    noteBody: 'Government payment references are reviewed before submission.',
  },
  'RNIT Service': {
    label: 'Policy number',
    placeholder: 'Insurance policy or member number',
    listLabel: 'Saved RNIT payees',
    reviewLabel: 'Policy number',
    noteTitle: 'Policy validation',
    noteBody: 'Insurance references are checked before the payment is sent.',
  },
  'School Fees Payment Service': {
    label: 'Student code',
    placeholder: 'Student code or invoice number',
    listLabel: 'Saved student payees',
    reviewLabel: 'Student code',
    noteTitle: 'School payment check',
    noteBody: 'Student references are reviewed before tuition payment is sent.',
  },
  'Canal+ Service': {
    label: 'Subscriber number',
    placeholder: 'Canal+ subscriber number',
    listLabel: 'Saved Canal+ payees',
    reviewLabel: 'Subscriber number',
    noteTitle: 'Subscription renewal check',
    noteBody: 'Subscription references are confirmed before renewal payment is submitted.',
  },
  'Electricity Prepared Service': {
    label: 'Prepared meter',
    placeholder: 'Prepared meter number',
    listLabel: 'Saved prepared meters',
    reviewLabel: 'Prepared meter',
    noteTitle: 'Prepared token check',
    noteBody: 'Prepared meter details are reviewed before token purchase.',
  },
} as const;
const recentBeneficiaries = [
  {
    id: 'ange',
    initials: 'AB',
    name: 'Ange Bizimana',
    route: 'Moola Wallet',
    account: 'MW-20498',
  },
  {
    id: 'jean',
    initials: 'JM',
    name: 'Jean Munezero',
    route: 'BK Transfer',
    account: 'BK-883120',
  },
  {
    id: 'alice',
    initials: 'AN',
    name: 'Alice Niyonsaba',
    route: 'Agent Cashout',
    account: 'AG-44381',
  },
] as const;

export function PaymentsScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabsParamList>>();
  const route = useRoute<RouteProp<RootTabsParamList, 'Payments'>>();
  const { makeTransfer } = useBankingData();
  const [paymentMode, setPaymentMode] = useState<(typeof paymentModes)[number]>('transfer');
  const [selectedService, setSelectedService] = useState<string>('Remittance');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [transferReference, setTransferReference] = useState('MP-2048');
  // Service payment stepper state
  const [serviceStep, setServiceStep] = useState<'validate' | 'amount' | 'confirm' | 'waiting' | 'success'>();
  const [serviceValidated, setServiceValidated] = useState(false);
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const stepOpacity = useRef(new Animated.Value(1)).current;
  const stepTranslateY = useRef(new Animated.Value(0)).current;

  const selectedBeneficiary = recentBeneficiaries.find((beneficiary) => beneficiary.id === selectedRecipient) ?? null;
  const currentServices = serviceCatalog[paymentMode];
  const selectedServiceConfig = serviceFieldConfig[selectedService as keyof typeof serviceFieldConfig] ?? serviceFieldConfig.Remittance;
  const filteredBeneficiaries = useMemo(() => {
    const query = recipient.trim().toLowerCase();

    if (!query) {
      return recentBeneficiaries;
    }

    return recentBeneficiaries.filter(
      (beneficiary) =>
        beneficiary.name.toLowerCase().includes(query) ||
        beneficiary.account.toLowerCase().includes(query) ||
        beneficiary.route.toLowerCase().includes(query),
    );
  }, [recipient]);

  const activeRecipient = recipient.trim();
  const numericAmount = Number(amount);
  const amountIsValid = Number.isFinite(numericAmount) && numericAmount > 0;
  const formIsValid = selectedService.length > 0 && activeRecipient.length >= 2 && amountIsValid;
  const activeStepIndex = step === 'form' ? 0 : step === 'review' ? 1 : 2;

  const transferFee = useMemo(() => {
    if (!amountIsValid) {
      return 0;
    }

    return Math.max(1.25, numericAmount * 0.005);
  }, [amountIsValid, numericAmount]);

  const totalDebit = useMemo(() => numericAmount + transferFee, [numericAmount, transferFee]);

  useEffect(() => {
    stepOpacity.setValue(0);
    stepTranslateY.setValue(18);

    Animated.parallel([
      Animated.timing(stepOpacity, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(stepTranslateY, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [step, stepOpacity, stepTranslateY]);

  useEffect(() => {
    if (step !== 'success') {
      return;
    }

    const timeoutId = setTimeout(() => {
      navigation.navigate('Home');
      resetFlow();
    }, 1800);

    return () => clearTimeout(timeoutId);
  }, [navigation, step]);

  useEffect(() => {
    const initialMode = route.params?.initialMode;
    const initialService = route.params?.initialService;

    if (initialMode) {
      setPaymentMode(initialMode);
      setSelectedService(initialService ?? serviceCatalog[initialMode][0]);
      setStep('form');
    }
  }, [route.params?.initialMode, route.params?.initialService]);

  function handleContinue() {
    if (!formIsValid) {
      return;
    }

    setStep('review');
  }

  function handleSend() {
    const { reference } = makeTransfer({
      recipient: activeRecipient,
      amount: numericAmount,
      fee: transferFee,
      route: selectedBeneficiary?.route ?? selectedService,
    });

    setTransferReference(reference);
    setStep('success');
  }

  function handleRecipientChange(value: string) {
    setRecipient(value);

    if (selectedBeneficiary && value.trim() !== selectedBeneficiary.name) {
      setSelectedRecipient(null);
    }
  }

  function handleModeChange(mode: (typeof paymentModes)[number]) {
    setPaymentMode(mode);
    setSelectedService(serviceCatalog[mode][0]);
    setSelectedRecipient(null);
    setServiceStep(undefined);
  }

  function handleBeneficiarySelect(beneficiaryId: string) {
    const beneficiary = recentBeneficiaries.find((entry) => entry.id === beneficiaryId);

    if (!beneficiary) {
      return;
    }

    setSelectedRecipient(beneficiary.id);
    setRecipient(beneficiary.name);
  }

  function resetFlow() {
    setPaymentMode('transfer');
    setSelectedService('Remittance');
    setRecipient('');
    setAmount('');
    setReason('');
    setSelectedRecipient(null);
    setTransferReference('MP-2048');
    setStep('form');
    setServiceStep(undefined);
    setServiceValidated(false);
    setServiceDetails(null);
  }

  let stepContent;
  // Service payment stepper UI (clean 3-step flow)
  if (serviceStep) {
    if (serviceStep === 'validate') {
      stepContent = (
        <View style={styles.formCard}>
          <Text style={styles.label}>Enter {selectedServiceConfig.label}</Text>
          <TextInput
            value={recipient}
            onChangeText={setRecipient}
            placeholder={selectedServiceConfig.placeholder}
            placeholderTextColor="#8A95A5"
            style={styles.input}
          />
          <Pressable
            style={[styles.button, recipient.length < 3 && styles.buttonDisabled]}
            onPress={() => setServiceStep('amount')}
            disabled={recipient.length < 3}
          >
            <Text style={styles.buttonText}>Validate</Text>
          </Pressable>
        </View>
      );
    } else if (serviceStep === 'amount') {
      stepContent = (
        <View style={styles.formCard}>
          <Text style={styles.label}>Enter Amount</Text>
          <View style={styles.amountWrap}>
            <Text style={styles.currency}>USD</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="decimal-pad"
              placeholderTextColor="#8A95A5"
              style={styles.amountInput}
            />
          </View>
          <View style={styles.presetsRow}>
            {amountPresets.map((preset) => (
              <Pressable key={preset} style={styles.presetChip} onPress={() => setAmount(preset)}>
                <Text style={styles.presetText}>${preset}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable style={[styles.button, !amountIsValid && styles.buttonDisabled]} onPress={() => setServiceStep('confirm')}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </View>
      );
    } else if (serviceStep === 'confirm') {
      stepContent = (
        <View style={styles.reviewCard}>
          <Text style={styles.reviewLabel}>Service</Text>
          <Text style={styles.reviewValue}>{selectedService}</Text>
          <Text style={styles.reviewLabel}>{selectedServiceConfig.label}</Text>
          <Text style={styles.reviewValue}>{recipient}</Text>
          <Text style={styles.reviewLabel}>Amount</Text>
          <Text style={styles.reviewValue}>${numericAmount.toFixed(2)}</Text>
          <Pressable style={styles.button} onPress={() => {
            setServiceStep('waiting');
            setTimeout(() => setServiceStep('success'), 1500);
          }}>
            <Text style={styles.buttonText}>Confirm and Pay</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => setServiceStep('amount')}>
            <Text style={styles.secondaryButtonText}>Edit Amount</Text>
          </Pressable>
        </View>
      );
    } else if (serviceStep === 'waiting') {
      stepContent = (
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>Processing payment...</Text>
        </View>
      );
    } else if (serviceStep === 'success') {
      stepContent = (
        <View style={styles.successCard}>
          <View style={styles.successIconWrap}>
            <Ionicons name="checkmark" size={28} color={colors.primary.contrast} />
          </View>
          <Text style={styles.successTitle}>Payment Successful</Text>
          <Text style={styles.successBody}>
            ${numericAmount.toFixed(2)} paid for {selectedService} to {recipient}.
          </Text>
          <Pressable style={styles.button} onPress={resetFlow}>
            <Text style={styles.buttonText}>Done</Text>
          </Pressable>
        </View>
      );
    }
  } else if (step === 'form') {
    // ...existing code for transfer/bill form...
    stepContent = (
      <>
        <View style={styles.formCard}>
          <Text style={styles.label}>Payment type</Text>
          <View style={styles.modeSwitcher}>
            <Pressable style={[styles.modeChip, paymentMode === 'transfer' && styles.modeChipActive]} onPress={() => handleModeChange('transfer')}>
              <Text style={[styles.modeChipText, paymentMode === 'transfer' && styles.modeChipTextActive]}>Transfer</Text>
            </Pressable>
            <Pressable style={[styles.modeChip, paymentMode === 'bill' && styles.modeChipActive]} onPress={() => handleModeChange('bill')}>
              <Text style={[styles.modeChipText, paymentMode === 'bill' && styles.modeChipTextActive]}>Bill Payment</Text>
            </Pressable>
          </View>

          <Text style={styles.label}>Available services</Text>
          <View style={styles.serviceGrid}>
            {currentServices.map((service) => {
              const isSelected = selectedService === service;

              return (
                <Pressable key={service} style={[styles.serviceCard, isSelected && styles.serviceCardActive]} onPress={() => {
                  setSelectedService(service);
                  setServiceStep('validate');
                  setRecipient('');
                  setAmount('');
                  setServiceValidated(false);
                  setServiceDetails(null);
                }}>
                  <Text style={[styles.serviceName, isSelected && styles.serviceNameActive]}>{service}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Only show the rest of the form if not in service stepper */}
          {false && (
            <>
              <Text style={styles.label}>{selectedServiceConfig.label}</Text>
              <TextInput
                value={recipient}
                onChangeText={handleRecipientChange}
                placeholder={selectedServiceConfig.placeholder}
                placeholderTextColor="#8A95A5"
                style={styles.input}
              />

              <View style={styles.beneficiaryHeaderRow}>
                <Text style={styles.subtleLabel}>{selectedServiceConfig.listLabel}</Text>
                <Text style={styles.subtleValue}>{filteredBeneficiaries.length} available</Text>
              </View>

              <View style={styles.beneficiaryList}>
                {filteredBeneficiaries.map((beneficiary) => {
                  const isSelected = selectedRecipient === beneficiary.id;

                  return (
                    <Pressable
                      key={beneficiary.id}
                      style={[styles.beneficiaryCard, isSelected && styles.beneficiaryCardSelected]}
                      onPress={() => handleBeneficiarySelect(beneficiary.id)}
                    >
                      <View style={[styles.avatar, isSelected && styles.avatarSelected]}>
                        <Text style={styles.avatarText}>{beneficiary.initials}</Text>
                      </View>
                      <View style={styles.beneficiaryDetails}>
                        <Text style={styles.beneficiaryName}>{beneficiary.name}</Text>
                        <Text style={styles.beneficiaryMeta}>{beneficiary.route}</Text>
                      </View>
                      <View style={styles.beneficiaryAccountWrap}>
                        <Text style={styles.beneficiaryAccount}>{beneficiary.account}</Text>
                        {isSelected ? <Ionicons name="checkmark-circle" size={18} color={colors.mint} /> : null}
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              {selectedBeneficiary ? (
                <View style={styles.selectedBeneficiaryCard}>
                  <Text style={styles.selectedBeneficiaryTitle}>Selected destination</Text>
                  <Text style={styles.selectedBeneficiaryName}>{selectedBeneficiary?.name}</Text>
                  <Text style={styles.selectedBeneficiaryMeta}>
                    {selectedBeneficiary?.route} . {selectedBeneficiary?.account}
                  </Text>
                </View>
              ) : null}

              <Text style={styles.label}>Amount</Text>
              <View style={styles.amountWrap}>
                <Text style={styles.currency}>USD</Text>
                <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  placeholderTextColor="#8A95A5"
                  style={styles.amountInput}
                />
              </View>

              <View style={styles.presetsRow}>
                {amountPresets.map((preset) => (
                  <Pressable key={preset} style={styles.presetChip} onPress={() => setAmount(preset)}>
                    <Text style={styles.presetText}>${preset}</Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.label}>Reason</Text>
              <TextInput
                value={reason}
                onChangeText={setReason}
                placeholder="Optional note"
                placeholderTextColor="#8A95A5"
                style={styles.input}
              />

              <Pressable style={[styles.button, !formIsValid && styles.buttonDisabled]} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue Transfer</Text>
              </Pressable>
            </>
          )}
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>{selectedServiceConfig.noteTitle}</Text>
          <Text style={styles.noteBody}>{selectedServiceConfig.noteBody}</Text>
        </View>
      </>
    );
  } else if (step === 'review') {
    stepContent = (
      <View style={styles.reviewCard}>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Payment type</Text>
          <Text style={styles.reviewValue}>{paymentMode === 'bill' ? 'Bill Payment' : 'Transfer'}</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Service</Text>
          <Text style={styles.reviewValue}>{selectedService}</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Recipient</Text>
          <Text style={styles.reviewValue}>{activeRecipient}</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Delivery route</Text>
          <Text style={styles.reviewValue}>{selectedBeneficiary?.route ?? selectedService}</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>{selectedServiceConfig.reviewLabel}</Text>
          <Text style={styles.reviewValue}>{selectedBeneficiary?.account ?? 'Entered manually'}</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Transfer amount</Text>
          <Text style={styles.reviewValue}>${numericAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Transfer fee</Text>
          <Text style={styles.reviewValue}>${transferFee.toFixed(2)}</Text>
        </View>
        <View style={styles.reviewDivider} />
        <View style={styles.reviewRow}>
          <Text style={styles.reviewTotalLabel}>Total debit</Text>
          <Text style={styles.reviewTotalValue}>${totalDebit.toFixed(2)}</Text>
        </View>
        <View style={styles.reasonBox}>
          <Text style={styles.reasonLabel}>Reference</Text>
          <Text style={styles.reasonValue}>{reason.trim() || 'Wallet transfer'}</Text>
        </View>

        <Pressable style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Confirm and Send</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => setStep('form')}>
          <Text style={styles.secondaryButtonText}>Edit Transfer</Text>
        </Pressable>
      </View>
    );
  } else if (step === 'success') {
    stepContent = (
      <View style={styles.successCard}>
        <View style={styles.successIconWrap}>
          <Ionicons name="checkmark" size={28} color={colors.primary.contrast} />
        </View>
        <Text style={styles.successTitle}>{paymentMode === 'bill' ? 'Payment submitted' : 'Transfer submitted'}</Text>
        <Text style={styles.successBody}>
          ${numericAmount.toFixed(2)} is on its way to {activeRecipient} for {selectedService} via {selectedBeneficiary?.route ?? 'manual routing'}. Confirmation reference: {transferReference}.
        </Text>
        <Text style={styles.successHint}>Returning to Home to show the updated activity feed.</Text>
        <View style={styles.successSummary}>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Amount sent</Text>
            <Text style={styles.reviewValue}>${numericAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Fee charged</Text>
            <Text style={styles.reviewValue}>${transferFee.toFixed(2)}</Text>
          </View>
        </View>

        <Pressable style={styles.button} onPress={resetFlow}>
          <Text style={styles.buttonText}>Make Another Transfer</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <GradientShell>
      <ScrollView contentContainerStyle={styles.root} showsVerticalScrollIndicator={false}>
        <SectionTitle
          title={step === 'success' ? 'Transfer Complete' : step === 'review' ? 'Review Transfer' : 'Send Money'}
          subtitle={
            step === 'success'
              ? 'Your transfer has been scheduled successfully'
              : step === 'review'
                ? 'Confirm the beneficiary and transfer amount'
                : paymentMode === 'bill'
                  ? 'Pay utilities, public services, and subscriptions in one place'
                  : 'Fast transfer to bank, wallet, agent, or remittance service'
          }
        />

        <View style={styles.progressCard}>
          {transferSteps.map((label, index) => {
            const isActive = index === activeStepIndex;
            const isComplete = index < activeStepIndex;

            return (
              <View key={label} style={styles.progressItem}>
                <View style={[styles.progressDot, isActive && styles.progressDotActive, isComplete && styles.progressDotComplete]}>
                  {isComplete ? (
                    <Ionicons name="checkmark" size={12} color={colors.primary.contrast} />
                  ) : (
                    <Text style={[styles.progressNumber, isActive && styles.progressNumberActive]}>{index + 1}</Text>
                  )}
                </View>
                <Text style={[styles.progressLabel, (isActive || isComplete) && styles.progressLabelActive]}>{label}</Text>
                {index < transferSteps.length - 1 ? (
                  <View style={[styles.progressLine, index < activeStepIndex && styles.progressLineActive]} />
                ) : null}
              </View>
            );
          })}
        </View>

        <Animated.View
          style={[
            styles.stepContainer,
            {
              opacity: stepOpacity,
              transform: [{ translateY: stepTranslateY }],
            },
          ]}
        >
          {stepContent}
        </Animated.View>
      </ScrollView>
    </GradientShell>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: spacing.md,
    gap: spacing.md,
    paddingBottom: spacing['3xl'],
  },
  recipientsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  recipientChip: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface.primary,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
  },
  progressItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface.primary,
    borderWidth: 1,
    borderColor: colors.line,
  },
  progressDotActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  progressDotComplete: {
    backgroundColor: colors.mint,
    borderColor: colors.mint,
  },
  progressNumber: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  progressNumberActive: {
    color: colors.primary.contrast,
  },
  progressLabel: {
    marginLeft: 8,
    color: colors.textSecondary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  progressLabelActive: {
    color: colors.textPrimary,
  },
  progressLine: {
    flex: 1,
    height: 1,
    marginLeft: 8,
    marginRight: 4,
    backgroundColor: colors.line,
  },
  progressLineActive: {
    backgroundColor: colors.mint,
  },
  stepContainer: {
    gap: spacing.md,
  },
  modeSwitcher: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  modeChip: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface.secondary,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modeChipActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  modeChipText: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  modeChipTextActive: {
    color: colors.primary.contrast,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  serviceCard: {
    width: '48%',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    minHeight: 64,
    justifyContent: 'center',
  },
  serviceCardActive: {
    borderColor: colors.mint,
    backgroundColor: 'rgba(19, 178, 132, 0.08)',
  },
  serviceName: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    lineHeight: 18,
  },
  serviceNameActive: {
    color: colors.mint,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#1B3B61',
    borderWidth: 1,
    borderColor: '#365172',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSelected: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  avatarMuted: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#E7E0D2',
    borderWidth: 1,
    borderColor: '#D7CFBF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  recipientName: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
  formCard: {
    backgroundColor: colors.surface.primary,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: spacing.sm,
  },
  beneficiaryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  subtleLabel: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  subtleValue: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
  beneficiaryList: {
    gap: spacing.sm,
  },
  beneficiaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface.primary,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  beneficiaryCardSelected: {
    borderColor: colors.mint,
    backgroundColor: 'rgba(19, 178, 132, 0.08)',
  },
  beneficiaryDetails: {
    flex: 1,
    gap: 2,
  },
  beneficiaryName: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  beneficiaryMeta: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
  beneficiaryAccountWrap: {
    alignItems: 'flex-end',
    gap: 6,
  },
  beneficiaryAccount: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
  selectedBeneficiaryCard: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#D6BE82',
    backgroundColor: 'rgba(197, 154, 61, 0.1)',
    padding: spacing.sm,
    gap: 4,
  },
  selectedBeneficiaryTitle: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  selectedBeneficiaryName: {
    color: colors.textPrimary,
    fontFamily: 'Sora_700Bold',
    fontSize: 16,
  },
  selectedBeneficiaryMeta: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: 'DMSans_700Bold',
  },
  input: {
    backgroundColor: colors.surface.primary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    color: colors.text.primary,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: 'DMSans_500Medium',
  },
  amountWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface.primary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    gap: spacing.sm,
  },
  currency: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  amountInput: {
    flex: 1,
    color: colors.textPrimary,
    paddingVertical: 12,
    fontFamily: 'Sora_700Bold',
    fontSize: 20,
  },
  presetsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  presetChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  presetText: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  button: {
    marginTop: spacing.sm,
    backgroundColor: colors.mint,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: colors.primary.contrast,
    fontFamily: 'Sora_700Bold',
    fontSize: 15,
  },
  noteCard: {
    borderRadius: radii.lg,
    backgroundColor: 'rgba(197, 154, 61, 0.12)',
    borderWidth: 1,
    borderColor: '#D6BE82',
    padding: spacing.md,
    gap: 4,
  },
  noteTitle: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  noteBody: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    lineHeight: 20,
  },
  reviewCard: {
    backgroundColor: colors.surface.primary,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: spacing.sm,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewLabel: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  reviewValue: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  reviewDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    marginVertical: 4,
  },
  reviewTotalLabel: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  reviewTotalValue: {
    color: colors.mint,
    fontFamily: 'Sora_700Bold',
    fontSize: 18,
  },
  reasonBox: {
    borderRadius: radii.md,
    backgroundColor: colors.surface.primary,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.sm,
    gap: 4,
  },
  reasonLabel: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  reasonValue: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  secondaryButton: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: colors.surface.primary,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  successCard: {
    backgroundColor: colors.surface.primary,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    gap: spacing.md,
    alignItems: 'center',
  },
  successIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    color: colors.textPrimary,
    fontFamily: 'Sora_700Bold',
    fontSize: 24,
  },
  successBody: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  successHint: {
    color: colors.textSecondary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    textAlign: 'center',
  },
  successSummary: {
    width: '100%',
    borderRadius: radii.md,
    backgroundColor: colors.surface.primary,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.sm,
    gap: spacing.sm,
  },
});
