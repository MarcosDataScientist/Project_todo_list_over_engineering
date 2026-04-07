---
sidebar_position: 3
title: Guia de Convenções (Git/Workflow)
---

# Guia de Convenções: Fluxo de Trabalho

Trabalhar em equipe exige organização. Adotamos o **GitHub Flow** para que o desenvolvimento seja fluido e sem conflitos.

## Racional do Fluxo

O uso de prefixos em branches e Pull Requests (PRs) não é apenas burocracia; é a forma como garantimos que qualquer desenvolvedor consiga entender o histórico do projeto e o que cada mudança trouxe.

### Convenção de Branches
| Objetivo | Prefixo | Exemplo |
| :--- | :--- | :--- |
| **Nova Funcionalidade** | `feature/` | `feature/auth-supabase` |
| **Correção de Bug** | `bugfix/` | `bugfix/delete-task-404` |
| **Documentação** | `docs/` | `docs/update-cicd` |

:::important
**Cuidado com Conflitos**:
Sempre crie sua branch a partir da `main` atualizada. Isso evita que você precise resolver conflitos complexos no final do dia.
:::

---

## O Pull Request (PR)

Vemos o PR como uma ferramenta de **compartilhamento de conhecimento**, não apenas uma barreira. 

### Boas Práticas (Condução)
- **Descrição**: No título do PR, descreva de forma concisa o que foi feito. 
- **Checklist**: Antes de pedir revisão, garanta que seu código passou pelos testes locais.

:::tip
**Revisão de Código**:
Ao revisar o código de um colega, foque em melhorias e aprendizado mútuo. Se encontrar algo que pode ser feito de forma mais eficiente, sugira o caminho em vez de apenas apontar o erro.
:::

:::important
**Aprovação e CI**:
Para que uma mudança chegue à `main`, o pipeline de CI (GitHub Actions) **precisa estar verde** e pelo menos um outro membro do time deve aprovar. Isso garante que o código está estável.
:::
