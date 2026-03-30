export const paymentModes = ['transfer', 'bill'] as const;

export type PaymentMode = (typeof paymentModes)[number];

export const serviceCatalog: Record<PaymentMode, readonly string[]> = {
  transfer: ['Airtime Service', 'Remittance'],
  bill: [
    'Water Service',
    'RRA Service',
    'Electricity Service',
    'IRemboPay Service',
    'RNIT Service',
    'School Fees Payment Service',
    'Canal+ Service',
    'Electricity Prepared Service',
  ],
};

export const homeServices = [
  {
    id: 'transfer-remittance',
    title: 'Remittance',
    icon: 'swap-horizontal',
    mode: 'transfer' as const,
    service: 'Remittance',
  },
  {
    id: 'transfer-airtime',
    title: 'Airtime',
    icon: 'phone-portrait',
    mode: 'transfer' as const,
    service: 'Airtime Service',
  },
  {
    id: 'bill-water',
    title: 'Water',
    icon: 'water',
    mode: 'bill' as const,
    service: 'Water Service',
  },
  {
    id: 'bill-rra',
    title: 'RRA',
    icon: 'document-text',
    mode: 'bill' as const,
    service: 'RRA Service',
  },
  {
    id: 'bill-electricity',
    title: 'Electricity',
    icon: 'flash',
    mode: 'bill' as const,
    service: 'Electricity Service',
  },
  {
    id: 'bill-irembo',
    title: 'IRemboPay',
    icon: 'business',
    mode: 'bill' as const,
    service: 'IRemboPay Service',
  },
  {
    id: 'bill-rnit',
    title: 'RNIT',
    icon: 'shield-checkmark',
    mode: 'bill' as const,
    service: 'RNIT Service',
  },
  {
    id: 'bill-school',
    title: 'School Fees',
    icon: 'school',
    mode: 'bill' as const,
    service: 'School Fees Payment Service',
  },
  {
    id: 'bill-canal',
    title: 'Canal+',
    icon: 'tv',
    mode: 'bill' as const,
    service: 'Canal+ Service',
  },
  {
    id: 'bill-prepared',
    title: 'Prepaid Meter',
    icon: 'battery-charging',
    mode: 'bill' as const,
    service: 'Electricity Prepared Service',
  },
] as const;