describe("The caretaker page", () => {
  it("should allow a logged in caretaker to access the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/caretaker`);
  });
  
  it("should allow a logged in admin visit the page", () => {
    cy.login("anthonya@test.com", "Anthony12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/caretaker`);
  });

  it("should not allow a logged out user visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/caretaker`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should not allow a regular use visit the page", () => {
    cy.login("lottas@test.com", "Lotta12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker`);

    cy.url().should("not.contain", `${Cypress.config("baseUrl")}/caretaker`);
  });

  it("should display a sidebar", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker`);

    cy.get('[data-testid="caretaker-sidebar-container"]').should("be.visible");
  });

  it("should display a button to create a new article", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker`);

    cy.get('[data-testid="new-article-button"]').should("be.visible");
  });

  it("should display a button to create a new article", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker`);

    cy.get('[data-testid="posted-articles-button"]').should("be.visible");
  });

  it("should allow a logged in caretaker to open the new article form", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker`);

    cy.get('[data-testid="new-article-button"]').click();

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/caretaker/news/new-article`
    );
  });

  it("should allow a logged in user to open the posted articles page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker`);

    cy.get('[data-testid="posted-articles-button"]').click();

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/caretaker/news/posted-articles`
    );
  });
});
