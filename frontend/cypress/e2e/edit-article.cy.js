describe("The edit article page", () => {
  it("should allow a logged in caretaker visit the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/1/edit`);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/caretaker/news/1/edit`
    );
  });

  it("should not allow a regular user visit the page", () => {
    cy.login("lottas@test.com", "Lotta12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/1/edit`);

    cy.url().should(
      "not.contain",
      `${Cypress.config("baseUrl")}/caretaker/news/1/edit`
    );
  });

  it("should not allow a logged out user visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/1/edit`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display a title on the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/1/edit`);

    cy.get('[data-testid="edit-article-page-header"]').should("be.visible");
  });

  it("should display a form to edit an article", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/1/edit`);

    cy.get('[data-testid="edit-article-headline-input"]').should("be.visible");
    cy.get('[data-testid="edit-article-body-input"]').should("be.visible");
    cy.get('[data-testid="edit-article-link-input"]').should("be.visible");
  });

  it("should display buttons to delete or update article", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/1/edit`);

    cy.get('[data-testid="delete-article-button"]').should("be.visible");
    cy.get('[data-testid="update-article-button"]').should("be.visible");
  });

  it("should allow a logged in caretaker update an article", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/1/edit`);

    cy.get('[data-testid="edit-article-headline-input"]').type("New title");
    cy.get('[data-testid="edit-article-body-input"]').type(
      "This is the updated body of the article."
    );
    cy.get('[data-testid="edit-article-link-input"]').type(
      "https://www.cypress.io/"
    );
    cy.get('[data-testid="update-article-button"]').click();

    cy.contains("Article updated").should("be.visible");
  });

  it("should allow a logged in caretaker delete an article", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/caretaker/news/1/edit`);
    cy.get('[data-testid="delete-article-button"]').click();

    cy.contains("Article has been deleted.").should("be.visible");
  });
});
