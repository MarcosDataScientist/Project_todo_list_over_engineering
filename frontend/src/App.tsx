import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { getToken } from "./auth";
import CadastroHubPage from "./pages/CadastroHubPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TaskCreatePage from "./pages/TaskCreatePage";
import TaskDetailPage from "./pages/TaskDetailPage";
import TaskListPage from "./pages/TaskListPage";
import UsuarioDadosPage from "./pages/UsuarioDadosPage";

function PrivateShell() {
  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }
  return <AppLayout />;
}

function RootRedirect() {
  return <Navigate to={getToken() ? "/inicio" : "/login"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateShell />}>
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/cadastro" element={<CadastroHubPage />} />
        <Route path="/cadastro/tarefa" element={<TaskCreatePage />} />
        <Route path="/cadastro/usuario" element={<UsuarioDadosPage />} />
        <Route path="/tarefas" element={<TaskListPage />} />
        <Route path="/tarefas/:id" element={<TaskDetailPage />} />
        <Route path="/perfil" element={<Navigate to="/cadastro/usuario" replace />} />
      </Route>
      <Route path="/" element={<RootRedirect />} />
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
