describe("The about us page", () => {
  it("should allow a user to navigate to the about us page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/about-us`);
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/about-us`);
  });

  it("should display a navigation bar at the top of the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/about-us`);

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
    cy.visit(`${Cypress.config("baseUrl")}/about-us`);

    cy.get('[data-testid="about-us-paragraph1"]').should("be.visible");
    cy.get('[data-testid="about-us-paragraph2"]').should("be.visible");
  });

  it("should display an image along the text content", () => {
    cy.visit(`${Cypress.config("baseUrl")}/about-us`);

    cy.get('[data-testid="about-us-image"]').should("be.visible");
    cy.get('[data-testid="about-us-image"]')
      .invoke("attr", "src")
      .should("exist");
    cy.get('[data-testid="about-us-image"]')
      .invoke("attr", "alt")
      .should("exist");
  });

  it("should have an alt text for the image", () => {
    cy.visit(`${Cypress.config("baseUrl")}/about-us`);

    cy.get('[data-testid="about-us-image"]')
      .invoke("attr", "alt")
      .should("exist");
  });

  it("shoul allow the user to navigate to the login/signup page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/about-us`);

    cy.contains("Log in / Sign up").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);
  });
});
