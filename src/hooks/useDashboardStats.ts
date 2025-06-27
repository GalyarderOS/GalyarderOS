import { useState, useEffect } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '@/integrations/supabase/client';
import { DashboardStats } from '@/types/dashboard';

const initialState: DashboardStats = {
  totalPortfolioValue: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  totalDebt: 0,
  wealthGoals: 0,
  investments: 0,
  activeHabits: 0,
  activeRituals: 0,
  habitStreak: 0,
  ritualStreak: 0,
  focusHoursToday: 0,
  notesCount: 0,
  reflectionEntries: 0,
  activeGoals: 0,
  lifeBalanceScore: 0,
  weeklyFocusHours: 0,
  completedGoalsThisMonth: 0,
  savingsRate: 0,
  calendarEventsThisWeek: 0,
  notionPagesCount: 0,
};

export const useDashboardStats = () => {
  // const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
    // TODO: Replace with Bolt API
    // Implement actual data fetching here
    setLoading(false);
  }, []);

  return { stats, loading };
};
