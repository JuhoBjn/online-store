describe("The create article page", () => {
  it("should allow a logged in caretaker visit the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/new-article`);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/caretaker/news/new-article`
    );
  });

  it("should allow a logged in admin visit the page", () => {
    cy.login("anthonya@test.com", "Anthony12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/new-article`);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/caretaker/news/new-article`
    );
  });

  it("should not allow a logged out user visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/new-article`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should not allow a regular user visit the page", () => {
    cy.login("lottas@test.com", "Lotta12345");
    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/new-article`);

    cy.url().should("not.contain", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display a form to create a new article", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/new-article`);

    cy.get(".new-article-form-picture-input-container").should("be.visible");
    cy.get('[data-testid="article-headline-input"]').should("be.visible");
    cy.get('[data-testid="article-body-input"]').should("be.visible");
    cy.get('[data-testid="article-link-input"]').should("be.visible");
    cy.get('[data-testid="post-article-button"]').should("be.visible");
  });

  it("should allow a user to post an article with a picture", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/new-article`);

    cy.get('[data-testid="article-picture-input"]').selectFile(
      "./cypress/fixtures/red-panda.jpg"
    );
    cy.get('[data-testid="article-headline-input"]').type("Red panda spotted");
    cy.get('[data-testid="article-body-input"]').type(
      "Korkeasaari zoo's most recent resident, a red panda, has been show to the public for the first time."
    );
    cy.get('[data-testid="article-link-input"]').type("https://example.com");
    cy.get('[data-testid="post-article-button"]').click();

    cy.contains("Article posted").should("be.visible");
  });
});
