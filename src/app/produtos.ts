export interface IProduto {
  id: number;
  descricao: string;
  descricaoPreco: string;
  descricaoDetalhada: string;
  preco: number;
  quantidadeEstoque: number;
  imagem: string;
}

export interface IProdutoCarrinho extends IProduto {
  quantidade: number;
  parcelas: number;
}