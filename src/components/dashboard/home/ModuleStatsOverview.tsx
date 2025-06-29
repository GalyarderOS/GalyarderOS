
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/useTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/global/ui/card";
import { Badge } from "@/components/global/ui/badge";
import {
  User,
  Target,
  Calendar,
  Timer,
  BookOpen,
  Brain,
  TrendingUp,
  CheckCircle,
  Zap,
  Activity
} from "lucide-react";

interface ModuleStatsOverviewProps {
  stats: {
    totalPortfolioValue: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    totalDebt: number;
    wealthGoals: number;
    investments: number;
    activeHabits: number;
    habitStreak: number;
    focusHoursToday: number;
    notesCount: number;
    reflectionEntries: number;
    activeGoals: number;
  };
}

const trans = {
  en: {
    moduleStats: "Module Statistics",
    description: "Overview of your progress across all life modules",
    identity: "Identity Core",
    vision: "Vision & Goals", 
    habits: "Daily Habits",
    focus: "Focus Sessions",
    knowledge: "Knowledge Base",
    reflection: "Reflections",
    activeCount: "Active",
    completedToday: "Today",
    totalEntries: "Entries",
    hoursLogged: "Hours",
    daysStreak: "Days Streak",
    goalsActive: "Goals"
  },
  id: {
    moduleStats: "Statistik Modul",
    description: "Gambaran kemajuan Anda di semua modul kehidupan",
    identity: "Inti Identitas",
    vision: "Visi & Tujuan",
    habits: "Kebiasaan Harian", 
    focus: "Sesi Fokus",
    knowledge: "Basis Pengetahuan",
    reflection: "Refleksi",
    activeCount: "Aktif",
    completedToday: "Hari Ini",
    totalEntries: "Entri",
    hoursLogged: "Jam",
    daysStreak: "Hari Beruntun",
    goalsActive: "Tujuan"
  }
};

const ModuleStatsOverview = ({ stats }: ModuleStatsOverviewProps) => {
  const { language } = useTheme();
  const t = trans[language];

  const moduleStats = [
    {
      id: "identity",
      title: t.identity,
      icon: <User className="h-6 w-6 text-chart-4" />,
      value: "Complete",
      metric: "Profile Set",
      color: "from-chart-4/20 to-chart-4/5",
      borderColor: "border-chart-4/30"
    },
    {
      id: "vision", 
      title: t.vision,
      icon: <Target className="h-6 w-6 text-chart-2" />,
      value: stats.activeGoals,
      metric: t.goalsActive,
      color: "from-chart-2/20 to-chart-2/5",
      borderColor: "border-chart-2/30"
    },
    {
      id: "habits",
      title: t.habits,
      icon: <Calendar className="h-6 w-6 text-chart-3" />,
      value: stats.activeHabits,
      metric: t.activeCount,
      color: "from-chart-3/20 to-chart-5/20",
      borderColor: "border-chart-3/30"
    },
    {
      id: "focus",
      title: t.focus,
      icon: <Timer className="h-6 w-6 text-chart-1" />,
      value: `${stats.focusHoursToday}h`,
      metric: t.completedToday,
      color: "from-chart-1/20 to-chart-1/5",
      borderColor: "border-chart-1/30"
    },
    {
      id: "knowledge",
      title: t.knowledge,
      icon: <BookOpen className="h-6 w-6 text-violet-500" />,
      value: stats.notesCount,
      metric: t.totalEntries,
      color: "from-violet-500/20 to-purple-500/20",
      borderColor: "border-violet-500/30"
    },
    {
      id: "reflection",
      title: t.reflection,
      icon: <Brain className="h-6 w-6 text-indigo-500" />,
      value: stats.reflectionEntries,
      metric: t.totalEntries,
      color: "from-indigo-500/20 to-blue-500/20",
      borderColor: "border-indigo-500/30"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold mb-3 font-playfair text-foreground">
          {t.moduleStats}
        </h2>
        <p className="text-lg text-muted-foreground font-playfair">
          {t.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moduleStats.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className={`bg-gradient-to-br ${module.color} border ${module.borderColor} hover:shadow-lg transition-all duration-300`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-background/60 rounded-lg">
                      {module.icon}
                    </div>
                    <CardTitle className="text-lg font-playfair">
                      {module.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-foreground">
                    {module.value}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {module.metric}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional streak info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-gradient-to-br from-chart-3/20 to-chart-3/5 border border-chart-3/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-chart-3" />
              <div>
                <div className="text-2xl font-bold">{stats.habitStreak}</div>
                <div className="text-sm text-muted-foreground">{t.daysStreak}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-1/20 to-chart-1/5 border border-chart-1/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Zap className="h-6 w-6 text-chart-1" />
              <div>
                <div className="text-2xl font-bold">{stats.focusHoursToday}h</div>
                <div className="text-sm text-muted-foreground">Focus {t.completedToday}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-2/20 to-chart-2/5 border border-chart-2/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-chart-2" />
              <div>
                <div className="text-2xl font-bold">{stats.activeHabits + stats.activeGoals}</div>
                <div className="text-sm text-muted-foreground">Active Systems</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ModuleStatsOverview;
