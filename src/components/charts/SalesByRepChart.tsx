import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { formatCurrency } from "@/utils/dataProcessor";
interface SalesByRepChartProps {
  data: {
    name: string;
    value: number;
    orders: number;
  }[];
}
const COLORS = ["hsl(199, 89%, 48%)", "hsl(262, 83%, 58%)", "hsl(142, 76%, 45%)", "hsl(38, 92%, 50%)", "hsl(340, 82%, 52%)"];
const SalesByRepChart = ({
  data
}: SalesByRepChartProps) => {
  return <div className="glass-card rounded-xl p-6 animate-slide-up" style={{
    animationDelay: "200ms"
  }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Vendas por Representante</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{
          top: 5,
          right: 30,
          left: 80,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 22%)" />
            <XAxis type="number" tickFormatter={value => formatCurrency(value)} tick={{
            fill: "hsl(215, 20%, 65%)",
            fontSize: 12
          }} axisLine={{
            stroke: "hsl(217, 33%, 22%)"
          }} />
            <YAxis type="category" dataKey="name" tick={{
            fill: "hsl(215, 20%, 65%)",
            fontSize: 12
          }} axisLine={{
            stroke: "hsl(217, 33%, 22%)"
          }} width={75} />
            <Tooltip contentStyle={{
            backgroundColor: "hsl(222, 47%, 14%)",
            border: "1px solid hsl(217, 33%, 22%)",
            borderRadius: "8px",
            color: "hsl(210, 40%, 98%)"
          }} formatter={(value: number, name: string) => [formatCurrency(value), "Total Sales"]} labelStyle={{
            color: "hsl(210, 40%, 98%)"
          }} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>;
};
export default SalesByRepChart;