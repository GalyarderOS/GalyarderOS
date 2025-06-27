import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/global/ui/card';
import { TrendingUp, Target, Clock, Zap } from 'lucide-react';

interface ProductivityData {
  name: string;
  focus: number;
  energy: number;
  mood: number;
}

interface GoalProgressData {
  name: string;
  value: number;
  color: string;
}

interface TimeTrackingData {
  activity: string;
  hours: number;
  color: string;
}

interface LifeAnalyticsChartsProps {
  productivityData: ProductivityData[];
  goalProgressData: GoalProgressData[];
  timeTrackingData: TimeTrackingData[];
}

const LifeAnalyticsCharts: React.FC<LifeAnalyticsChartsProps> = ({
  productivityData,
  goalProgressData,
  timeTrackingData,
}) => {
  
  const tooltipStyle = {
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    border: '1px solid hsl(var(--border))',
    borderRadius: 'var(--radius)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Productivity Trends */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <TrendingUp className="h-5 w-5 text-chart-1" />
            <span>Weekly Productivity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={productivityData && productivityData.length > 0 ? productivityData : []}>
              <CartesianGrid strokeDasharray="3 3" stroke={'hsl(var(--border))'} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Line 
                type="monotone" 
                dataKey="focus" 
                stroke={'hsl(var(--chart-1))'}
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--chart-1))', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke={'hsl(var(--chart-2))'}
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--chart-2))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Goal Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Target className="h-5 w-5 text-chart-2" />
            <span>Goal Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={goalProgressData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {goalProgressData && goalProgressData.length > 0 ? goalProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                )) : null}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Time Tracking */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Clock className="h-5 w-5 text-chart-4" />
            <span>Time Allocation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeTrackingData && timeTrackingData.length > 0 ? timeTrackingData : []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={'hsl(var(--border))'} />
              <XAxis 
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                type="category"
                dataKey="activity"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                width={80}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar 
                dataKey="hours" 
                radius={[0, 4, 4, 0]}
              >
                {timeTrackingData && timeTrackingData.length > 0 ? timeTrackingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                )) : null}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Energy Levels */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Zap className="h-5 w-5 text-chart-3" />
            <span>Energy Levels</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={productivityData && productivityData.length > 0 ? productivityData : []}>
              <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={'hsl(var(--chart-3))'} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={'hsl(var(--chart-3))'} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={'hsl(var(--chart-2))'} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={'hsl(var(--chart-2))'} stopOpacity={0}/>
                  </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={'hsl(var(--border))'} />
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Area 
                type="monotone" 
                dataKey="energy" 
                stroke={'hsl(var(--chart-3))'}
                fill="url(#colorEnergy)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="mood" 
                stroke={'hsl(var(--chart-2))'}
                fill="url(#colorMood)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifeAnalyticsCharts;
