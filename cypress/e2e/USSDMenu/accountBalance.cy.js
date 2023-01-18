/// <reference types="cypress" />

describe("Account balance test", function () {
  beforeEach(function () {
    //Get test data from the file in fixture folder
    cy.fixture("testData.json").then(function (test_data) {
      this.test_data = test_data;
    });
  });

  it("Check customer's Account balance", function () {
    //generate random string for session id
    let sessionid = Math.random().toString(36).substring(2, 7);

    cy.request({
      method: "GET",
      url:
        this.test_data.devBaseUrl +
        "/api/cswhook/GetRequest?msisdn=2348095834592&input=%2A945&sessionid=" +
        sessionid +
        "&network=MTN&action=begin&allinput=%2A945%23",
    })
      .then(function (response) {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(this.test_data.ussdMenu_FistPage);
      })
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=2348095834592&input=2&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Enter PIN to proceed\n");
        });
      })
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=2348095834592&input=1234&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.contain("Wema Account Balance");
        });
      });
  });

  it("Invalid Pin when checking Account balance", function () {
    //generate random string for session id
    let sessionid = Math.random().toString(36).substring(2, 7);

    cy.request({
      method: "GET",
      url:
        this.test_data.devBaseUrl +
        "/api/cswhook/GetRequest?msisdn=2348095834592&input=%2A945&sessionid=" +
        sessionid +
        "&network=MTN&action=begin&allinput=%2A945%23",
    })
      .then(function (response) {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(this.test_data.ussdMenu_FistPage);
      })
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=2348095834592&input=2&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Enter PIN to proceed\n");
        });
      })
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=2348095834592&input=3423&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.contain("Incorrect PIN");
        });
      });
  });
});
