describe("The friends page", () => {
  it("should allow a logged in user to visit the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/friends`);

    cy.url().should("contain", `${Cypress.config("baseUrl")}/friends`);
    cy.get(".friends-page").should("be.visible");
  });

  it("should not allow a logged out user to visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/friends`);

    // A logged out user should be redirected to the frontpage
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display a bar to navigate between friends and friend requests", () => {
    cy.login("bobb@test.com", "Bob12345");
    cy.visit(`${Cypress.config("baseUrl")}/friends`);

    cy.get('[data-testid="friends-tab-link"]').should("be.visible");
    cy.get('[data-testid="friend-requests-tab-link"]').should("be.visible");
  });

  it("should display a list of a user's friends", () => {
    cy.login("bobb@test.com", "Bob12345");
    cy.visit(`${Cypress.config("baseUrl")}/friends`);

    cy.get('[data-testid="friend-list-item-username"]').should(
      "contain",
      "Larry Smith"
    );
  });

  it("should allow a user to navigate to friend requests", () => {
    cy.login("bobb@test.com", "Bob12345");
    cy.visit(`${Cypress.config("baseUrl")}/friends`);

    cy.get('[data-testid="friend-requests-tab-link"]').click();

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/friends/friend-requests`
    );
  });
});
