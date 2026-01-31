# 🚀 Cypress Real World App - Exercícios de Automação

Este projeto é um fork do [Cypress Real World App (RWA)](https://github.com/cypress-io/cypress-realworld-app), uma aplicação de pagamentos completa usada para demonstrar padrões de teste com Cypress.

---

## 🎯 Objetivo do Projeto
Este repositório contém a implementação de casos de teste automatizados focados em fluxos críticos de usuário, utilizando **Cypress** com **JavaScript**.

### 🛠️ Tecnologias Utilizadas
- **Framework de Teste:** [Cypress](https://www.cypress.io/)
- **Linguagem:** JavaScript
- **App Base:** React, Express, lowdb.

---

## 🧪 Exercícios Realizados

Os testes foram desenvolvidos para validar as três principais funcionalidades da aplicação:

### 1. Autenticação e Registro 🔐
- **Arquivo:** `cypress/tests/ui/execicio_login_register.spec.js`
- **Cenários:**
  - Login com sucesso usando usuário válido.
  - Tentativa de login com credenciais inválidas (validação de erro).
  - Registro de novo usuário com fluxo completo.
  - Validação de campos obrigatórios no formulário de cadastro.

### 2. Envio de Dinheiro (Transações) 💸
- **Arquivo:** `cypress/tests/ui/exercicio_enviar_dinheiro.spec.js`
- **Cenários:**
  - Envio de dinheiro com saldo suficiente.
  - Validação de atualização de saldo do remetente e destinatário.
  - Tentativa de envio com saldo insuficiente (validação de regra de negócio).

### 3. Histórico de Transações 📋
- **Arquivo:** `cypress/tests/ui/exercicio_historico_transacoes.spec.js`
- **Cenários:**
  - Visualização da lista de transações pessoais.
  - Detalhamento de uma transação específica.
  - Filtros por data e valor.
  - Paginação dos resultados.
  - Validação de "Empty State" (quando não há transações no filtro).

---

## 📁 Estrutura de Pastas dos Testes

```text
cypress/
  └── tests/
      └── ui/
          ├── execicio_login_register.spec.js
          ├── exercicio_enviar_dinheiro.spec.js
          └── exercicio_historico_transacoes.spec.js
```

---

## 🎥 Evidências (Vídeos)

Sempre que os testes são executados via terminal (`cypress run`), o Cypress gera automaticamente vídeos da execução.

- **Localização:** `cypress/videos/`
- **Arquivos:**
  - `execicio_login_register.spec.js.mp4`
  - `exercicio_enviar_dinheiro.spec.js.mp4`
  - `exercicio_historico_transacoes.spec.js.mp4`

---

## ⚙️ Como Executar os Testes

1. **Instalar dependências:**
   ```bash
   yarn install
   ```

2. **Iniciar a aplicação:**
   ```bash
   yarn dev
   ```

3. **Abrir o Cypress (Modo Interativo):**
   ```bash
   npx cypress open
   ```

4. **Executar via Terminal (Modo Headless):**
   ```bash
   npm run cypress:run -- --spec "cypress/tests/ui/exercicio_*"
   ```

---

## 👤 Autor
**Yago Souza Rodrigues**
- GitHub: [@yagoSoRodri](https://github.com/yagoSoRodri)

---
> *Este projeto foi desenvolvido como parte de exercícios de aprendizado em automação de testes com Cypress.*
