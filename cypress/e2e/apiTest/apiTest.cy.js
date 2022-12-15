describe("Example of api Automation with cypress", function () {
  it("Get request", function () {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
    }).then(function (response) {
      expect(response.status).to.eq(200);
    });
  });
});
