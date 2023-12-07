describe("The activities page", () => {
  it("should allow a logged in user visit the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/activities`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/activities`);
  });

  it("should not allow a logged out user visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/activities`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should show a list of activities", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/activities`);

    cy.get('[data-testid="activity-list"]').should("be.visible");
    // The test data contains seven activities.
    cy.get('[data-testid="activity-list"]').children().should("have.length", 7);
  });

  it("should allow a user to navigate to an activities page", () => {
    cy.login("bobb@test.com", "Bob12345");
    cy.visit(`${Cypress.config("baseUrl")}/activities`);

    cy.contains("Golden Memories Gala").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/activity/7`);
  });
});
