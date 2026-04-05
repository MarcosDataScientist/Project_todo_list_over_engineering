import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearToken } from "../auth";
import "./AppLayout.css";

export default function AppLayout() {
  const navigate = useNavigate();

  function logout() {
    clearToken();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="app-topnav">
        <span className="app-brand">Todo List</span>
        <nav className="app-nav" aria-label="Menu principal">
          <NavLink to="/inicio" className={({ isActive }) => (isActive ? "active" : "")} end>
            Início
          </NavLink>
          <NavLink to="/cadastro" className={({ isActive }) => (isActive ? "active" : "")}>
            Cadastros
          </NavLink>
          <NavLink to="/tarefas" className={({ isActive }) => (isActive ? "active" : "")}>
            Tarefas
          </NavLink>
        </nav>
        <button type="button" className="app-logout" onClick={logout}>
          Sair
        </button>
      </header>
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}
