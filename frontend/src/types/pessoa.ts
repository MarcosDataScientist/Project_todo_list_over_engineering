export type Pessoa = {
  id: number;
  cpf: string;
  nome: string;
  status: string;
  nascimento: string | null;
  created_at?: string;
};
