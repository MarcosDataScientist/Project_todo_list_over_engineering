# 🚀 Todo List — Engenharia de Software (Guia do Desenvolvedor)

Bem-vindo ao projeto **Todo List Over Engineering**. Este não é apenas um simples "caderno de tarefas"; este é um projeto acadêmico de **Engenharia de Software** desenhado para aplicar e demonstrar as melhores práticas de programação, arquitetura de sistemas e infraestrutura moderna.

---

## 🏗️ Arquitetura do Sistema

Desenhamos este sistema para ser escalável e fácil de manter, separando as responsabilidades em três grandes pilares:

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, TypeScript | Interface reativa e rápida com React Router para navegação. |
| **Backend** | Python, Flask 3 | API REST gerenciando regras de negócio e integração com banco. |
| **Banco / Auth** | Supabase (PostgreSQL) | Banco de dados gerenciado com autenticação integrada (JWT). |
| **Documentação** | Docusaurus 2 | Guia técnico completo e centralizado. |
| **Qualidade** | Pytest, Flake8 | Suite de testes para backend e análise estática de código. |

---

## 🐳 Guia de Início Rápido (Docker)

A forma recomendada de rodar este projeto é através do **Docker**, garantindo consistência entre ambientes.

### 1. Pré-requisitos
- **Docker Desktop** instalado. [Baixe aqui](https://www.docker.com/products/docker-desktop/).

### 2. Configurando Variáveis de Ambiente (.env)
O sistema necessita de chaves de comunicação com o Supabase.

- Entre nas pastas `backend/` e `frontend/`.
- Copie os arquivos `.env.example` para `.env`.
- Configure as chaves do Supabase em `backend/.env` (URL e Service Role Key).

### 3. Subindo o Ambiente
Na raiz do projeto, execute:
```powershell
docker compose up --build
```

---

## 🗺️ Mapa de Acesso

Após o "Server started", você poderá acessar as interfaces através dos endereços abaixo:

| Serviço | Endereço | Descrição |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:5173](http://localhost:5173) | Interface principal do usuário. |
| **Documentação** | [http://localhost:3000](http://localhost:3000) | Guia técnico detalhado em Docusaurus. |
| **API Backend** | [http://localhost:5000](http://localhost:5000) | Endpoints REST da aplicação. |
| **Swagger UI** | [http://localhost:5000/apidocs](http://localhost:5000/apidocs) | Documentação interativa da API. |

---

## 📁 Estrutura do Projeto

```text
.
├── backend/                # API Flask (Python)
│   ├── app/                # Lógica da aplicação
│   ├── tests/              # Suite de testes Pytest
│   └── wsgi.py             # Entrypoint do servidor
├── frontend/               # SPA React (TypeScript)
│   ├── src/pages/          # Páginas da aplicação
│   └── src/components/     # Componentes reutilizáveis
├── documentation/          # Site Docusaurus
└── docker-compose.yml      # Orquestração de containers
```

---

## 🛠️ Qualidade e CI/CD

Utilizamos **GitHub Actions** para automação de processos de qualidade:

- **Linting**: O backend é validado pelo `flake8`.
- **Testes**: Execução automática de `pytest` em cada Pull Request.
- **Build**: Verificação de integridade do build para frontend e documentação.

> [!IMPORTANT]
> **Boas Práticas**: Siga as convenções de commits e abertura de branches (`feature/`, `bugfix/`) conforme descrito na nossa documentação oficial local.

---

## 🔐 Autenticação e API

O sistema utiliza **JWT (JSON Web Token)** para sessões seguras.

### Fluxo de Login
1. O usuário se autentica na rota `/login` do frontend.
2. O Backend valida as credenciais no Supabase Auth.
3. O token retornado é armazenado no `localStorage`.
4. Todas as requisições subsequentes para a API devem conter o header:
   `Authorization: Bearer <seu_token>`

### Endpoints Principais (Tarefas)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/v1/tarefas` | Listar tarefas do usuário logado. |
| `POST` | `/api/v1/tarefas` | Criar uma nova tarefa. |
| `PATCH` | `/api/v1/tarefas/<id>` | Atualizar dados de uma tarefa existente. |
| `DELETE` | `/api/v1/tarefas/<id>` | Remover uma tarefa. |

---

**Engenharia de Software — Projeto Acadêmico**
