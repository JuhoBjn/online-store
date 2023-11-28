describe("The front page", () => {
  it("should allow a user to navigate to the front page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/frontpage`);
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display a navigation bar at the top of the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/frontpage`);

    cy.get(".navigation-bar-container").should("be.visible");
    cy.get('[data-testid="goldenage-logo"]').should("be.visible");
    cy.get('[data-testid="navigate-home-link"]').should("be.visible");
    cy.get('[data-testid="navigate-about-us-link"]').should("be.visible");
    cy.get('[data-testid="navigate-contact-us-link"]').should("be.visible");
    cy.get(
      ".logged-out-navigation-button-container > .button-container > .button"
    ).should("be.visible");
  });

  it("should display information about the service", () => {
    cy.visit(`${Cypress.config("baseUrl")}/frontpage`);

    cy.get('[data-testid="frontpage-title"]').should("be.visible");
    cy.get('[data-testid="frontpage-content"]').should("be.visible");
    cy.get("#join-button").should("be.visible");
  });

  it("should allow a user to navigate to signup/login through the join button", () => {
    cy.visit(`${Cypress.config("baseUrl")}/frontpage`);

    cy.get("#join-button").should("be.visible");
    cy.get("#join-button").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth#signup`);
  });

  it("should allow a user to navigate to signup/login through the sign up / log in button", () => {
    cy.visit(`${Cypress.config("baseUrl")}/frontpage`);

    cy.get(
      ".logged-out-navigation-button-container > .button-container > .button"
    ).click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);
  });
});
