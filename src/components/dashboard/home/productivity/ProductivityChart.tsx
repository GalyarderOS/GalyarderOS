import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/global/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface FocusData {
  name: string;
  hours: number;
}

interface ProductivityChartProps {
  data: FocusData[];
  title: string;
  monthlyData: FocusData[];
  monthlyTitle: string;
}

const ProductivityChart = ({ data, title, monthlyData, monthlyTitle }: ProductivityChartProps) => {
  console.log("Monthly Data in ProductivityChart:", monthlyData);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <ChartContainer
          config={{
            hours: { label: 'Hours', color: 'hsl(var(--chart-4))' },
          }}
          className="h-32"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data && data.length > 0 ? data : []} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis fontSize={10} tickLine={false} axisLine={false} domain={[0, 'auto']} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="hsl(var(--chart-4))"
                strokeWidth={2}
                dot={{ r: 3, fill: "hsl(var(--chart-4))" }}
                activeDot={{ r: 5, strokeWidth: 1, fill: 'hsl(var(--background))', stroke: 'hsl(var(--chart-4))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">{monthlyTitle}</h4>
        <ChartContainer
          config={{
            hours: { label: 'Hours', color: 'hsl(var(--chart-1))' },
          }}
          className="h-32"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData && monthlyData.length > 0 ? monthlyData : []} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis fontSize={10} tickLine={false} axisLine={false} domain={[0, 'auto']} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ r: 3, fill: "hsl(var(--chart-1))" }}
                activeDot={{ r: 5, strokeWidth: 1, fill: 'hsl(var(--background))', stroke: 'hsl(var(--chart-1))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ProductivityChart;