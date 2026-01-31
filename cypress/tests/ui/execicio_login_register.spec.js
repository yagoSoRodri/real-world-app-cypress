describe('Login com sucesso', () => {
    beforeEach(() => {
        cy.task("db:seed");
    });

    it('Deve fazer login com um usuário válido', () => {
        cy.database("find", "users").then((user) => {
            cy.visit("/signin");
            cy.getBySel("signin-username").type(user.username);
            cy.getBySel("signin-password").type("s3cret");
            cy.getBySel("signin-submit").click();

            cy.location("pathname").should("equal", "/");
            cy.getBySel("sidenav-user-full-name").should("contain", user.firstName);
        });
    });
});

describe('Tentar fazer login com credenciais inválidas', () => {
    beforeEach(() => {
        cy.task("db:seed");
    });

    it('Deve exibir uma mensagem de erro ao fazer login com credenciais inválidas', () => {
        cy.visit("/signin");
        cy.getBySel("signin-username").type("usuario_invalido");
        cy.getBySel("signin-password").type("senha_invalida");
        cy.getBySel("signin-submit").click();

        cy.getBySel("signin-error")
            .should("be.visible")
            .and("contain", "Username or password is invalid");
    });
});

describe('Registro de novo usuário com sucesso', () => {
    beforeEach(() => {
        cy.task("db:seed");
    });

    it('Deve registrar um novo usuário com informações válidas', () => {
        cy.intercept("POST", "/users").as("signup");
        cy.visit("/signup");

        const newUser = {
            firstName: "Novo",
            lastName: "Usuario",
            username: "novousuario123",
            password: "password123",
            confirmPassword: "password123"
        };

        cy.getBySel("signup-first-name").type(newUser.firstName);
        cy.getBySel("signup-last-name").type(newUser.lastName);
        cy.getBySel("signup-username").type(newUser.username);
        cy.getBySel("signup-password").type(newUser.password);
        cy.getBySel("signup-confirmPassword").type(newUser.confirmPassword);

        cy.getBySel("signup-submit").click();

        cy.wait("@signup");

        cy.location("pathname").should("equal", "/signin");
    });
});

describe('Tentar registrar um novo usuário com informações incompletas', () => {
    beforeEach(() => {
        cy.task("db:seed");
    });

    it('Deve exibir mensagens de erro ao tentar registrar um novo usuário sem preencher todas as informações obrigatórias', () => {
        cy.visit("/signup");

        // Dispara validação tocando nos campos e saindo
        cy.getBySel("signup-first-name").find("input").focus().blur();
        cy.get("#firstName-helper-text").should("contain", "First Name is required");

        cy.getBySel("signup-password").find("input").type("123").blur();
        cy.get("#password-helper-text").should("contain", "Password must contain at least 4 characters");

        cy.getBySel("signup-submit").should("be.disabled");
    });
});
