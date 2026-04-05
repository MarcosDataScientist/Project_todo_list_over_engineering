import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBase, getToken, setToken } from "../auth";
import "./LoginPage.css";

type LoginResponse = {
  access_token?: string;
  user?: { id: string | null; email: string | null };
  error?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (getToken()) {
      navigate("/inicio", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${apiBase()}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const raw = await res.text();
      let data: LoginResponse = {};
      if (raw) {
        try {
          data = JSON.parse(raw) as LoginResponse;
        } catch {
          setError(
            `Servidor respondeu (${res.status}) sem JSON. Confira se o Flask está em http://127.0.0.1:5000 e o Vite faz proxy de /api (npm run dev).`,
          );
          return;
        }
      } else if (!res.ok) {
        setError(
          `Sem corpo na resposta (HTTP ${res.status}). Backend provavelmente não está acessível na porta 5000.`,
        );
        return;
      }
      if (!res.ok) {
        setError(data.error || `Erro HTTP ${res.status}`);
        return;
      }
      if (!data.access_token) {
        setError("Resposta inválida do servidor");
        return;
      }
      setToken(data.access_token);
      navigate("/inicio", { replace: true });
    } catch (e) {
      const msg =
        e instanceof TypeError
          ? "Não foi possível conectar à API (rede). Suba o Flask (porta 5000) e use o front com npm run dev para o proxy /api."
          : "Não foi possível conectar à API";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <h1>Todo List</h1>
        <p className="login-lead">Entre com sua conta Supabase (e-mail e senha)</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            E-mail
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
