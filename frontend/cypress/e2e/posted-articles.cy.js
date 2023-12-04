describe("The caretaker page posted articles page", () => {
  it("should allow a logged in caretaker visit the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/posted-articles`);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/caretaker/news/posted-articles`
    );
  });

  it("should not allow a regular user visit the page", () => {
    cy.login("lottas@test.com", "Lotta12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/posted-articles`);

    cy.url().should(
      "not.contain",
      `${Cypress.config("baseUrl")}/caretaker/news/posted-articles`
    );
  });

  it("should not allow a logged out user visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/posted-articles`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display a heading for the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/posted-articles`);

    cy.get('[data-testid="posted-articles-page-header-title"]').should(
      "be.visible"
    );
  });

  it("should display a list of posted articles", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/posted-articles`);

    cy.get('[data-testid="compact-article-list"] > :nth-child(1)').should(
      "be.visible"
    );
    cy.get(":nth-child(1) > #compact-article-link").should("be.visible");
    cy.get(
      ':nth-child(1) > .button-container > [data-testid="edit-article-button"]'
    ).should("be.visible");
  });

  it("shoul allow a logged in caretaker navigate to the edit article page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/posted-articles`);

    cy.get(
      ':nth-child(1) > .button-container > [data-testid="edit-article-button"]'
    ).click();

    cy.url().should("contain", "edit");
  });
});
