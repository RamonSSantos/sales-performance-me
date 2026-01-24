import { SalesRecord, ProcessedData } from "@/types/sales";

const parseValue = (value: string): number => {
  if (!value) return 0;
  return parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0;
};

const parseDate = (dateStr: string): Date => {
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  return new Date(dateStr);
};

const formatMonth = (date: Date): string => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]}/${date.getFullYear()}`;
};

export const processData = (records: SalesRecord[]): ProcessedData => {
  const totalSales = records.reduce((sum, r) => sum + parseValue(r.Valor_Total_Venda_R$), 0);
  const totalOrders = records.length;
  const uniqueProducts = new Set(records.map((r) => r.ID_Produto)).size;
  const avgOrderValue = totalSales / totalOrders || 0;

  // Sales by Representative
  const repMap = new Map<string, { value: number; orders: number }>();
  records.forEach((r) => {
    const current = repMap.get(r.Nome_Representante) || { value: 0, orders: 0 };
    repMap.set(r.Nome_Representante, {
      value: current.value + parseValue(r.Valor_Total_Venda_R$),
      orders: current.orders + 1,
    });
  });
  const salesByRep = Array.from(repMap.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.value - a.value);

  // Sales by State
  const stateMap = new Map<string, number>();
  records.forEach((r) => {
    stateMap.set(r.Estado, (stateMap.get(r.Estado) || 0) + parseValue(r.Valor_Total_Venda_R$));
  });
  const salesByState = Array.from(stateMap.entries())
    .map(([state, value]) => ({ state, value }))
    .sort((a, b) => b.value - a.value);

  // Sales Over Time (grouped by month)
  const timeMap = new Map<string, number>();
  records.forEach((r) => {
    const date = parseDate(r.Data_Pedido);
    const monthKey = formatMonth(date);
    timeMap.set(monthKey, (timeMap.get(monthKey) || 0) + parseValue(r.Valor_Total_Venda_R$));
  });
  const salesOverTime = Array.from(timeMap.entries())
    .map(([date, value]) => ({ date, value }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.date.split("/");
      const [bMonth, bYear] = b.date.split("/");
      return parseInt(aYear) - parseInt(bYear) || 
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(aMonth) -
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(bMonth);
    });

  // Top Products
  const productMap = new Map<string, { value: number; quantity: number }>();
  records.forEach((r) => {
    const current = productMap.get(r.Nome_Produto) || { value: 0, quantity: 0 };
    productMap.set(r.Nome_Produto, {
      value: current.value + parseValue(r.Valor_Total_Venda_R$),
      quantity: current.quantity + r.Quantidade_Vendida,
    });
  });
  const topProducts = Array.from(productMap.entries())
    .map(([name, data]) => ({ name: name.trim(), ...data }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  // Sales by Customer
  const customerMap = new Map<string, number>();
  records.forEach((r) => {
    customerMap.set(r.Nome_Cliente, (customerMap.get(r.Nome_Cliente) || 0) + parseValue(r.Valor_Total_Venda_R$));
  });
  const salesByCustomer = Array.from(customerMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  return {
    totalSales,
    totalOrders,
    totalProducts: uniqueProducts,
    avgOrderValue,
    salesByRep,
    salesByState,
    salesOverTime,
    topProducts,
    salesByCustomer,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("pt-BR").format(value);
};
