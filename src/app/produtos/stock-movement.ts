export interface IStockMovement {
  id: number;
  product: {
    id: number;
    descricao: string;
  };
  user: {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
  };
  type: 'ENTRADA' | 'SAIDA' | 'AJUSTE';
  quantity: number;
  date: string;
}