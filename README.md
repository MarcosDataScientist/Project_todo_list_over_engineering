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
│   └── PROCESSO_DESENVOLVIMENTO.md   # registro do processo (entregas, decisões)
├── backend/                          # API Flask
│   ├── .env.example
│   ├── pytest.ini
│   ├── requirements.txt
│   ├── wsgi.py
│   ├── app/
│   │   ├── __init__.py               # create_app, CORS, Swagger
│   │   ├── routes.py                 # rotas web e /api/v1/...
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
```

## Stack

| Camada        | Tecnologia                          |
|---------------|-------------------------------------|
| Frontend      | React, Vite, TypeScript             |
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

## Supabase

1. Crie um projeto em [Supabase](https://supabase.com/dashboard).
2. Copie **Project URL** e a chave (**service role** para o backend em ambiente controlado; **anon** só se as políticas RLS fizerem sentido para seu desenho).
3. Preencha `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (ou `SUPABASE_ANON_KEY`) em `backend/.env`.

## Documentação do processo

Atualize `docs/PROCESSO_DESENVOLVIMENTO.md` com entregas, decisões de equipe e referência a issues/commits, conforme exigências da disciplina.

## Licença

Veja o arquivo `LICENSE` na raiz do repositório.
