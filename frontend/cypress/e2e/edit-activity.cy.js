describe("The edit activity page", () => {
  it("should allow a logged in caretaker access the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/1/edit`);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/caretaker/activities/1/edit`
    );
  });

  it("should not allow a regular user visit the page", () => {
    cy.login("lottas@test.com", "Lotta12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/1/edit`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  });

  it("should not allow a logged out user visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/1/edit`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display a form to edit an activity", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/1/edit`);

    cy.get('[data-testid="edit-activity-name-input"]').should("be.visible");
    cy.get('[data-testid="edit-activity-description-input"]').should(
      "be.visible"
    );
    cy.get('[data-testid="activity-dates-input-container"]').should(
      "be.visible"
    );
    cy.get('[data-testid="delete-activity-button"]').should("be.visible");
    cy.get('[data-testid="update-activity-button"]').should("be.visible");
  });

  it("should allow a logged in caretaker update an activity", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/1/edit`);

    cy.get('[data-testid="edit-activity-name-input"]').type(
      "First updated event"
    );
    cy.get('[data-testid="edit-activity-description-input"]').type("Edit.");
    cy.get('[data-testid="update-activity-button"]').click();

    cy.contains("Activity updated").should("be.visible");
  });

  it("should allow a logged in caretaker delete an activity", () => {
    cy.login("bobb@test.com", "Bob12345");
    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/1/edit`);
    cy.get('[data-testid="delete-activity-button"]').click();

    cy.contains("Activity deleted").should("be.visible");
  });
});
