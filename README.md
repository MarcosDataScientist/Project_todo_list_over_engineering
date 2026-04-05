# Todo List — Engenharia de Software

Projeto acadêmico para a disciplina de **Engenharia de Software**: aplicação de lista de tarefas com backend em **Python/Flask**, frontend em **React + Vite**, persistência no **Supabase** (PostgreSQL gerenciado), testes automatizados com **Pytest** e documentação de API com **Swagger** (OpenAPI), exposta pelo **Flasgger**.

## Visão geral da arquitetura

```text
┌─────────────┐     HTTP (JSON)      ┌──────────────┐     SDK / SQL     ┌───────────┐
│  React+Vite │ ◄─────────────────► │ Flask (API)  │ ◄──────────────► │ Supabase  │
│  frontend/  │   CORS em /api/*     │  backend/    │                  │ (Postgres)│
└─────────────┘                      └──────────────┘                  └───────────┘
```

- **Frontend** consome a API REST sob `/api/...`. Em desenvolvimento, o Vite faz **proxy** das rotas `/api` e `/health` para o Flask (porta 5000), evitando problemas de CORS no dia a dia.
- **Backend** centraliza regras de negócio e credenciais sensíveis; o cliente Supabase fica em `backend/app/integrations/supabase_client.py` (nunca exponha **service role** no React).
- **Supabase** hospeda o banco; o backend usa variáveis `SUPABASE_URL` e chave adequada (preferência por **service role** só no servidor).

## Estrutura de pastas

```text
.
├── README.md
├── docs/
│   ├── PROCESSO_DESENVOLVIMENTO.md   # registro do processo (entregas, decisões)
│   └── supabase_schema.sql           # DDL: pessoa + tarefas (rodar no SQL Editor)
├── backend/                          # API Flask
│   ├── .env.example
│   ├── pytest.ini
│   ├── requirements.txt
│   ├── wsgi.py
│   ├── app/
│   │   ├── __init__.py               # create_app, CORS, Swagger
│   │   ├── routes.py                 # rotas web e /api/v1/...
│   │   ├── routes_auth.py            # login /auth/me (Supabase Auth)
│   │   ├── routes_tarefas.py         # CRUD tarefas (JWT + pessoa)
│   │   ├── routes_pessoa.py          # GET/PATCH perfil pessoa (JWT)
│   │   ├── auth_pessoa.py            # Supabase + id pessoa logada
│   │   ├── auth_context.py           # Bearer + get_user
│   │   ├── services/
│   │   │   └── pessoa.py             # vínculo auth.users → pessoa
│   │   ├── templates/
│   │   ├── static/
│   │   └── integrations/
│   │       └── supabase_client.py
│   └── tests/                        # Pytest
└── frontend/                         # React + Vite + TypeScript
    ├── .env.example
    ├── index.html
    ├── vite.config.ts
    └── src/
        ├── pages/                    # Login, menu, cadastros, lista/detalhe tarefas, perfil
        ├── components/               # layout com menu (área logada)
        └── auth.ts                   # token no localStorage
```

## Stack

| Camada        | Tecnologia                          |
|---------------|-------------------------------------|
| Frontend      | React, Vite, TypeScript, React Router |
| Backend       | Flask 3                             |
| Banco / auth  | Supabase (PostgreSQL)               |
| Testes (API)  | Pytest                              |
| Documentação API | Swagger UI via Flasgger (`/apidocs`) |

## Backend (Flask)

### Configuração

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edite .env: SECRET_KEY, Supabase, CORS se necessário.
export FLASK_APP=wsgi:app
flask run
```

- API de exemplo: `GET /api/v1/status` — indica se o Supabase está configurado no servidor.
- **Swagger UI:** após subir o Flask, abra `http://127.0.0.1:5000/apidocs` para explorar e testar os endpoints documentados.
- O `.env` é carregado a partir de **`backend/.env`** mesmo se você rodar o Flask a partir de outra pasta (desde que o módulo `app` seja o do projeto).
- **Login no front mostra “não conectar”?** É preciso **Flask em `:5000`** **e** **`npm run dev`** (proxy `/api` → 5000). Se o Flask usar outra porta (ex. 5001), ajuste `target` em `frontend/vite.config.ts`. Teste `http://127.0.0.1:5000/health` no navegador.

### Testes (Pytest)

```bash
cd backend
source .venv/bin/activate
pytest
```

## Frontend (React + Vite)

### Configuração

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

- Interface padrão: `http://127.0.0.1:5173` (com proxy para a API em `http://127.0.0.1:5000`).
- `VITE_API_BASE_URL`: em dev costuma ficar vazio (requisições relativas + proxy). Em produção, aponte para a URL pública da API.

### Login e área logada

- Rota **`/login`**: envio assíncrono (`fetch`) para `POST /api/v1/auth/login` com `email` e `password` (usuário deve existir em **Supabase → Authentication**).
- Em sucesso, o **access token** (JWT) é guardado em `localStorage` e o app redireciona para **`/inicio`** (menu com resumo do cadastro **pessoa** e atalhos).
- **`GET /api/v1/auth/me`** valida o token (`Authorization: Bearer …`).
- **Sair** remove o token e volta para `/login`.
- Fluxo típico: **`/inicio`** → **Cadastros** (`/cadastro`: tarefa ou usuário em `/cadastro/usuario`), **Lista de tarefas** (`/tarefas`, observação truncada a 150 caracteres), detalhe em **`/tarefas/<id>`** (somente leitura, editar ou excluir). Após **cadastrar** uma tarefa, o app volta para **`/tarefas`** com a lista completa (a nova costuma aparecer primeiro, por ordem de criação). A rota **`/perfil`** redireciona para **`/cadastro/usuario`**. Todas as chamadas à API enviam `Authorization: Bearer …`.

### API de tarefas (requer JWT)

| Método | Rota | Descrição |
|--------|------|------------|
| `GET` | `/api/v1/tarefas` | Listar tarefas do usuário |
| `GET` | `/api/v1/tarefas/<id>` | Buscar uma tarefa |
| `POST` | `/api/v1/tarefas` | Criar (`descricao_tarefa`, `data_expiracao`, `observacao` opcional, `status` opcional, default `PENDENTE`) |
| `PATCH` | `/api/v1/tarefas/<id>` | Editar campos enviados |
| `DELETE` | `/api/v1/tarefas/<id>` | Excluir |

### API de pessoa / perfil (requer JWT)

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