import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBase, authHeaders, clearToken, getToken } from "../auth";
import { STATUS_INFO, STATUS_OPTIONS, statusDisplay } from "../lib/tarefaUtils";
import { useToast } from "../components/ToastContext";
import "./TasksPage.css";
import "./HubPages.css";

export default function TaskCreatePage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [newDesc, setNewDesc] = useState("");
  const [newExp, setNewExp] = useState("");
  const [newStatus, setNewStatus] = useState("PENDENTE");
  const [newObs, setNewObs] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!getToken()) {
      navigate("/login", { replace: true });
      return;
    }
    if (!newDesc.trim() || !newExp) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase()}/api/v1/tarefas`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          descricao_tarefa: newDesc.trim(),
          data_expiracao: newExp,
          status: newStatus,
          observacao: newObs,
        }),
      });
      if (res.status === 401) {
        clearToken();
        navigate("/login", { replace: true });
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao criar");
        showToast(data.error || "Erro ao criar tarefa", "error");
        return;
      }
      showToast("Tarefa criada com sucesso", "success");
      navigate("/tarefas", { replace: true });
    } catch {
      setError("Falha ao criar tarefa");
      showToast("Falha ao criar tarefa", "error");
    } finally {
      setCreating(false);
    }
  }

  return (
    <main className="tasks-page hub-page">
      <h1 className="hub-title">Cadastrar tarefa</h1>
      <p className="hub-lead">Preencha os campos para incluir uma nova tarefa na sua lista.</p>

      {error && <p className="hub-banner-error">{error}</p>}

      <form className="tasks-new-form" onSubmit={handleCreate}>
        <label className="tasks-field">
          <span className="tasks-label">Descrição da tarefa</span>
          <input
            type="text"
            placeholder="O que precisa ser feito?"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            required
          />
        </label>
        <label className="tasks-field">
          <span className="tasks-label">Data de expiração da tarefa</span>
          <span className="tasks-label-hint" id="create-task-exp-hint">
            Prazo limite para concluir ou revisar esta tarefa.
          </span>
          <input
            type="date"
            value={newExp}
            onChange={(e) => setNewExp(e.target.value)}
            required
            aria-describedby="create-task-exp-hint"
          />
        </label>
        <label className="tasks-field">
          <span className="tasks-label">Status da tarefa</span>
          <span className="tasks-label-hint" id="create-task-status-hint">
            Situação atual no fluxo. Entre parênteses: código gravado no sistema.
          </span>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            aria-describedby="create-task-status-hint"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_INFO[s].label} ({s})
              </option>
            ))}
          </select>
          <span className="tasks-status-explainer" role="note">
            {statusDisplay(newStatus).descricao}
          </span>
        </label>
        <label className="tasks-field-full">
          <span className="tasks-label">Observação (opcional)</span>
          <span className="tasks-label-hint">Notas, links ou contexto extra para esta tarefa.</span>
          <textarea
            placeholder="Notas ou detalhes sobre a tarefa…"
            value={newObs}
            onChange={(e) => setNewObs(e.target.value)}
            rows={3}
          />
        </label>
        <div className="tasks-form-actions">
          <button type="submit" disabled={creating}>
            {creating ? "Salvando…" : "Cadastrar"}
          </button>
        </div>
      </form>

      <p className="hub-back">
        <Link to="/cadastro">← Cadastros</Link>
        {" · "}
        <Link to="/tarefas">Ver lista</Link>
      </p>
    </main>
  );
}
