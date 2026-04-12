import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBase, authHeaders, clearToken, getToken } from "../auth";
import { observacaoFoiTruncada, statusDisplay, truncateObservacao } from "../lib/tarefaUtils";
import type { Tarefa } from "../types/tarefa";
import "./TasksPage.css";
import "./HubPages.css";

const OBS_PREVIEW_LEN = 150;

export default function TaskListPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const loadTodos = useCallback(async (q = "") => {
    if (!getToken()) {
      navigate("/login", { replace: true });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url = new URL(`${apiBase()}/api/v1/tarefas`);
      if (q) url.searchParams.set("q", q);

      const res = await fetch(url.toString(), { headers: authHeaders() });
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
      setTodos(data.tarefas || []);
    } catch {
      setError("Falha ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // Dispara busca com debounce de 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      loadTodos(searchInput.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClearSearch() {
    setSearchInput("");
    setSearch("");
    loadTodos("");
  }

  return (
    <main className="tasks-page hub-page">
      <div className="tasks-list-head hub-list-head">
        <h1 className="hub-title" style={{ margin: 0 }}>
          Lista de tarefas
        </h1>
        <button
          type="button"
          className="tasks-refresh"
          onClick={() => loadTodos(search)}
          disabled={loading}
        >
          {loading ? "Atualizando…" : "Atualizar"}
        </button>
      </div>

      <p className="hub-lead">
        Toque ou clique em uma tarefa para <strong>visualizar o detalhe</strong> e, a partir daí, editar ou excluir.
        A observação na lista mostra apenas os primeiros {OBS_PREVIEW_LEN} caracteres.
      </p>

      {/* ── Campo de pesquisa ── */}
      <div className="tasks-search-wrapper">
        <input
          type="search"
          className="tasks-search-input"
          placeholder="Pesquisar por descrição, status ou observação…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Pesquisar tarefas"
        />
        {searchInput && (
          <button
            type="button"
            className="tasks-search-clear"
            onClick={handleClearSearch}
            aria-label="Limpar pesquisa"
          >
            ✕
          </button>
        )}
      </div>

      {search && !loading && (
        <p className="hub-muted tasks-search-count">
          {todos.length === 0
            ? "Nenhuma tarefa encontrada para essa pesquisa."
            : `${todos.length} tarefa${todos.length > 1 ? "s" : ""} encontrada${todos.length > 1 ? "s" : ""}.`}
        </p>
      )}

      {error && <p className="hub-banner-error">{error}</p>}

      {loading && todos.length === 0 ? (
        <p className="hub-muted">Carregando…</p>
      ) : todos.length === 0 && !search ? (
        <p className="hub-muted">Nenhuma tarefa. Use Cadastros → Cadastrar tarefa.</p>
      ) : (
        <ul className="tasks-list">
          {todos.map((t) => {
            const st = statusDisplay(t.status);
            const obsPreview = truncateObservacao(t.observacao, OBS_PREVIEW_LEN);
            const truncated = observacaoFoiTruncada(t, OBS_PREVIEW_LEN);
            return (
              <li key={t.id} className="tasks-row tasks-row-link">
                <Link to={`/tarefas/${t.id}`} className="tasks-row-link-anchor">
                  <div className="tasks-row-main">
                    <div className="tasks-desc-block">
                      <span className="tasks-detail-label">Descrição da tarefa</span>
                      <span className="tasks-desc">{t.descricao_tarefa}</span>
                    </div>
                    <div className="tasks-detail-line">
                      <span className="tasks-detail-label">Data de expiração da tarefa</span>
                      <span className="tasks-detail-value">{t.data_expiracao?.slice(0, 10)}</span>
                    </div>
                    <div className="tasks-detail-line tasks-detail-status">
                      <span className="tasks-detail-label">Status da tarefa</span>
                      <span className="tasks-detail-value">
                        {st.label} <span className="tasks-detail-code">({st.codigo})</span>
                      </span>
                    </div>
                    <div className="tasks-detail-line tasks-detail-obs">
                      <span className="tasks-detail-label">Observação (prévia)</span>
                      {obsPreview ? (
                        <p className="tasks-obs">
                          {obsPreview}
                          {truncated && (
                            <span className="tasks-obs-trunc-note" title="Texto completo no detalhe da tarefa">
                              {" "}
                              [ver mais no detalhe]
                            </span>
                          )}
                        </p>
                      ) : (
                        <p className="tasks-obs tasks-obs-empty">Sem observação</p>
                      )}
                    </div>
                  </div>
                  <span className="tasks-row-chevron" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <p className="hub-back">
        <Link to="/inicio">← Menu</Link>
      </p>
    </main>
  );
}
