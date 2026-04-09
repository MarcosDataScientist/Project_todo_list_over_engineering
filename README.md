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
##ATENCAO MANTER O DOCKER.DESKTOP ABERTO PRA INICIAR O CONTEINER (LOGADO)
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

> [!NOTE]
> **Backend na porta 5000**: o mapeamento é `5000:5000` (host ↔ container). O Flask lê **apenas** `backend/.env` (igual ao dev local); não há variáveis de ambiente duplicadas no Compose que sobrescrevam o `.env`. O Vite no container usa `VITE_DEV_PROXY_TARGET=http://backend:5000` para encaminhar `/api` e `/health` ao serviço Docker `backend`. **Não** defina `VITE_API_BASE_URL=/api/v1` no Compose: o front já chama `${apiBase()}/api/v1/...`; com prefixo duplicado o login vira `POST /api/v1/api/v1/auth/login` (404). Deixe `VITE_API_BASE_URL` vazio e use só o proxy. Atualize `CORS_ORIGINS` no `.env` conforme `backend/.env.example` (inclui origens na porta 3000 da documentação).


---

<<<<<<< HEAD
=======
## 📁 Estrutura do Projeto

>>>>>>> b0a5ff6e0484100d9860f4893b627a541e67d944
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
<<<<<<< HEAD

Assim que o Docker terminar de subir (você verá os logs de "Server started"), você poderá acessar:

| Camada        | Tecnologia                          |
|---------------|-------------------------------------|
| Frontend      | React, Vite, TypeScript, React Router |
| Backend       | Flask 3                             |
| Banco / auth  | Supabase (PostgreSQL)               |
| Testes (API)  | Pytest                              |
| Documentação API | Swagger UI via Flasgger (`/apidocs`) |
=======
>>>>>>> b0a5ff6e0484100d9860f4893b627a541e67d944

---

## 🛠️ Qualidade e CI/CD

Utilizamos **GitHub Actions** para automação de processos de qualidade:

- **Linting**: O backend é validado pelo `flake8`.
- **Testes**: Execução automática de `pytest` em cada Pull Request.
- **Build**: Verificação de integridade do build para frontend e documentação.

<<<<<<< HEAD
- API de exemplo: `GET /api/v1/status` — indica se o Supabase está configurado no servidor.
- **Swagger UI:** após subir o Flask, abra `http://127.0.0.1:5000/apidocs` para explorar e testar os endpoints documentados.
- O `.env` é carregado a partir de **`backend/.env`** mesmo se você rodar o Flask a partir de outra pasta (desde que o módulo `app` seja o do projeto).
- **Login no front mostra “não conectar”?** É preciso **Flask em `:5000`** **e** **`npm run dev`** (proxy `/api` → 5000). Se o Flask usar outra porta (ex. 5001), ajuste `target` em `frontend/vite.config.ts`. Teste `http://127.0.0.1:5000/health` no navegador.

---

```bash
cd backend
source .venv/bin/activate
pytest
```
=======
> [!IMPORTANT]
> **Boas Práticas**: Siga as convenções de commits e abertura de branches (`feature/`, `bugfix/`) conforme descrito na nossa documentação oficial local.

---

## 🔐 Autenticação e API
>>>>>>> b0a5ff6e0484100d9860f4893b627a541e67d944

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

<<<<<<< HEAD
| Método | Rota | Descrição |
|--------|------|------------|
| `GET` | `/api/v1/pessoa/me` | Dados do cadastro **pessoa** do usuário logado |
| `PATCH` | `/api/v1/pessoa/me` | Atualizar `nome`, `cpf`, `nascimento`, `status` (campos enviados) |

O backend associa o usuário logado a uma linha em **`pessoa`** (`auth_user_id` = UUID do Supabase Auth) e filtra **`tarefas`** por `pessoa_id`.

## Supabase

1. Crie um projeto em [Supabase](https://supabase.com/dashboard).
2. Copie **Project URL** e a chave (**service role** para o backend em ambiente controlado; **anon** só se as políticas RLS fizerem sentido para seu desenho).
3. Preencha `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (ou `SUPABASE_ANON_KEY`) em `backend/.env`.
4. Habilite **Email** em Authentication → Providers e crie um usuário (ou use sign-up), para poder usar o login no app.
5. Rode o script **`docs/supabase_schema.sql`** no **SQL Editor** do projeto para criar `pessoa` e `tarefas` (inclui `auth_user_id` em `pessoa` para amarrar ao login). Se as tabelas já existiam, use o `ALTER` no final do arquivo para adicionar **`observacao`** em `tarefas`.

## Documentação do processo

Atualize `docs/PROCESSO_DESENVOLVIMENTO.md` com entregas, decisões de equipe e referência a issues/commits, conforme exigências da disciplina.

## Licença

Veja o arquivo `LICENSE` na raiz do repositório.
=======
**Engenharia de Software — Projeto Acadêmico**
>>>>>>> b0a5ff6e0484100d9860f4893b627a541e67d944
