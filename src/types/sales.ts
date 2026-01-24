export interface SalesRecord {
  ID_Pedido: string;
  Data_Pedido: string;
  ID_Representante: number;
  Nome_Representante: string;
  ID_Produto: string;
  Nome_Produto: string;
  Valor_Produto_R$: string;
  Quantidade_Vendida: number;
  Valor_Total_Venda_R$: string;
  Nome_Cliente: string;
  Localidade_Cliente: string;
  Estado: string;
}

export interface ProcessedData {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  avgOrderValue: number;
  salesByRep: { name: string; value: number; orders: number }[];
  salesByState: { state: string; value: number }[];
  salesOverTime: { date: string; value: number }[];
  topProducts: { name: string; value: number; quantity: number }[];
  salesByCustomer: { name: string; value: number }[];
}
