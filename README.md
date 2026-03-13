# RealWorldApp Cypress â€” Framework Lume

![Cypress Tests](https://github.com/yagoSoRodri/RealWorldAppCypress-Lume/actions/workflows/cypress.yml/badge.svg)

Projeto de automaÃ§Ã£o de testes end-to-end construÃ­do sobre a base do **RealWorld App**, utilizando **Cypress** com a arquitetura proprietÃ¡ria **Lume**. O objetivo Ã© demonstrar domÃ­nio tÃ©cnico em automaÃ§Ã£o de qualidade com prÃ¡ticas modernas de engenharia de software.

---

## Pilares TÃ©cnicos

### Arquitetura HÃ­brida (Page Objects + App Actions)

- ImplementaÃ§Ã£o do padrÃ£o **Page Objects** do framework Lume sobre a estrutura nativa do RealWorld App
- SeparaÃ§Ã£o rigorosa de responsabilidades:
  - **Pages**: contÃªm exclusivamente localizadores de elementos e mÃ©todos de aÃ§Ã£o
  - **Testes (.cy.js / .spec.ts)**: concentram todas as asserÃ§Ãµes (`should`, `expect`)
- Estrutura organizada em `cypress/support/pages/` para mÃ¡xima escalabilidade

### Massa de Dados Resiliente

- UtilizaÃ§Ã£o da biblioteca **@faker-js/faker** para geraÃ§Ã£o dinÃ¢mica de dados a cada execuÃ§Ã£o
- Campos como nome, sobrenome, usuÃ¡rio e senha sÃ£o criados programaticamente, eliminando dependÃªncia de dados estÃ¡ticos em fixtures JSON
- Cobertura ampliada de **casos de borda** atravÃ©s da aleatoriedade controlada dos inputs

### IntegraÃ§Ã£o ContÃ­nua (CI/CD)

- Pipeline configurado via **GitHub Actions** no arquivo `.github/workflows/cypress.yml`
- ExecuÃ§Ã£o automatizada em cada `push` e `pull_request` na branch `main`
- Ambiente padronizado em **Ubuntu Latest** com Chrome headless
- Upload automÃ¡tico de **screenshots e vÃ­deos** como artefatos em caso de falha, garantindo rastreabilidade

### Expertise em Banco de Dados

- Projeto preparado para **validaÃ§Ãµes de persistÃªncia direta via SQL**
- IntegraÃ§Ã£o configurada atravÃ©s de `cy.task('queryDatabase')` com suporte a **PostgreSQL**
- Possibilidade de verificar se registros foram corretamente persistidos apÃ³s aÃ§Ãµes de UI

### Clean Code

- Seletores resilientes baseados no atributo `data-test`, evitando dependÃªncia de classes CSS ou IDs frÃ¡geis
- CÃ³digo autoexplicativo e sem comentÃ¡rios desnecessÃ¡rios
- Comandos customizados (`cy.getBySel`, `cy.loginViaApi`) para reduÃ§Ã£o de duplicaÃ§Ã£o e aumento da legibilidade

---

## Diferenciais TÃ©cnicos

### ValidaÃ§Ã£o de PersistÃªncia via SQL

A maioria dos frameworks de teste E2E valida apenas o que Ã© visÃ­vel na interface. Este projeto vai alÃ©m: apÃ³s aÃ§Ãµes crÃ­ticas de UI (como cadastro de usuÃ¡rio ou criaÃ§Ã£o de transaÃ§Ã£o), o sistema executa queries SQL diretamente no banco de dados via `cy.task('queryDatabase')` para confirmar que o registro foi efetivamente persistido. Essa abordagem reduz drasticamente o risco de bugs silenciosos em produÃ§Ã£o â€” cenÃ¡rios onde a UI exibe sucesso, mas o dado nunca chega ao banco. A validaÃ§Ã£o em camada de dados Ã© uma prÃ¡tica essencial para garantir integridade ponta a ponta.

### Massa de Dados DinÃ¢mica com @faker-js/faker

Testes que dependem de dados fixos (hardcoded) tendem a passar repetidamente sem revelar falhas reais, criando uma falsa sensaÃ§Ã£o de seguranÃ§a. Ao utilizar **@faker-js/faker**, cada execuÃ§Ã£o gera combinaÃ§Ãµes Ãºnicas de nome, sobrenome, usuÃ¡rio e senha, simulando o comportamento real de usuÃ¡rios em produÃ§Ã£o. Essa estratÃ©gia expÃµe bugs de validaÃ§Ã£o, encoding, truncamento e limites de campo que dados estÃ¡ticos jamais alcanÃ§ariam. O resultado Ã© uma suÃ­te de testes mais robusta, com maior cobertura efetiva e menor taxa de defeitos escapados para produÃ§Ã£o.

---

## Estrutura do Projeto

```
cypress/
â”œâ”€â”€ support/
â”‚   â”œâ”€â”€ pages/
â”‚   â”‚   â””â”€â”€ LoginPage.js
â”‚   â”œâ”€â”€ commands.ts
â”‚   â””â”€â”€ e2e.ts
â”œâ”€â”€ tests/
â”‚   â”œâ”€â”€ ui/
â”‚   â”‚   â”œâ”€â”€ auth.spec.ts
â”‚   â”‚   â”œâ”€â”€ execicio_login_register.spec.js
â”‚   â”‚   â””â”€â”€ ...
â”‚   â””â”€â”€ api/
â”‚       â””â”€â”€ ...
â”œâ”€â”€ fixtures/
â””â”€â”€ videos/
```

---

## PrÃ©-requisitos

- **Node.js** (versÃ£o 20 ou superior)
- **npm** ou **yarn**
- **Google Chrome**

---

## InstalaÃ§Ã£o

```bash
npm install
```

---

## ExecuÃ§Ã£o dos Testes

**Modo interativo (Cypress GUI):**

```bash
npx cypress open
```

**Modo headless (CI/CD):**

```bash
npx cypress run --browser chrome --headless
```

---

## Tecnologias Utilizadas

| Tecnologia              | Finalidade                            |
| ----------------------- | ------------------------------------- |
| Cypress                 | Framework de testes E2E               |
| @faker-js/faker         | GeraÃ§Ã£o dinÃ¢mica de massa de dados    |
| GitHub Actions          | Pipeline de integraÃ§Ã£o contÃ­nua       |
| PostgreSQL (pg)         | ValidaÃ§Ã£o de persistÃªncia via SQL     |
| TypeScript / JavaScript | Linguagens dos testes e configuraÃ§Ãµes |

---

## Autor

Desenvolvido como projeto de portfÃ³lio em engenharia de qualidade de software.
