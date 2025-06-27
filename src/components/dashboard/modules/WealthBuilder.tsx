import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/global/ui/card';
import { Button } from '@/components/global/ui/button';
import { Progress } from '@/components/global/ui/progress';
import { Badge } from '@/components/global/ui/badge';
import { useAuth } from '@/contexts/auth/useAuth';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { supabase } from '@/integrations/supabase/client';
import { Target, Plus, Trophy, TrendingUp, Calendar } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  status: 'in_progress' | 'completed' | 'paused' | 'active';
  target_date: string;
}

const WealthBuilder = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [stats, setStats] = useState({
    totalGoals: 0,
    completedGoals: 0,
    totalTargetAmount: 0,
    totalCurrentAmount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadWealthGoals();
    }
  }, [user]);

  const loadWealthGoals = async () => {
    // TODO: Implement actual data fetching from Bolt API
    setLoading(true);
    console.warn("Wealth goals fetching not implemented. Goals will be empty.");
    setGoals([]);
    setStats({
      totalGoals: 0,
      completedGoals: 0,
      totalTargetAmount: 0,
      totalCurrentAmount: 0
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold font-playfair text-foreground">Wealth Builder</h1>
          <p className="text-muted-foreground font-playfair">Set and achieve ambitious financial goals systematically</p>
        </div>
        <Button className="bg-foreground hover:bg-foreground/90 text-background font-playfair">
          <Plus className="h-4 w-4 mr-2" />
          Add Wealth Goal
        </Button>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-border hover:border-muted-foreground/20 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Total Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">{stats.totalGoals}</div>
              <p className="text-xs text-muted-foreground font-playfair">
                Active wealth targets
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-border hover:border-muted-foreground/20 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Completed</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 font-playfair">{stats.completedGoals}</div>
              <p className="text-xs text-muted-foreground font-playfair">
                Successfully achieved
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-border hover:border-muted-foreground/20 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Target Wealth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">${stats.totalTargetAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground font-playfair">
                Total aspirational value
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-2 border-border hover:border-muted-foreground/20 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Progress</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">
                {stats.totalTargetAmount > 0 
                  ? Math.round((stats.totalCurrentAmount / stats.totalTargetAmount) * 100)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground font-playfair">
                Overall completion
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Wealth Goals List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-2 border-border soft-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-playfair">Your Wealth Goals</CardTitle>
            <CardDescription className="font-playfair">
              Track progress toward your financial aspirations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {goals.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-playfair">No Wealth Goals Yet</h3>
                <p className="text-muted-foreground mb-6 font-playfair">
                  Start building your financial future by setting your first wealth goal
                </p>
                <Button className="bg-foreground hover:bg-foreground/90 text-background font-playfair">
                  <Plus className="h-4 w-4 mr-2" />
                  Set Your First Goal
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {goals.map((goal, index) => {
                  const progress = goal.target_amount > 0 
                    ? ((goal.current_amount || 0) / goal.target_amount) * 100 
                    : 0;
                  
                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-muted/20 rounded-xl border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-foreground font-playfair">{goal.title}</h4>
                            <Badge 
                              variant={goal.status === 'completed' ? 'default' : 'secondary'}
                              className="font-playfair"
                            >
                              {goal.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground font-playfair mb-3">{goal.description}</p>
                          
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground font-playfair">
                            <span>Target: ${goal.target_amount.toLocaleString()}</span>
                            <span>Current: ${(goal.current_amount || 0).toLocaleString()}</span>
                            {goal.target_date && (
                              <span>Due: {new Date(goal.target_date).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground font-playfair mb-1">
                            {progress.toFixed(1)}%
                          </div>
                          <div className="text-sm text-muted-foreground font-playfair">Complete</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Progress value={progress} className="h-3" />
                        <div className="flex justify-between text-xs text-muted-foreground font-playfair">
                          <span>${(goal.current_amount || 0).toLocaleString()} saved</span>
                          <span>${(goal.target_amount - (goal.current_amount || 0)).toLocaleString()} remaining</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default WealthBuilder;
