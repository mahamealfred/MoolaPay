export type TransactionType = 'credit' | 'debit';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: TransactionType;
}

export interface AccountSummary {
  availableBalance: number;
  invested: number;
  rewards: number;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  trend: 'up' | 'down' | 'steady';
}
