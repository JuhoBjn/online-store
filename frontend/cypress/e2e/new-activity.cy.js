describe("The new activity page", () => {
  it("should allow a caretaker visit the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/new-activity`);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/caretaker/activities/new-activity`
    );
  });

  it("should not allow a normal user visit the page", () => {
    cy.login("lottas@test.com", "Lotta12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/new-activity`);

    cy.url().should("not.contain", "/caretaker/activities/new-activity");
  });

  it("should not allow a logged out user visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/new-activity`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display an image input", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/new-activity`);

    cy.get('[data-testid="new-activity-form-picture-input-container"]').should(
      "be.visible"
    );
  });

  it("should display an input for the event name", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/new-activity`);

    cy.get('[data-testid="activity-name-input"]').should("be.visible");
  });

  it("should display an input for the activity description", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/new-activity`);

    cy.get('[data-testid="activity-description-input"]').should("be.visible");
  });

  it("should display an input to input the activity date", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/new-activity`);

    cy.get('[data-testid="activity-date-picker"]').should("be.visible");
  });

  it("should allow a caretaker to create an activity without a picture", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/new-activity`);

    cy.get('[data-testid="activity-name-input"]').type("Test activity");
    cy.get('[data-testid="activity-description-input"]').type(
      "Test activity description"
    );
    cy.get('[data-testid="create-activity-button"]').click();

    cy.get('[data-testid="activity-created"]').should("be.visible");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/caretaker`);
  });

  it("should allow a caretaker to create an activity with a picture", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/activities/new-activity`);

    cy.get('[data-testid="activity-picture-input"]').selectFile(
      "./cypress/fixtures/red-panda.jpg"
    );
    cy.get('[data-testid="activity-name-input"]').type("Test activity");
    cy.get('[data-testid="activity-description-input"]').type(
      "Test activity with a picture description"
    );
    cy.get('[data-testid="create-activity-button"]').click();

    cy.get('[data-testid="activity-created"]').should("be.visible");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/caretaker`);
  });
});
