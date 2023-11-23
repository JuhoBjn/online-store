describe("The logged in nav bar", () => {
  it("should display a navigation bar with logo, links and profile image", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.get('[data-testid="goldenage-logo"]').should("be.visible");
    cy.get('[data-testid="news-page-link"]').should("be.visible");
    cy.get('[data-testid="activities-page-link"]').should("be.visible");
    cy.get('[data-testid="match-page-link"]').should("be.visible");
    cy.get('[data-testid="messages-page-link"]').should("be.visible");
    cy.get('[data-testid="help-page-link"]').should("be.visible");
    cy.get('[data-testid="profile-picture"]').should("be.visible");
  });

  it("should allow a user to navigate to the activities page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.get('[data-testid="activities-page-link"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/activities`);
  });

  it("should allow a user to navigate to the match page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.get('[data-testid="match-page-link"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/match`);
  });

  it("should allow a user to navigate to the messages page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.get('[data-testid="messages-page-link"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/messages`);
  });

  it("should allow a user to navigate to the help page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.get('[data-testid="help-page-link"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/help`);
  });

  it("should display dropdown menu when profile picture is clicked", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.get('[data-testid="profile-picture"]').click();

    cy.get(".dropdown-menu-container").should("be.visible");
    cy.get('[data-testid="go-to-profile"]').should("be.visible");
    cy.get('[data-testid="log-out"]').should("be.visible");
  });
});
