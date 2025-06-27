import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/global/ui/card';
import { Button } from '@/components/global/ui/button';
import { Badge } from '@/components/global/ui/badge';
import { useAuth } from '@/contexts/auth/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
// import { supabase } from '@/integrations/supabase/client';
import { BarChart3, Plus, TrendingDown, Calendar, Target } from 'lucide-react';

interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  expense_date: string;
  is_recurring: boolean;
}

const ExpenseManager = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: number }>({});
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadExpenses();
    }
  }, [user]);

  const loadExpenses = async () => {
    // TODO: Implement actual data fetching from Bolt API
    setLoading(true);
    console.warn("Expense data fetching not implemented. Expenses will be empty.");
    setExpenses([]);
    setCategories({});
    setTotalExpenses(0);
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
          <h1 className="text-3xl font-bold font-playfair text-foreground">Expense Manager</h1>
          <p className="text-muted-foreground font-playfair">Optimize your spending with intelligent insights</p>
        </div>
        <Button className="bg-foreground hover:bg-foreground/90 text-background font-playfair">
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </motion.div>

      {/* Expense Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-border hover:border-muted-foreground/20 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Monthly Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground font-playfair">
                <span className="text-green-500">-5.2%</span> from last month
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
              <CardTitle className="text-sm font-medium font-playfair">Categories</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">{Object.keys(categories).length}</div>
              <p className="text-xs text-muted-foreground font-playfair">
                Active spending categories
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
              <CardTitle className="text-sm font-medium font-playfair">Recurring Expenses</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">
                {expenses.filter(e => e.is_recurring).length}
              </div>
              <p className="text-xs text-muted-foreground font-playfair">
                Automated payments
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-2 border-border soft-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-playfair">Spending by Category</CardTitle>
            <CardDescription className="font-playfair">
              Your expense breakdown for this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(categories).length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-playfair">No Expenses Yet</h3>
                <p className="text-muted-foreground mb-6 font-playfair">
                  Start tracking your expenses to see detailed insights
                </p>
                <Button className="bg-foreground hover:bg-foreground/90 text-background font-playfair">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(categories)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, amount], index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                          <BarChart3 className="h-6 w-6 text-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground font-playfair capitalize">{category}</h4>
                          <p className="text-sm text-muted-foreground font-playfair">
                            {((amount / totalExpenses) * 100).toFixed(1)}% of total spending
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground font-playfair">
                          ${amount.toLocaleString()}
                        </div>
                        <Badge variant="secondary" className="font-playfair">
                          {expenses.filter(e => e.category === category).length} transactions
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Expenses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-2 border-border soft-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-playfair">Recent Expenses</CardTitle>
            <CardDescription className="font-playfair">
              Your latest spending transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground font-playfair">No expenses recorded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {expenses.slice(0, 5).map((expense, index) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border hover:bg-muted/20 transition-colors"
                  >
                    <div>
                      <h5 className="font-medium text-foreground font-playfair">{expense.description}</h5>
                      <p className="text-sm text-muted-foreground font-playfair">
                        {expense.category} • {new Date(expense.expense_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground font-playfair">
                        ${expense.amount.toLocaleString()}
                      </div>
                      {expense.is_recurring && (
                        <Badge variant="outline" className="text-xs font-playfair">Recurring</Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ExpenseManager;
