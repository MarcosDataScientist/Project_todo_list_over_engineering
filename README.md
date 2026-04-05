# 🚀 Todo List — Engenharia de Software (Guia do Desenvolvedor)

Bem-vindo ao projeto **Todo List Over Engineering**. Este não é apenas um simples "caderno de tarefas"; este é um projeto acadêmico de **Engenharia de Software** desenhado para aplicar e demonstrar as melhores práticas de programação, arquitetura de sistemas e infraestrutura moderna.

---

## 🏗️ Por que essa Arquitetura?

Desenhamos este sistema para ser escalável e fácil de manter, separando as responsabilidades em três grandes pilares:

1.  **Backend (Python/Flask)**: Escolhemos o Flask pela sua simplicidade e controle total sobre a API. Ele gerencia as regras de negócio e centraliza a comunicação com o Supabase.
2.  **Frontend (React + Vite)**: O Vite nos dá velocidade, enquanto o React permite uma interface reativa e modularizada.
3.  **Supabase (Nuvem)**: Optamos por um Postgres gerenciado para que o time tenha uma base de dados compartilhada instantaneamente, sem precisar configurar bancos locais complexos.

---

## 🐳 Guia de Início Rápido com Docker (Recomendado)

A forma mais eficiente de rodar este projeto e garantir que "funcione na minha máquina" é utilizando o **Docker**. Ele isola todas as dependências (Python, Node, bibliotecas) dentro de containers.

### 1. Pré-requisitos
Antes de começar, você precisará ter instalado:
- **Docker Desktop** (que já inclui o Docker Compose). [Baixe aqui](https://www.docker.com/products/docker-desktop/).

### 2. Preparando os Segredos (.env)
O sistema precisa de chaves para falar com o Supabase. 
- Entre nas pastas `backend/` e `frontend/`.
- Copie os arquivos `.env.example` para `.env`.
- Configure as suas chaves do Supabase no `backend/.env` (Project URL e Service Role Key).

### 3. Subindo o Ambiente
Na raiz do projeto, execute o comando que irá construir as imagens e subir os serviços:

```powershell
docker compose up --build
```

> [!TIP]
> **Hot Reload Ativo**: Configuramos os volumes e o sistema de polling para que qualquer alteração que você fizer no código (Backend, Frontend ou Docs) seja refletida **instantaneamente** no navegador, sem precisar reiniciar o Docker.

---

<<<<<<< HEAD
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
=======
## 🗺️ Mapa de Acesso
>>>>>>> 19ebc9a9608d4fa40284ce692eb7c3fba99c9f9a

Assim que o Docker terminar de subir (você verá os logs de "Server started"), você poderá acessar:

<<<<<<< HEAD
| Camada        | Tecnologia                          |
|---------------|-------------------------------------|
| Frontend      | React, Vite, TypeScript, React Router |
| Backend       | Flask 3                             |
| Banco / auth  | Supabase (PostgreSQL)               |
| Testes (API)  | Pytest                              |
| Documentação API | Swagger UI via Flasgger (`/apidocs`) |
=======
| Serviço | Endereço | Descrição |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:5173](http://localhost:5173) | Interface do usuário (React). |
| **Documentação** | [http://localhost:3000](http://localhost:3000) | Guia técnico completo (Docusaurus). |
| **API Backend** | [http://localhost:5000](http://localhost:5000) | Endpoints REST (Flask). |
| **API Blueprint** | [http://localhost:3000/api](http://localhost:3000/api) | Documentação interativa da API (OpenAPI/Redoc). |
>>>>>>> 19ebc9a9608d4fa40284ce692eb7c3fba99c9f9a

---

## 🛠️ Qualidade e CI/CD

Para manter o projeto saudável, integramos um pipeline de **GitHub Actions**. Sempre que você abrir um Pull Request, o GitHub irá:
- Validar se o Backend passa no Linter (`flake8`) e nos Testes (`pytest`).
- Verificar se o Frontend e a Documentação fazem o Build sem erros.

<<<<<<< HEAD
- API de exemplo: `GET /api/v1/status` — indica se o Supabase está configurado no servidor.
- **Swagger UI:** após subir o Flask, abra `http://127.0.0.1:5000/apidocs` para explorar e testar os endpoints documentados.
- O `.env` é carregado a partir de **`backend/.env`** mesmo se você rodar o Flask a partir de outra pasta (desde que o módulo `app` seja o do projeto).
- **Login no front mostra “não conectar”?** É preciso **Flask em `:5000`** **e** **`npm run dev`** (proxy `/api` → 5000). Se o Flask usar outra porta (ex. 5001), ajuste `target` em `frontend/vite.config.ts`. Teste `http://127.0.0.1:5000/health` no navegador.
=======
> [!IMPORTANT]
> **Boas Práticas de Commit**: 
> Procure seguir as convenções de branches (`feature/`, `bugfix/`) detalhadas na nossa [documentação oficial](http://localhost:3000/docs/geral/conventions).
>>>>>>> 19ebc9a9608d4fa40284ce692eb7c3fba99c9f9a

---

<<<<<<< HEAD
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
=======
**Engenharia de Software — Projeto Acadêmico**
>>>>>>> 19ebc9a9608d4fa40284ce692eb7c3fba99c9f9a
