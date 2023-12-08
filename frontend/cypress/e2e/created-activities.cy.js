describe("The caretaker page created activities page", () => {
  it("should allow a logged in caretaker visit the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities`);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/caretaker/activities`
    );
  });

  it("should not allow a regular user visit the page", () => {
    cy.login("lottas@test.com", "Lotta12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities`);

    cy.url().should(
      "not.contain",
      `${Cypress.config("baseUrl")}/caretaker/activities`
    );
  });

  it("should not allow a logged out user visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display a heading for the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities`);

    cy.get('[data-testid="created-activities-title"]').should("be.visible");
  });

  it("should display a list of posted articles", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities`);

    cy.get('[data-testid="compact-activity-list"] > :nth-child(1)').should(
      "be.visible"
    );
    cy.get(":nth-child(1) > #compact-activity-link").should("be.visible");
    cy.get(
      ':nth-child(1) > .button-container > [data-testid="edit-activity-button"]'
    ).should("be.visible");
  });
});
