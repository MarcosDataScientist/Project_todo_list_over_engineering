---
sidebar_position: 1
title: Guia de Implementação (Frontend)
---

# Guia de Implementação: Frontend (React/Vite)

Nossa interface foi construída com **React** e **Vite** para entregar uma aplicação rápida, moderna e com excelente experiência de desenvolvimento.

## Racional da Escolha

Escolhemos o **Vite** pelo seu build instantâneo e suporte nativo ao TypeScript. O **React** nos fornece a componentização necessária para que o código seja reutilizável e fácil de escalar à medida que novas funcionalidades surgirem.

### Proxy de Desenvolvimento
Para evitar conflitos de CORS durante o desenvolvimento, configuramos um **Proxy no Vite**.
- Qualquer chamada para `/api` no frontend é redirecionada internamente para o container de backend.
- Isso permite que o código use caminhos relativos, facilitando a migração entre ambientes (Local/Docker/Produção).

:::important
**Gerenciamento de Estado**:
Mantenha os componentes o mais simples possível. Se um estado for usado por mais de três componentes, considere utilizar um contexto ou elevar o estado.
:::

## Boas Práticas (Condução)

Ao desenvolver novos componentes:
- **TypeScript**: Use interfaces sólidas para todas as props. Isso evita bugs em tempo de execução e documenta o código por si só.
- **Feedback Visual**: Nunca deixe o usuário no vácuo. Use estados de carregamento (Loading) e notificações de erro (Toasts) para todas as ações assíncronas.

:::tip
**Variáveis VITE_**:
Lembre-se sempre de prefixar suas variáveis de ambiente com `VITE_` e acessá-las via `import.meta.env`. Isso é uma exigência do bundler para segurança.
:::
