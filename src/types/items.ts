export interface Item {
  id_item: number;
  nome: string;
  abreviacao: string;
  url: string;
  favorito: boolean;
  id_funcionario: number;
  icon: string;
}

export interface ApiResponse<T> {
  message: string;
  code: string;
  slug: string;
  data: T;
}
