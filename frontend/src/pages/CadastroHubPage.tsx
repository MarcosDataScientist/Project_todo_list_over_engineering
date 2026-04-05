import { Link } from "react-router-dom";
import "./HubPages.css";

export default function CadastroHubPage() {
  return (
    <main className="hub-page">
      <h1 className="hub-title">Cadastros</h1>
      <p className="hub-lead">Selecione o tipo de cadastro que deseja realizar.</p>

      <nav className="hub-actions hub-actions-stack" aria-label="Opções de cadastro">
        <Link className="hub-tile" to="/cadastro/tarefa">
          <strong>Cadastrar tarefa</strong>
          <span>Incluir uma nova tarefa com prazo, status e observação</span>
        </Link>
        <Link className="hub-tile" to="/cadastro/usuario">
          <strong>Cadastrar / completar usuário</strong>
          <span>Dados da pessoa no sistema (nome, CPF, nascimento, status)</span>
        </Link>
      </nav>

      <p className="hub-back">
        <Link to="/inicio">← Voltar ao menu</Link>
      </p>
    </main>
  );
}
