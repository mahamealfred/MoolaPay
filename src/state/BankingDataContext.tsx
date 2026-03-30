import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import {
  accountSummary as initialAccountSummary,
  transactions as initialTransactions,
  userProfile,
} from '../services/mockData';
import { AccountSummary, Transaction } from '../types/banking';

type TransferInput = {
  recipient: string;
  amount: number;
  fee: number;
  reference?: string;
  route?: string;
};

type BankingDataContextValue = {
  user: typeof userProfile;
  accountSummary: AccountSummary;
  weeklySpend: number;
  transactions: Transaction[];
  highlightedTransactionId: string | null;
  clearHighlightedTransaction: () => void;
  makeTransfer: (input: TransferInput) => { reference: string };
};

const BankingDataContext = createContext<BankingDataContextValue | null>(null);

function formatTransactionTime() {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

export function BankingDataProvider({ children }: { children: ReactNode }) {
  const [accountSummary, setAccountSummary] = useState(initialAccountSummary);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [weeklySpend, setWeeklySpend] = useState(348.2);
  const [highlightedTransactionId, setHighlightedTransactionId] = useState<string | null>(null);

  const value = useMemo<BankingDataContextValue>(
    () => ({
      user: userProfile,
      accountSummary,
      weeklySpend,
      transactions,
      highlightedTransactionId,
      clearHighlightedTransaction: () => setHighlightedTransactionId(null),
      makeTransfer: ({ recipient, amount, fee, reference, route }) => {
        const generatedReference = reference ?? `MP-${Math.floor(1000 + Math.random() * 9000)}`;
        const totalDebit = amount + fee;
        const nextTransactionId = `txn_${Date.now()}`;

        setAccountSummary((current) => ({
          ...current,
          availableBalance: Math.max(0, Number((current.availableBalance - totalDebit).toFixed(2))),
          rewards: Number((current.rewards + amount * 0.0025).toFixed(2)),
        }));

        setWeeklySpend((current) => Number((current + amount).toFixed(2)));
        setTransactions((current) => [
          {
            id: nextTransactionId,
            title: recipient,
            category: route ?? 'Transfer',
            amount,
            date: `Today, ${formatTransactionTime()}`,
            type: 'debit',
          },
          ...current,
        ]);
        setHighlightedTransactionId(nextTransactionId);

        return { reference: generatedReference };
      },
    }),
    [accountSummary, highlightedTransactionId, transactions, weeklySpend],
  );

  return <BankingDataContext.Provider value={value}>{children}</BankingDataContext.Provider>;
}

export function useBankingData() {
  const context = useContext(BankingDataContext);

  if (!context) {
    throw new Error('useBankingData must be used within a BankingDataProvider');
  }

  return context;
}