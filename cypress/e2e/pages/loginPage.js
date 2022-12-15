export class LoginPage {
  email_textbox = ":nth-child(1) > .chakra-input__group > .chakra-input";
  password_textbox = ":nth-child(2) > .chakra-input__group > .chakra-input";
  login_button = "form > .chakra-button";

  enterUsername(username) {
    cy.get(this.email_textbox).type(username);
  }
  enterPassword(password) {
    cy.get(this.password_textbox).type(password);
  }
  clickOnLogin() {
    cy.get(this.login_button).click();
  }

  clearUsernamefield() {
    cy.get(this.email_textbox).clear();
  }

  clearPasswordfield() {
    cy.get(this.password_textbox).clear();
  }
}
