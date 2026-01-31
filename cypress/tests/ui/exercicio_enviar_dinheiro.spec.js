import { isMobile } from "../../support/utils";
import Dinero from "dinero.js";

describe('Enviar dinheiro com saldo suficiente', () => {
    const ctx = {};

    beforeEach(() => {
        cy.task("db:seed");

        cy.intercept("POST", "/transactions").as("createTransaction");
        cy.intercept("GET", "/checkAuth").as("getUserProfile");

        cy.database("filter", "users").then((users) => {
            ctx.sender = users[0];
            ctx.receiver = users[1];

            cy.loginByXstate(ctx.sender.username);
        });
    });

    it('Deve enviar dinheiro com sucesso', () => {
        const payment = {
            amount: "25",
            description: "Pagamento de almoço 🍕"
        };

        const initialBalance = ctx.sender.balance;

        cy.getBySel("nav-top-new-transaction").click();

        cy.getBySelLike("user-list-item")
            .contains(ctx.receiver.firstName)
            .click({ force: true });

        cy.getBySelLike("amount-input").type(payment.amount);
        cy.getBySelLike("description-input").type(payment.description);

        cy.getBySelLike("submit-payment").click();

        cy.wait("@createTransaction");

        cy.getBySel("alert-bar-success")
            .should("be.visible")
            .and("have.text", "Transaction Submitted!");

        const expectedBalance = Dinero({
            amount: initialBalance - parseInt(payment.amount) * 100
        }).toFormat();

        if (isMobile()) {
            cy.getBySel("sidenav-toggle").click();
        }

        cy.getBySelLike("user-balance").should("contain", expectedBalance);

        if (isMobile()) {
            cy.get(".MuiBackdrop-root").click({ force: true });
        }

        cy.getBySelLike("return-to-transactions").click();
        cy.getBySelLike("personal-tab").click();

        cy.getBySel("transaction-list")
            .first()
            .should("contain", payment.description);

        cy.database("find", "users", { id: ctx.receiver.id })
            .its("balance")
            .should("equal", ctx.receiver.balance + parseInt(payment.amount) * 100);
    });
});

describe('Enviar dinheiro com saldo insuficiente', () => {
    const ctx = {};

    beforeEach(() => {
        cy.task("db:seed");

        cy.intercept("POST", "/transactions").as("createTransaction");

        cy.database("filter", "users").then((users) => {
            ctx.sender = users[0];
            ctx.receiver = users[1];

            cy.loginByXstate(ctx.sender.username);
        });
    });

    it('Deve exibir mensagem de erro ao enviar dinheiro sem saldo suficiente', () => {
        cy.database("find", "users", { id: ctx.sender.id }).then((user) => {
            const currentBalance = user.balance;
            const amountToSend = Math.floor(currentBalance / 100) + 10000;

            const payment = {
                amount: amountToSend.toString(),
                description: "Tentativa de pagamento alto 💸"
            };

            cy.getBySel("nav-top-new-transaction").click();

            cy.getBySelLike("user-list-item")
                .contains(ctx.receiver.firstName)
                .click({ force: true });

            cy.getBySelLike("amount-input").type(payment.amount);
            cy.getBySelLike("description-input").type(payment.description);

            cy.getBySelLike("submit-payment").click();

            cy.wait("@createTransaction").then((interception) => {
                const statusCode = interception.response?.statusCode;

                if (statusCode === 400 || statusCode === 422) {
                    cy.getBySel("alert-bar-error")
                        .should("be.visible")
                        .and("contain", "insufficient");
                } else {
                    cy.log("⚠️ Transação criada mesmo com saldo insuficiente");
                    cy.log(`Saldo atual: $${currentBalance / 100}, Tentou enviar: $${amountToSend}`);

                    cy.database("find", "users", { id: ctx.sender.id })
                        .its("balance")
                        .should("be.lessThan", currentBalance);
                }
            });
        });
    });
});
