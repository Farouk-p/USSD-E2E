/// <reference types="cypress" />

import { LoginPage } from "../pages/loginPage";

const loginPage = new LoginPage();

describe("B4B Login", function () {
  beforeEach(function () {
    //Get test data from the file in fixture folder
    cy.fixture("loginTest.json").then(function (test_data) {
      this.test_data = test_data;
    });
  });

  it.only("Validate page Title", function () {
    cy.visit("https://b4bv2-git-develop-pbbamboo.vercel.app/auth/login");

    //Validate page title
    cy.title().should("contain", "Bamboo 4 Business");
  });

  it("Invalid Login test", function () {
    loginPage.enterUsername(this.test_data.email);
    loginPage.enterPassword(this.test_data.invalid_password);
    loginPage.clickOnLogin();

    //Validate Invalid Credentials response is returned
    cy.get(".css-1ip3h09").should("contain", "Invalid credentials");

    loginPage.clearUsernamefield();
    loginPage.clearPasswordfield();
  });

  it.skip("Valid Login test", function () {
    loginPage.enterUsername(this.test_data.email);
    loginPage.enterPassword(this.test_data.password);
    loginPage.clickOnLogin();

    //Validate if user was redirected to the OTP page
    cy.get(".css-19561ge").should("have.text", "Enter verfication code");
  });
});
