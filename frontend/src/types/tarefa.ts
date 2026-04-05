export type Tarefa = {
  id: number;
  pessoa_id: number;
  data_criacao: string;
  data_expiracao: string;
  descricao_tarefa: string;
  status: string;
  observacao?: string | null;
};
