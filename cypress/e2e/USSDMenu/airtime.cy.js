/// <reference types="cypress" />

describe("Airtime for self and others ", function () {
  beforeEach(function () {
    //Get test data from the file in fixture folder
    cy.fixture("testData.json").then(function (test_data) {
      this.test_data = test_data;
    });
  });

  it("Successful Airtime-self", function () {
    //generate random string for session id
    let sessionid = Math.random().toString(36).substring(2, 7);

    //Send request to access USSD Menu
    cy.request({
      method: "GET",
      url:
        this.test_data.devBaseUrl +
        "/api/cswhook/GetRequest?msisdn=" +
        this.test_data.phoneNumber +
        "&input=%2A945&sessionid=" +
        sessionid +
        "&network=MTN&action=begin&allinput=%2A945%23",
    })
      //Validate response payload returned is the USSD Menu
      .then(function (response) {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(this.test_data.ussdMenu_FistPage);
      })
      //Select option 3 Airtime/Data
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=3&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq(
            "Buy Airtime/Data\n1.Airtime Self\n2.Airtime Other\n3.Data Self\n4.Data Other\n0. Main Nenu\n"
          );
        });
      })
      //Select option 1, Airtime - self
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=1&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Enter Amount");
        });
      })
      //Enter Airtime Amount
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=100&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.contain(
            "Your request is being processed"
          );
        });
      });
  });

  it("Successful Airtime-others with valid Pin", function () {
    //generate random string for session id
    let sessionid = Math.random().toString(36).substring(2, 7);

    //Send request to access USSD Menu
    cy.request({
      method: "GET",
      url:
        this.test_data.devBaseUrl +
        "/api/cswhook/GetRequest?msisdn=" +
        this.test_data.phoneNumber +
        "&input=%2A945&sessionid=" +
        sessionid +
        "&network=MTN&action=begin&allinput=%2A945%23",
    })
      //Validate response payload returned is the USSD Menu
      .then(function (response) {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(this.test_data.ussdMenu_FistPage);
      })
      //Select option 3 Airtime/Data
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=3&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq(
            "Buy Airtime/Data\n1.Airtime Self\n2.Airtime Other\n3.Data Self\n4.Data Other\n0. Main Nenu\n"
          );
        });
      })
      //Select option 1, Airtime - self
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=2&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          //   expect(response.body.message).to.contain(
          //     "Enter the recipient phonenumber"
          //   );
        });
      })
      //Enter recipient phone number
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=08148413433&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Enter Amount");
        });
      })
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=100&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.contain("Enter your PIN");
        });
      })
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=1234&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.contain(
            "Your request is being processed"
          );
        });
      });
  });

  it("Airtime-others with Invalid Pin", function () {
    //generate random string for session id
    let sessionid = Math.random().toString(36).substring(2, 7);

    //Send request to access USSD Menu
    cy.request({
      method: "GET",
      url:
        this.test_data.devBaseUrl +
        "/api/cswhook/GetRequest?msisdn=" +
        this.test_data.phoneNumber +
        "&input=%2A945&sessionid=" +
        sessionid +
        "&network=MTN&action=begin&allinput=%2A945%23",
    })
      //Validate response payload returned is the USSD Menu
      .then(function (response) {
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(this.test_data.ussdMenu_FistPage);
      })
      //Select option 3 Airtime/Data
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=3&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq(
            "Buy Airtime/Data\n1.Airtime Self\n2.Airtime Other\n3.Data Self\n4.Data Other\n0. Main Nenu\n"
          );
        });
      })
      //Select option 1, Airtime - self
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=2&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          //   expect(response.body.message).to.contain(
          //     "Enter the recipient phonenumber"
          //   );
        });
      })
      //Enter recipient phone number
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=08148413433&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Enter Amount");
        });
      })
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=100&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.contain("Enter your PIN");
        });
      })
      .then(function () {
        cy.request({
          method: "GET",
          url:
            this.test_data.devBaseUrl +
            "/api/cswhook/GetRequest?msisdn=" +
            this.test_data.phoneNumber +
            "&input=3432&sessionid=" +
            sessionid +
            "&network=MTN&action=request&allinput=%2A945%23",
        }).then(function (response) {
          cy.log(JSON.stringify(response.body));
          expect(response.status).to.eq(200);
          expect(response.body.message).to.contain("Invalid PIN");
        });
      });
  });
});
