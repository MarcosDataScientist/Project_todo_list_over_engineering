import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/todo-list-api",
    },
    {
      type: "category",
      label: "Autenticação",
      items: [
        {
          type: "doc",
          id: "api/login-com-e-mail-e-senha-supabase-auth",
          label: "Login com e-mail e senha (Supabase Auth)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/dados-do-usuario-a-partir-do-jwt",
          label: "Dados do usuário a partir do JWT",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Pessoa",
      items: [
        {
          type: "doc",
          id: "api/dados-da-pessoa-vinculada-ao-usuario-logado",
          label: "Dados da pessoa vinculada ao usuário logado",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/atualizar-dados-da-pessoa-logada",
          label: "Atualizar dados da pessoa logada",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Sistema",
      items: [
        {
          type: "doc",
          id: "api/status-da-api-e-integracoes",
          label: "Status da API e integrações",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/verificacao-de-saude-do-servico",
          label: "Verificação de saúde do serviço",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Tarefas",
      items: [
        {
          type: "doc",
          id: "api/listar-tarefas-do-usuario-logado",
          label: "Listar tarefas do usuário logado",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/cadastrar-tarefa",
          label: "Cadastrar tarefa",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/excluir-tarefa",
          label: "Excluir tarefa",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/buscar-uma-tarefa-por-id",
          label: "Buscar uma tarefa por id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/editar-tarefa",
          label: "Editar tarefa",
          className: "api-method patch",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
