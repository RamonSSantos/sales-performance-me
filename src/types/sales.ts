export interface SalesRecord {
  ID_Pedido: string | number;
  Data_Pedido: string | number;
  ID_Representante: number;
  Nome_Representante: string;
  ID_Produto: string | number;
  Nome_Produto: string;
  Valor_Produto_R$: string | number;
  Quantidade_Vendida: number;
  Valor_Total_Venda_R$: string | number;
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
