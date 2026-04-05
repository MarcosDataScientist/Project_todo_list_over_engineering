---
sidebar_position: 2
title: CI/CD (GitHub Actions)
---

# Integração Contínua e Entrega Contínua (CI/CD)

O projeto utiliza **GitHub Actions** para garantir a qualidade do código e a estabilidade do sistema em cada alteração. O pipeline de CI é acionado automaticamente em cada `push` ou `Pull Request` para as branches principais (`main`, `master`).

## Workflow de Verificação

O workflow está definido em `.github/workflows/ci.yml` e é composto por três jobs principais:

### 1. Backend Checks (Python)
Este job verifica a integridade da API Flask:
- **Linting**: Usa o `flake8` para garantir que o código segue os padrões do PEP8.
- **Testes**: Executa a suíte de testes com `pytest`.
- **Cobertura**: Gera um relatório de cobertura de código com `pytest-cov`.

### 2. Frontend Checks (React + Vite)
Garante que o painel administrativo e a interface do usuário estejam corretos:
- **Type Checking**: Usa o `tsc` (TypeScript Compiler) para validar a tipagem estática.
- **Build**: Realiza o build de produção (`npm run build`) para verificar se não há erros na geração do pacote final.

### 3. Documentation Checks (Docusaurus)
Valida o site de documentação:
- **Build Verification**: Executa o build do Docusaurus para garantir que não existam links quebrados ou erros de configuração no conteúdo local.

## Configuração de Secrets no GitHub

Para que o job de testes do backend funcione corretamente (se preferir usar chaves reais em vez de mocks), você deve configurar os seguintes **Secrets** no seu repositório GitHub:

1. Vá em **Settings** > **Secrets and variables** > **Actions**.
2. Clique em **New repository secret**.
3. Adicione:
   - `SUPABASE_URL`: A URL da API do seu projeto Supabase.
   - `SUPABASE_SERVICE_ROLE_KEY`: A chave secreta do seu projeto.

## Comandos Úteis

Se você quiser rodar as verificações locais idênticas ao CI antes de fazer o push:

### Backend
```bash
cd backend
flake8 .
pytest
```

### Frontend
```bash
cd frontend
npm run build
```

### Documentação
```bash
cd documentation
npm run build
```
