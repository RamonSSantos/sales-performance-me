import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatCurrency } from "@/utils/dataProcessor";
interface CustomerDistributionChartProps {
  data: {
    name: string;
    value: number;
  }[];
}
const COLORS = ["hsl(199, 89%, 48%)", "hsl(262, 83%, 58%)", "hsl(142, 76%, 45%)", "hsl(38, 92%, 50%)", "hsl(340, 82%, 52%)", "hsl(199, 89%, 65%)", "hsl(262, 83%, 72%)", "hsl(142, 76%, 60%)"];
const CustomerDistributionChart = ({
  data
}: CustomerDistributionChartProps) => {
  return <div className="glass-card rounded-xl p-6 animate-slide-up" style={{
    animationDelay: "600ms"
  }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Vendas por Clientes </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
              {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{
            backgroundColor: "hsl(222, 47%, 14%)",
            border: "1px solid hsl(217, 33%, 22%)",
            borderRadius: "8px",
            color: "hsl(210, 40%, 98%)"
          }} formatter={(value: number) => [formatCurrency(value), "Sales"]} labelStyle={{
            color: "hsl(210, 40%, 98%)"
          }} />
            <Legend layout="vertical" align="right" verticalAlign="middle" formatter={value => <span style={{
            color: "hsl(215, 20%, 65%)",
            fontSize: "12px"
          }}>
                  {value.length > 15 ? `${value.substring(0, 15)}...` : value}
                </span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>;
};
export default CustomerDistributionChart;