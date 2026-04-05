import type { Tarefa } from "../types/tarefa";

export const STATUS_OPTIONS = ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"] as const;

export const STATUS_INFO: Record<
  (typeof STATUS_OPTIONS)[number],
  { label: string; descricao: string }
> = {
  PENDENTE: {
    label: "Pendente",
    descricao: "Ainda não foi iniciada; aguardando ação.",
  },
  EM_ANDAMENTO: {
    label: "Em andamento",
    descricao: "Você já começou a trabalhar nesta tarefa.",
  },
  CONCLUIDA: {
    label: "Concluída",
    descricao: "Finalizada com sucesso.",
  },
  CANCELADA: {
    label: "Cancelada",
    descricao: "Descartada; não será mais executada.",
  },
};

export function statusDisplay(codigo: string) {
  if (codigo in STATUS_INFO) {
    const k = codigo as keyof typeof STATUS_INFO;
    return { label: STATUS_INFO[k].label, descricao: STATUS_INFO[k].descricao, codigo };
  }
  return { label: codigo, descricao: "Valor definido no sistema.", codigo };
}

/** Pré-visualização na lista: no máximo `max` caracteres. */
export function truncateObservacao(s: string | null | undefined, max = 150): string {
  const t = (s ?? "").trim();
  if (t.length === 0) return "";
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

export function observacaoFoiTruncada(t: Tarefa, max = 150): boolean {
  const raw = (t.observacao ?? "").trim();
  return raw.length > max;
}
