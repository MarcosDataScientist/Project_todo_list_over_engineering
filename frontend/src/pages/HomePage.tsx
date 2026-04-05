import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBase, authHeaders, clearToken, getToken } from "../auth";
import type { Pessoa } from "../types/pessoa";
import "./HubPages.css";

type MeResponse = {
  user?: { id: string; email: string | undefined };
  error?: string;
};

export default function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!getToken()) {
      navigate("/login", { replace: true });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [meRes, pessoaRes] = await Promise.all([
        fetch(`${apiBase()}/api/v1/auth/me`, { headers: authHeaders() }),
        fetch(`${apiBase()}/api/v1/pessoa/me`, { headers: authHeaders() }),
      ]);
      if (meRes.status === 401 || pessoaRes.status === 401) {
        clearToken();
        navigate("/login", { replace: true });
        return;
      }
      const meData: MeResponse = await meRes.json();
      const pessoaData = await pessoaRes.json();
      if (!meRes.ok) {
        setError(meData.error || "Sessão inválida");
        return;
      }
      if (!pessoaRes.ok) {
        setError(pessoaData.error || "Não foi possível carregar o cadastro");
        return;
      }
      setEmail(meData.user?.email ?? null);
      setPessoa(pessoaData.pessoa ?? null);
    } catch {
      setError("Falha ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <main className="hub-page">
      <h1 className="hub-title">Menu principal</h1>
      <p className="hub-lead">
        Escolha abaixo o que deseja fazer. Seus dados no sistema de tarefas aparecem no painel.
      </p>

      {error && <p className="hub-banner-error">{error}</p>}
      {loading ? (
        <p className="hub-muted">Carregando…</p>
      ) : (
        <>
          <section className="hub-user-card" aria-labelledby="dados-sistema-heading">
            <h2 id="dados-sistema-heading">Seu cadastro no sistema de tarefas</h2>
            {email && (
              <p className="hub-email">
                <span className="hub-k">Conta (login)</span> {email}
              </p>
            )}
            {pessoa && (
              <dl className="hub-dl">
                <div>
                  <dt>Nome</dt>
                  <dd>{pessoa.nome}</dd>
                </div>
                <div>
                  <dt>CPF</dt>
                  <dd>{pessoa.cpf}</dd>
                </div>
                <div>
                  <dt>Nascimento</dt>
                  <dd>{pessoa.nascimento?.slice(0, 10) ?? "—"}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{pessoa.status}</dd>
                </div>
              </dl>
            )}
          </section>

          <nav className="hub-actions" aria-label="Atalhos do menu">
            <Link className="hub-tile" to="/cadastro">
              <strong>Cadastros</strong>
              <span>Incluir nova tarefa ou atualizar dados de usuário (pessoa)</span>
            </Link>
            <Link className="hub-tile" to="/tarefas">
              <strong>Lista de tarefas</strong>
              <span>Ver tarefas, abrir detalhes, editar ou excluir</span>
            </Link>
          </nav>
        </>
      )}
    </main>
  );
}
