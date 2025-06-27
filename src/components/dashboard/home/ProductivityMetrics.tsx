
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/global/ui/card';
import { DashboardStats } from '@/types/dashboard';
import { useProductivityMetrics } from './useProductivityMetrics';
import ProductivityHeader from './productivity/ProductivityHeader';
import ProductivityOverview from './productivity/ProductivityOverview';
import ProductivityMetricsGrid from './productivity/ProductivityMetricsGrid';
import ProductivityChart from './productivity/ProductivityChart';
import KnowledgeSection from './productivity/KnowledgeSection';

interface ProductivityMetricsProps {
  stats: DashboardStats;
}

const ProductivityMetrics = ({ stats }: ProductivityMetricsProps) => {
  const { t, productivityScore, scoreInfo, focusData, monthlyFocusData } = useProductivityMetrics(stats);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="border-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-slate-800/60 dark:to-slate-800/30 backdrop-blur-md h-full">
        <ProductivityHeader
          title={t.productivity}
          description={t.description}
          scoreLabel={scoreInfo.label}
          scoreColor={scoreInfo.color}
        />
        <CardContent className="space-y-6">
          <ProductivityOverview score={productivityScore} label={t.overallProductivity} />

          <ProductivityMetricsGrid
            focusToday={stats.focusHoursToday}
            focusWeek={stats.weeklyFocusHours}
            activeHabits={stats.activeHabits}
            habitStreak={stats.habitStreak}
            translations={{
              today: t.today,
              week: t.week,
              habits: t.habits,
              streak: t.streak
            }}
          />

          <ProductivityChart data={focusData} title={t.weeklyFocusTrend} monthlyData={monthlyFocusData} monthlyTitle={t.monthlyFocusTrend} />

          <KnowledgeSection
            notesCount={stats.notesCount}
            reflectionEntries={stats.reflectionEntries}
            translations={{
              knowledge: t.knowledge,
              notes: t.notes,
              reflections: t.reflections
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductivityMetrics;
