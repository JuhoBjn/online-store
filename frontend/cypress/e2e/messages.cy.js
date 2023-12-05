describe("The messages page", () => {
  it("should allow a logged in user to visit the page", () => {
    cy.login("thomast@test.com", "Thomas12345");

    cy.get('[data-testid="messages-page-link"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/messages`);
  });

  it("should not allow a logged out user to visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/messages`);

    // Logged out user should be redirected to the frontpage.
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display a list of messages", () => {
    cy.login("lottas@test.com", "Lotta12345");

    cy.get('[data-testid="messages-page-link"]').click();

    cy.get('[data-testid="friend-list-item-username"]')
      .contains("Larry Smith")
      .click();

    cy.contains("weather over there").should("be.visible");
  });

  it("should allow a user to send a message", () => {
    cy.login("lottas@test.com", "Lotta12345");

    cy.get('[data-testid="messages-page-link"]').click();

    cy.get('[data-testid="friend-list-item-username"]')
      .contains("Larry Smith")
      .click();

    cy.get('[data-testid="message-box"]').type("Hello there!");

    cy.get('[data-testid="send-button"]').click();

    cy.contains("Hello there!").should("exist");
  });

  it("other user should be able to see the message", () => {
    cy.login("larrys@test.com", "Larry12345");

    cy.get('[data-testid="messages-page-link"]').click();

    cy.get('[data-testid="friend-list-item-username"]')
      .contains("Lotta Schmiedmann")
      .click();

    cy.contains("Hello there!").should("exist");
  });
});
