import { ProcessedData } from "@/types/sales";
import { formatCurrency, formatNumber } from "@/utils/dataProcessor";
import StatCard from "./StatCard";
import SalesByRepChart from "./charts/SalesByRepChart";
import SalesByStateChart from "./charts/SalesByStateChart";
import SalesOverTimeChart from "./charts/SalesOverTimeChart";
import TopProductsChart from "./charts/TopProductsChart";
import CustomerDistributionChart from "./charts/CustomerDistributionChart";
import { DollarSign, ShoppingCart, Package, TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
interface DashboardProps {
  data: ProcessedData;
  onReset: () => void;
}
const Dashboard = ({
  data,
  onReset
}: DashboardProps) => {
  return <div className="min-h-screen bg-background p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Vendas <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time performance insights from your sales data
          </p>
        </div>
        <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Upload New Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue" value={formatCurrency(data.totalSales)} icon={DollarSign} delay={0} />
        <StatCard title="Total Orders" value={formatNumber(data.totalOrders)} icon={ShoppingCart} delay={50} />
        <StatCard title="Products Sold" value={formatNumber(data.totalProducts)} icon={Package} delay={100} />
        <StatCard title="Avg. Order Value" value={formatCurrency(data.avgOrderValue)} icon={TrendingUp} delay={150} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesByRepChart data={data.salesByRep} />
        <SalesByStateChart data={data.salesByState} />
        <SalesOverTimeChart data={data.salesOverTime} />
        <TopProductsChart data={data.topProducts} />
        <div className="lg:col-span-2">
          <CustomerDistributionChart data={data.salesByCustomer} />
        </div>
      </div>
    </div>;
};
export default Dashboard;