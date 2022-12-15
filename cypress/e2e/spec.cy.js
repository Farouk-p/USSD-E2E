describe("Interview spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io/");
    cy.get(":nth-child(3) > ul > :nth-child(1) > a").click();
    cy.get("#type > a").should;
  });
});
