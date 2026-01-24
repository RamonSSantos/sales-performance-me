import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/utils/dataProcessor";
interface SalesOverTimeChartProps {
  data: {
    date: string;
    value: number;
  }[];
}
const SalesOverTimeChart = ({
  data
}: SalesOverTimeChartProps) => {
  return <div className="glass-card rounded-xl p-6 animate-slide-up" style={{
    animationDelay: "400ms"
  }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Vendas ao longo do tempo</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 22%)" />
            <XAxis dataKey="date" tick={{
            fill: "hsl(215, 20%, 65%)",
            fontSize: 12
          }} axisLine={{
            stroke: "hsl(217, 33%, 22%)"
          }} />
            <YAxis tickFormatter={value => `R$ ${(value / 1000).toFixed(0)}k`} tick={{
            fill: "hsl(215, 20%, 65%)",
            fontSize: 12
          }} axisLine={{
            stroke: "hsl(217, 33%, 22%)"
          }} />
            <Tooltip contentStyle={{
            backgroundColor: "hsl(222, 47%, 14%)",
            border: "1px solid hsl(217, 33%, 22%)",
            borderRadius: "8px",
            color: "hsl(210, 40%, 98%)"
          }} formatter={(value: number) => [formatCurrency(value), "Total Sales"]} labelStyle={{
            color: "hsl(210, 40%, 98%)"
          }} />
            <Area type="monotone" dataKey="value" stroke="hsl(199, 89%, 48%)" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>;
};
export default SalesOverTimeChart;