import { useEffect, useState } from "react";
import "./App.css";

type StatusPayload = {
  api: string;
  supabase_configured: boolean;
};

export default function App() {
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL || "";
    fetch(`${base}/api/v1/status`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: StatusPayload) => setStatus(data))
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <main className="app">
      <h1>Todo List</h1>
      <p className="muted">React + Vite · integração com API Flask</p>
      <section className="card">
        <h2>Status da API</h2>
        {error && <p className="error">Erro: {error}</p>}
        {!error && !status && <p>Carregando…</p>}
        {status && (
          <ul>
            <li>
              <strong>API:</strong> {status.api}
            </li>
            <li>
              <strong>Supabase configurado (backend):</strong>{" "}
              {status.supabase_configured ? "sim" : "não"}
            </li>
          </ul>
        )}
      </section>
    </main>
  );
}
