import { AccountSummary, Insight, Transaction } from '../types/banking';

export const userProfile = {
  id: 'user_001',
  firstName: 'Leathitia',
  lastName: 'Bwiza',
  tier: 'Premium Client',
};

export const accountSummary: AccountSummary = {
  availableBalance: 25460.4,
  invested: 8300.9,
  rewards: 920.3,
};

export const transactions: Transaction[] = [
  {
    id: 'txn_001',
    title: 'Electricity Bill',
    category: 'Utilities',
    amount: 84.2,
    date: 'Today, 09:40',
    type: 'debit',
  },
  {
    id: 'txn_002',
    title: 'Salary Deposit',
    category: 'Income',
    amount: 1450,
    date: 'Yesterday, 18:10',
    type: 'credit',
  },
  {
    id: 'txn_003',
    title: 'Supermarket',
    category: 'Groceries',
    amount: 62.35,
    date: 'Yesterday, 14:22',
    type: 'debit',
  },
  {
    id: 'txn_004',
    title: 'Moola Rewards',
    category: 'Rewards',
    amount: 22.5,
    date: 'Mon, 08:00',
    type: 'credit',
  },
];

export const insights: Insight[] = [
  {
    id: 'ins_01',
    title: 'Spending down 12%',
    description: 'Compared with last month, your weekly expenses are healthier.',
    trend: 'down',
  },
  {
    id: 'ins_02',
    title: 'Savings goal 74%',
    description: 'You are close to your target for the emergency bucket.',
    trend: 'up',
  },
];
