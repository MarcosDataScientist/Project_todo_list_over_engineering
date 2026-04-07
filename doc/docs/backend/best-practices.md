---
sidebar_position: 1
title: Guia de Implementação (Backend)
---

# Guia de Implementação: Backend (Python/Flask)

Nosso backend foi construído com **Flask** para garantir simplicidade e flexibilidade total, focando em uma API REST clara e bem documentada.

## Racional da Escolha

Optamos pelo **Flask** por ser um microframework leve que nos permite ter controle total sobre cada rota e middleware sem "mágica" excessiva, o que facilita o aprendizado e a depuração durante o projeto.

### Documentação Automática (OpenAPI)
Para que você não precise escrever documentação manual toda vez, integramos o **Flasgger**. 
- Ao escrever docstrings no formato YAML nas suas rotas, a especificação OpenAPI é gerada automaticamente.
- Criamos o script `backend/export_openapi.py` para exportar esse JSON de forma estática, permitindo que o Docusaurus renderize a documentação mesmo com o backend offline.

:::important
**Estrutura da API**:
Sempre retorne respostas JSON e utilize códigos de erro claros (Ex: 400 para erros de validação). O objetivo é que qualquer cliente (React ou até o Swagger) consiga entender o erro sem precisar ler logs do servidor.
:::

## Boas Práticas (Condução)

Ao implementar novas funcionalidades:
- **Separação de Lógica**: Mantenha a lógica de integração com o Supabase isolada na pasta `integrations` e use as `routes` apenas para lidar com a requisição HTTP.
- **Tratamento de Erros**: Utilize blocos `try/except` ao lidar com banco de dados para evitar quedas no container e retornar mensagens amigáveis ao frontend.

:::tip
**Testes Locais**:
Sempre execute o `pytest` na pasta `backend/` antes de abrir um PR. O CI/CD irá verificar isso automaticamente, então resolver localmente ganha tempo.
:::
