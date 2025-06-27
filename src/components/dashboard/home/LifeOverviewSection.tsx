import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/global/ui/card';
import { Progress } from '@/components/global/ui/progress';
import { Badge } from '@/components/global/ui/badge';
import { TrendingUp, Target, Calendar, Brain, Wallet, Activity } from 'lucide-react';
import { useTheme } from '@/contexts/useTheme';

interface LifeOverviewSectionProps {
  stats: {
    lifeBalanceScore: number;
    activeHabits: number;
    activeGoals: number;
    habitStreak: number;
    focusHoursToday: number;
    totalPortfolioValue: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    savingsRate: number;
  };
}

const LifeOverviewSection = ({ stats }: LifeOverviewSectionProps) => {
  const { language } = useTheme();

  const t = {
    en: {
      lifeOverview: "Life Systems Overview",
      description: "Real-time snapshot of your life optimization progress",
      personal: "Personal Growth",
      productivity: "Productivity",
      financial: "Financial Health",
      habits: "Daily Habits",
      goals: "Active Goals", 
      streak: "Habit Streak",
      focus: "Focus Today",
      portfolio: "Portfolio Value",
      savings: "Savings Rate",
      excellent: "Excellent",
      good: "Good",
      needsWork: "Needs Work"
    },
    id: {
      lifeOverview: "Ikhtisar Sistem Hidup",
      description: "Snapshot real-time kemajuan optimisasi hidup Anda",
      personal: "Pertumbuhan Pribadi",
      productivity: "Produktivitas",
      financial: "Kesehatan Finansial",
      habits: "Kebiasaan Harian",
      goals: "Tujuan Aktif",
      streak: "Streak Kebiasaan",
      focus: "Fokus Hari Ini",
      portfolio: "Nilai Portofolio",
      savings: "Tingkat Tabungan",
      excellent: "Sangat Baik",
      good: "Baik",
      needsWork: "Perlu Perbaikan"
    }
  }[language];

  const isLifeOverviewDataEmpty = 
    stats.lifeBalanceScore === 0 &&
    stats.activeHabits === 0 &&
    stats.activeGoals === 0 &&
    stats.habitStreak === 0 &&
    stats.focusHoursToday === 0 &&
    stats.totalPortfolioValue === 0 &&
    stats.monthlyIncome === 0 &&
    stats.monthlyExpenses === 0 &&
    stats.savingsRate === 0;

  const personalScore = isLifeOverviewDataEmpty ? 0 : Math.round(((stats.activeHabits / 5) * 40) + ((stats.habitStreak / 7) * 30) + ((stats.activeGoals / 3) * 30));
  const productivityScore = isLifeOverviewDataEmpty ? 0 : Math.round((stats.focusHoursToday / 8) * 100);
  const financialScore = isLifeOverviewDataEmpty ? 0 : Math.round(Math.min(stats.savingsRate * 2, 100));

  const getScoreLabel = (score: number) => {
    if (isLifeOverviewDataEmpty) return { label: "N/A", color: 'bg-gray-500' };
    if (score >= 80) return { label: t.excellent, color: 'bg-green-500' };
    if (score >= 60) return { label: t.good, color: 'bg-yellow-500' };
    return { label: t.needsWork, color: 'bg-red-500' };
  };

  const overviewCards = [
    {
      title: t.personal,
      score: personalScore,
      icon: <Target className="h-6 w-6" />,
      gradient: "from-emerald-500 to-teal-600",
      metrics: [
        { label: t.habits, value: stats.activeHabits },
        { label: t.goals, value: stats.activeGoals },
        { label: t.streak, value: `${stats.habitStreak} days` }
      ]
    },
    {
      title: t.productivity,
      score: productivityScore,
      icon: <Brain className="h-6 w-6" />,
      gradient: "from-purple-500 to-indigo-600",
      metrics: [
        { label: t.focus, value: `${stats.focusHoursToday}h` },
        { label: "Sessions", value: Math.floor(stats.focusHoursToday / 0.5) },
        { label: "Efficiency", value: `${Math.round(productivityScore)}%` }
      ]
    },
    {
      title: t.financial,
      score: financialScore,
      icon: <Wallet className="h-6 w-6" />,
      gradient: "from-blue-500 to-cyan-600",
      metrics: [
        { label: t.portfolio, value: `$${stats.totalPortfolioValue.toLocaleString()}` },
        { label: t.savings, value: `${stats.savingsRate}%` },
        { label: "Net Worth", value: `$${(stats.totalPortfolioValue + (stats.monthlyIncome * 12)).toLocaleString()}` }
      ]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.lifeOverview}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {overviewCards.map((card, index) => {
          const scoreInfo = getScoreLabel(card.score);
          
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              <Card className="border-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-slate-800/60 dark:to-slate-800/30 backdrop-blur-md hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <div className="text-white">{card.icon}</div>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">{card.title}</CardTitle>
                        <Badge className={`${scoreInfo.color} text-white text-xs`}>
                          {scoreInfo.label}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{isLifeOverviewDataEmpty ? 'N/A' : `${card.score}%`}</div>
                    </div>
                  </div>
                  <Progress value={isLifeOverviewDataEmpty ? 0 : card.score} className="h-2 mt-4" />
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-3 gap-4">
                    {card.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="font-bold text-slate-800 dark:text-slate-100">{metric.value}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default LifeOverviewSection;
