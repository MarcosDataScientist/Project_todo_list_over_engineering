import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBase, authHeaders, clearToken, getToken } from "../auth";
import type { Pessoa } from "../types/pessoa";
import "./TasksPage.css";
import "./HubPages.css";

const PESSOA_STATUS_OPTIONS = ["ATIVA", "INATIVA"] as const;

export default function UsuarioDadosPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [status, setStatus] = useState("ATIVA");

  const load = useCallback(async () => {
    if (!getToken()) {
      navigate("/login", { replace: true });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase()}/api/v1/pessoa/me`, { headers: authHeaders() });
      if (res.status === 401) {
        clearToken();
        navigate("/login", { replace: true });
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Erro ${res.status}`);
        return;
      }
      const p: Pessoa = data.pessoa;
      setNome(p.nome ?? "");
      setCpf(p.cpf ?? "");
      setNascimento(p.nascimento?.slice(0, 10) ?? "");
      setStatus((p.status && String(p.status).trim()) || "ATIVA");
    } catch {
      setError("Falha ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !cpf.trim() || !status.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase()}/api/v1/pessoa/me`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          nome: nome.trim(),
          cpf: cpf.trim(),
          nascimento: nascimento || null,
          status: status.trim(),
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
        return;
      }
      await load();
    } catch {
      setError("Falha ao salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="tasks-page hub-page">
      <h1 className="hub-title">Cadastro de usuário (pessoa)</h1>
      <p className="hub-lead">
        Estes dados identificam você no sistema de tarefas (tabela <code>pessoa</code>), vinculados à sua conta de
        login.
      </p>

      {error && <p className="hub-banner-error">{error}</p>}

      {loading ? (
        <p className="hub-muted">Carregando…</p>
      ) : (
        <form className="tasks-new-form" onSubmit={handleSubmit}>
          <label className="tasks-field">
            <span className="tasks-label">Nome</span>
            <span className="tasks-label-hint">Como o nome aparece no cadastro.</span>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </label>
          <label className="tasks-field">
            <span className="tasks-label">CPF</span>
            <span className="tasks-label-hint">Documento no formato desejado (ex.: 000.000.000-00).</span>
            <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
          </label>
          <label className="tasks-field">
            <span className="tasks-label">Data de nascimento</span>
            <span className="tasks-label-hint">Opcional; usada para o cadastro da pessoa.</span>
            <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
          </label>
          <label className="tasks-field">
            <span className="tasks-label">Status da pessoa</span>
            <span className="tasks-label-hint">ATIVA: cadastro em uso. INATIVA: cadastro desativado.</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {!(PESSOA_STATUS_OPTIONS as readonly string[]).includes(status) && status ? (
                <option value={status}>{status} (atual)</option>
              ) : null}
              {PESSOA_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <div className="tasks-form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Salvando…" : "Salvar alterações"}
            </button>
          </div>
        </form>
      )}

      <p className="hub-back">
        <Link to="/inicio">← Menu</Link>
        {" · "}
        <Link to="/cadastro">Cadastros</Link>
      </p>
    </main>
  );
}
