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

## 🗺️ Mapa de Acesso

Assim que o Docker terminar de subir (você verá os logs de "Server started"), você poderá acessar:

| Serviço | Endereço | Descrição |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:5173](http://localhost:5173) | Interface do usuário (React). |
| **Documentação** | [http://localhost:3000](http://localhost:3000) | Guia técnico completo (Docusaurus). |
| **API Backend** | [http://localhost:5000](http://localhost:5000) | Endpoints REST (Flask). |
| **API Blueprint** | [http://localhost:3000/api](http://localhost:3000/api) | Documentação interativa da API (OpenAPI/Redoc). |

---

## 🛠️ Qualidade e CI/CD

Para manter o projeto saudável, integramos um pipeline de **GitHub Actions**. Sempre que você abrir um Pull Request, o GitHub irá:
- Validar se o Backend passa no Linter (`flake8`) e nos Testes (`pytest`).
- Verificar se o Frontend e a Documentação fazem o Build sem erros.

> [!IMPORTANT]
> **Boas Práticas de Commit**: 
> Procure seguir as convenções de branches (`feature/`, `bugfix/`) detalhadas na nossa [documentação oficial](http://localhost:3000/docs/geral/conventions).

---

**Engenharia de Software — Projeto Acadêmico**
