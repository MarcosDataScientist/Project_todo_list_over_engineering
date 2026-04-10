import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiBase, authHeaders, clearToken, getToken } from "../auth";
import { STATUS_INFO, STATUS_OPTIONS, statusDisplay } from "../lib/tarefaUtils";
import { useToast } from "../components/ToastContext";
import type { Tarefa } from "../types/tarefa";
import "./TasksPage.css";
import "./HubPages.css";

export default function TaskDetailPage() {
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const taskId = Number(idParam);
  const idValid = Number.isFinite(taskId) && taskId > 0;

  const [tarefa, setTarefa] = useState<Tarefa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editDesc, setEditDesc] = useState("");
  const [editExp, setEditExp] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editObs, setEditObs] = useState("");

  const loadOne = useCallback(async () => {
    if (!getToken()) {
      navigate("/login", { replace: true });
      return;
    }
    if (!idValid) {
      setError("Identificador da tarefa inválido");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase()}/api/v1/tarefas/${taskId}`, { headers: authHeaders() });
      if (res.status === 401) {
        clearToken();
        navigate("/login", { replace: true });
        return;
      }
      const data = await res.json();
      if (res.status === 404) {
        setError("Tarefa não encontrada");
        setTarefa(null);
        return;
      }
      if (!res.ok) {
        setError(data.error || `Erro ${res.status}`);
        setTarefa(null);
        return;
      }
      const t = data.tarefa as Tarefa;
      setTarefa(t);
      setEditDesc(t.descricao_tarefa);
      setEditExp(t.data_expiracao.slice(0, 10));
      setEditStatus(t.status);
      setEditObs(t.observacao ?? "");
    } catch {
      setError("Falha ao carregar tarefa");
      setTarefa(null);
    } finally {
      setLoading(false);
    }
  }, [idValid, navigate, taskId]);

  useEffect(() => {
    setEditing(false);
    loadOne();
  }, [loadOne]);

  function startEdit() {
    if (!tarefa) return;
    setEditDesc(tarefa.descricao_tarefa);
    setEditExp(tarefa.data_expiracao.slice(0, 10));
    setEditStatus(tarefa.status);
    setEditObs(tarefa.observacao ?? "");
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
    if (tarefa) {
      setEditDesc(tarefa.descricao_tarefa);
      setEditExp(tarefa.data_expiracao.slice(0, 10));
      setEditStatus(tarefa.status);
      setEditObs(tarefa.observacao ?? "");
    }
  }

  async function saveEdit(e: FormEvent) {
    e.preventDefault();
    if (!idValid) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase()}/api/v1/tarefas/${taskId}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          descricao_tarefa: editDesc.trim(),
          data_expiracao: editExp,
          status: editStatus,
          observacao: editObs,
        }),
      });
      if (res.status === 401) {
        clearToken();
        navigate("/login", { replace: true });
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao salvar");
        showToast(data.error || "Erro ao salvar tarefa", "error");
        return;
      }
      setTarefa(data.tarefa);
      setEditing(false);
      showToast("Tarefa atualizada com sucesso", "success");
    } catch {
      setError("Falha ao salvar");
      showToast("Falha ao salvar tarefa", "error");
    } finally {
      setSaving(false);
    }
  }

  async function removeTask() {
    if (!idValid || !window.confirm("Excluir esta tarefa?")) return;
    setError(null);
    try {
      const res = await fetch(`${apiBase()}/api/v1/tarefas/${taskId}`, {
        method: "DELETE",
        headers: authHeaders(false),
      });
      if (res.status === 401) {
        clearToken();
        navigate("/login", { replace: true });
        return;
      }
      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Erro ${res.status}`);
        showToast(data.error || "Erro ao excluir tarefa", "error");
        return;
      }
      showToast("Tarefa excluída com sucesso", "success");
      navigate("/tarefas", { replace: true });
    } catch {
      setError("Falha ao excluir");
      showToast("Falha ao excluir tarefa", "error");
    }
  }

  if (!idValid) {
    return (
      <main className="tasks-page hub-page">
        <p className="hub-banner-error">ID inválido.</p>
        <p className="hub-back">
          <Link to="/tarefas">← Lista</Link>
        </p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="tasks-page hub-page">
        <p className="hub-muted">Carregando…</p>
      </main>
    );
  }

  if (error && !tarefa) {
    return (
      <main className="tasks-page hub-page">
        <p className="hub-banner-error">{error}</p>
        <p className="hub-back">
          <Link to="/tarefas">← Voltar à lista</Link>
        </p>
      </main>
    );
  }

  if (!tarefa) {
    return null;
  }

  const st = statusDisplay(tarefa.status);

  return (
    <main className="tasks-page hub-page">
      <h1 className="hub-title">Detalhe da tarefa</h1>
      <p className="hub-lead">
        Visualize os dados. Use <strong>Editar</strong> para alterar ou <strong>Excluir</strong> para remover.
      </p>

      {error && <p className="hub-banner-error">{error}</p>}

      {editing ? (
        <form className="tasks-new-form tasks-edit" onSubmit={saveEdit}>
          <label className="tasks-field">
            <span className="tasks-label">Descrição da tarefa</span>
            <input type="text" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} required />
          </label>
          <label className="tasks-field">
            <span className="tasks-label">Data de expiração da tarefa</span>
            <span className="tasks-label-hint">Prazo limite para concluir ou revisar esta tarefa.</span>
            <input type="date" value={editExp} onChange={(e) => setEditExp(e.target.value)} required />
          </label>
          <label className="tasks-field">
            <span className="tasks-label">Status da tarefa</span>
            <span className="tasks-label-hint">
              Situação atual no fluxo. Entre parênteses: código gravado no sistema.
            </span>
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {STATUS_INFO[s].label} ({s})
                </option>
              ))}
            </select>
            <span className="tasks-status-explainer" role="note">
              {statusDisplay(editStatus).descricao}
            </span>
          </label>
          <label className="tasks-field-full">
            <span className="tasks-label">Observação (opcional)</span>
            <span className="tasks-label-hint">Texto completo da observação.</span>
            <textarea value={editObs} onChange={(e) => setEditObs(e.target.value)} rows={5} />
          </label>
          <div className="tasks-detail-actions">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Salvando…" : "Salvar"}
            </button>
            <button type="button" className="btn-ghost" onClick={cancelEdit} disabled={saving}>
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="tasks-row tasks-row-static">
            <div className="tasks-row-main">
              <div className="tasks-desc-block">
                <span className="tasks-detail-label">Descrição da tarefa</span>
                <span className="tasks-desc">{tarefa.descricao_tarefa}</span>
              </div>
              <div className="tasks-detail-line">
                <span className="tasks-detail-label">Data de expiração da tarefa</span>
                <span className="tasks-detail-value">{tarefa.data_expiracao?.slice(0, 10)}</span>
              </div>
              <div className="tasks-detail-line tasks-detail-status">
                <span className="tasks-detail-label">Status da tarefa</span>
                <span className="tasks-detail-value">
                  {st.label} <span className="tasks-detail-code">({st.codigo})</span>
                </span>
                <p className="tasks-detail-desc">{st.descricao}</p>
              </div>
              <div className="tasks-detail-line tasks-detail-obs">
                <span className="tasks-detail-label">Observação</span>
                {tarefa.observacao?.trim() ? (
                  <p className="tasks-obs">{tarefa.observacao}</p>
                ) : (
                  <p className="tasks-obs tasks-obs-empty">Nenhuma observação registrada.</p>
                )}
              </div>
            </div>
          </div>
          <div className="tasks-detail-actions">
            <button type="button" className="btn-primary" onClick={startEdit}>
              Editar
            </button>
            <button type="button" className="btn-danger" onClick={removeTask}>
              Excluir
            </button>
          </div>
        </>
      )}

      <p className="hub-back">
        <Link to="/tarefas">← Lista de tarefas</Link>
        {" · "}
        <Link to="/inicio">Menu</Link>
      </p>
    </main>
  );
}
