class LoginPage {
  get usernameInput() {
    return cy.getBySel('signin-username');
  }
  get passwordInput() {
    return cy.getBySel('signin-password');
  }
  get submitBtn() {
    return cy.getBySel('signin-submit');
  }

  fillLogin(username, password) {
    if (username) this.usernameInput.type(username);
    if (password) this.passwordInput.type(password);
  }

  submit() {
    this.submitBtn.click();
  }
}

export default new LoginPage();
