// hooks/useHomeData.ts
import { useCallback } from 'react';

import { useBankingData } from '../state/BankingDataContext';

export function useHomeData() {
  const { user, accountSummary, weeklySpend, transactions } = useBankingData();

  const refreshData = useCallback(async () => {
    return Promise.resolve();
  }, []);

  return {
    user,
    accountSummary,
    weeklySpend,
    transactions,
    isLoading: false,
    refreshData,
  };
}