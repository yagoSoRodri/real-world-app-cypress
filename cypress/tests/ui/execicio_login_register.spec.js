import { faker } from '@faker-js/faker';
import LoginPage from '../../support/pages/LoginPage';

describe('Login com sucesso', () => {
  beforeEach(() => {
    cy.task('db:seed');
  });

  it('Deve fazer login com um usuÃ¡rio vÃ¡lido', () => {
    cy.database('find', 'users').then((user) => {
      cy.visit('/signin');
      LoginPage.fillLogin(user.username, 's3cret');
      LoginPage.submit();

      cy.location('pathname').should('equal', '/');
      cy.getBySel('sidenav-user-full-name').should('contain', user.firstName);
    });
  });
});

describe('Tentar fazer login com credenciais invÃ¡lidas', () => {
  beforeEach(() => {
    cy.task('db:seed');
  });

  it('Deve exibir uma mensagem de erro ao fazer login com credenciais invÃ¡lidas', () => {
    cy.visit('/signin');
    LoginPage.fillLogin('usuario_invalido', 'senha_invalida');
    LoginPage.submit();

    cy.getBySel('signin-error')
      .should('be.visible')
      .and('contain', 'Username or password is invalid');
  });
});

describe('Registro de novo usuÃ¡rio com sucesso', () => {
  beforeEach(() => {
    cy.task('db:seed');
  });

  it('Deve registrar um novo usuÃ¡rio com informaÃ§Ãµes vÃ¡lidas', () => {
    cy.intercept('POST', '/users').as('signup');
    cy.visit('/signup');

    const password = faker.internet.password();
    const newUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      password: password,
      confirmPassword: password,
    };

    cy.getBySel('signup-first-name').type(newUser.firstName);
    cy.getBySel('signup-last-name').type(newUser.lastName);
    cy.getBySel('signup-username').type(newUser.username);
    cy.getBySel('signup-password').type(newUser.password);
    cy.getBySel('signup-confirmPassword').type(newUser.confirmPassword);

    cy.getBySel('signup-submit').click();

    cy.wait('@signup');

    cy.location('pathname').should('equal', '/signin');
  });
});

describe('Tentar registrar um novo usuÃ¡rio com informaÃ§Ãµes incompletas', () => {
  beforeEach(() => {
    cy.task('db:seed');
  });

  it('Deve exibir mensagens de erro ao tentar registrar um novo usuÃ¡rio sem preencher todas as informaÃ§Ãµes obrigatÃ³rias', () => {
    cy.visit('/signup');

    cy.getBySel('signup-first-name').find('input').focus().blur();
    cy.get('#firstName-helper-text').should('contain', 'First Name is required');

    cy.getBySel('signup-password').find('input').type('123').blur();
    cy.get('#password-helper-text').should(
      'contain',
      'Password must contain at least 4 characters'
    );

    cy.getBySel('signup-submit').should('be.disabled');
  });
});
