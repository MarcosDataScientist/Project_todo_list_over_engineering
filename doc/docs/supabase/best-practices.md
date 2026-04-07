---
sidebar_position: 1
title: Guia de Implementação (Supabase)
---

# Guia de Implementação: Supabase

Neste projeto, o **Supabase** foi escolhido estrategicamente para atuar como nosso banco de dados PostgreSQL compartilhado na nuvem.

## Racional da Escolha

A escolha do Supabase foi feita para termos um banco de dados compartilhado para desenvolvimento direto entre a equipe, facilitando a persistência de dados sem a necessidade de cada desenvolvedor gerenciar um banco local complexo.

:::important
**Sobre a Segurança e RLS**:
Diferente de projetos que utilizam o Supabase como serviço completo de backend, **nós não iremos utilizar a sua API REST/GraphQL**. Toda a nossa comunicação será feita via driver nativo do Postgres (SQLAlchemy/Psycopg2) no nosso Backend. Portanto, a configuração de **RLS (Row Level Security) não será necessária**, pois o controle de acesso é gerenciado pela nossa própria lógica de API.
:::

## Estrutura de Dados (Condução)

Ao criar novas tabelas no painel do Supabase, siga estas diretrizes para manter a consistência com o restante do time:

- **Nomenclatura**: Utilize sempre `snake_case` para tabelas e colunas. Isso é o padrão do ecossistema Postgres e facilita a integração com o SQLAlchemy.
- **Identificadores**: Utilize `uuid` para IDs primários. Isso evita previsibilidade de dados e facilita migrações futuras.
- **Timestamps**: Sempre inclua colunas de `created_at` e `updated_at` para rastreamento de auditoria simples.

:::tip
**Acesso Administrativo**:
Para o desenvolvimento, utilize a `service_role_key` configurada no seu `.env`. Lembre-se que ela concede poderes de administrador ao banco, ignorando qualquer restrição, o que é ideal para o nosso cenário de uso direto.
:::
