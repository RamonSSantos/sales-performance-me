import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { formatCurrency } from "@/utils/dataProcessor";

interface SalesByStateChartProps {
  data: { state: string; value: number }[];
}

const COLORS = [
  "hsl(199, 89%, 48%)",
  "hsl(199, 89%, 55%)",
  "hsl(199, 89%, 62%)",
  "hsl(199, 89%, 69%)",
  "hsl(199, 89%, 76%)",
];

const SalesByStateChart = ({ data }: SalesByStateChartProps) => {
  const chartData = data.slice(0, 10);

  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Sales by State</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 22%)" />
            <XAxis
              dataKey="state"
              tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }}
              axisLine={{ stroke: "hsl(217, 33%, 22%)" }}
            />
            <YAxis
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }}
              axisLine={{ stroke: "hsl(217, 33%, 22%)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 14%)",
                border: "1px solid hsl(217, 33%, 22%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 98%)",
              }}
              formatter={(value: number) => [formatCurrency(value), "Total Sales"]}
              labelStyle={{ color: "hsl(210, 40%, 98%)" }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesByStateChart;
