import { useMemo } from 'react';
import { DashboardStats } from '@/types/dashboard';
import { useTheme } from '@/contexts/useTheme';
import { productivityTranslations } from './productivity/translations';

export const useProductivityMetrics = (stats: DashboardStats) => {
  const { language } = useTheme();
  
  const t = language === 'id' ? productivityTranslations.id : productivityTranslations.en;

  const {
    productivityScore,
    scoreInfo,
    focusData,
  } = useMemo(() => {
    const isProductivityDataEmpty = 
      stats.focusHoursToday === 0 &&
      stats.activeHabits === 0 &&
      stats.habitStreak === 0 &&
      stats.activeGoals === 0 &&
      stats.weeklyFocusHours === 0;

    const focusScore = isProductivityDataEmpty ? 0 : Math.round((stats.focusHoursToday / 8) * 100);
    const calculatedProductivityScore = isProductivityDataEmpty ? 0 : Math.round(
      (focusScore * 0.4) +
      ((stats.activeHabits / 5) * 25) +
      ((stats.habitStreak / 7) * 25) +
      ((stats.activeGoals / 3) * 10)
    );

    const getScoreLabel = (score: number) => {
      if (isProductivityDataEmpty) return { label: "N/A", color: 'bg-gray-500' };
      if (score >= 80) return { label: t.excellent, color: 'bg-green-500' };
      if (score >= 60) return { label: t.good, color: 'bg-yellow-500' };
      return { label: t.needsWork, color: 'bg-red-500' };
    };

    const scoreInfo = getScoreLabel(calculatedProductivityScore);

    const focusData = isProductivityDataEmpty ? [
      { name: 'Mon', hours: 0 },
      { name: 'Tue', hours: 0 },
      { name: 'Wed', hours: 0 },
      { name: 'Thu', hours: 0 },
      { name: 'Fri', hours: 0 },
      { name: 'Sat', hours: 0 },
      { name: 'Sun', hours: 0 },
    ] : [
      { name: 'Mon', hours: 6.5 },
      { name: 'Tue', hours: 7.2 },
      { name: 'Wed', hours: 5.8 },
      { name: 'Thu', hours: 8.1 },
      { name: 'Fri', hours: 7.5 },
      { name: 'Sat', hours: 4.2 },
      { name: 'Sun', hours: stats.focusHoursToday },
    ];

    const monthlyFocusData = isProductivityDataEmpty ? [
      { name: 'Week 1', hours: 0 },
      { name: 'Week 2', hours: 0 },
      { name: 'Week 3', hours: 0 },
      { name: 'Week 4', hours: 0 },
    ] : [
      { name: 'Week 1', hours: 30 },
      { name: 'Week 2', hours: 35 },
      { name: 'Week 3', hours: 28 },
      { name: 'Week 4', hours: 40 },
    ];

    return { 
      productivityScore: calculatedProductivityScore, 
      scoreInfo, 
      focusData, 
      monthlyFocusData 
    };
  }, [stats, t]);

  return { t, productivityScore, scoreInfo, focusData };
};
