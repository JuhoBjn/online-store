describe("The activity page", () => {
  it("should allow a logged in user visit the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/activity/1`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/activity/1`);
  });

  it("should not allow a logged out user visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/activity/1`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display the name of the activity", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/activity/1`);

    cy.get('[data-testid="activity-name"]').should("be.visible");
  });

  it("should display a description of the activity", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/activity/1`);

    cy.get('[data-testid="activity-description"]').should("be.visible");
  });

  it("should display a button to sign up for an activity", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/activity/4`);

    cy.get('[data-testid="activity-signup-button"]').should("be.visible");
  });

  it("should allow a user to sign up for an event", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/activity/4`);

    cy.get('[data-testid="activity-signup-button"]').click();

    cy.get('[data-testid="activity-signed-up"]').should("be.visible");
  });
});