describe("The help page", () => {
  it("should allow a logged in user to visit the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/help`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/help`);
  });

  it("should not allow a logged out user visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/help`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });
});
