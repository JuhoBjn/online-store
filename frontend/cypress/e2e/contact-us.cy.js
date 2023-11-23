describe("The contact us page", () => {
  it("should allow a user to navigate to the contact us page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/contact-us`);
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/contact-us`);
  });

  it("should display a navigation bar at the top of the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/contact-us`);

    cy.get(".navigation-bar-container").should("be.visible");
    cy.get('[data-testid="goldenage-logo"]').should("be.visible");
    cy.get('[data-testid="navigate-home-link"]').should("be.visible");
    cy.get('[data-testid="navigate-about-us-link"]').should("be.visible");
    cy.get('[data-testid="navigate-contact-us-link"]').should("be.visible");
    cy.get(
      ".logged-out-navigation-button-container > .button-container > .button"
    ).should("be.visible");
  });

  it("should display a form to contact customer service", () => {
    cy.visit(`${Cypress.config("baseUrl")}/contact-us`);

    cy.get('[data-testid="contact-form-title"]').should("be.visible");
    cy.get('[data-testid="contact-form-title"]').should(
      "contain",
      "Contact Form"
    );
    cy.get('[data-testid="email-input"]').should("be.visible");
    cy.get('[data-testid="message-input"]').should("be.visible");
    cy.contains("Send message").should("be.visible");
  });

  it("should allow a user to send a message with a valid email", () => {
    cy.visit(`${Cypress.config("baseUrl")}/contact-us`);

    cy.get('[data-testid="email-input"]').type("thomas@test.com");
    cy.get('[data-testid="message-input"]').type("How much is the fish?");

    cy.get('[data-testid="email-input"]').should(
      "have.value",
      "thomas@test.com"
    );
    cy.get('[data-testid="message-input"]').should(
      "have.value",
      "How much is the fish?"
    );

    cy.contains("Send message").click();
    cy.get("#message-sent").should("be.visible");
    cy.get("#message-sent").should("contain", "Message sent");
  });

  it("should allow a user to navigate to the login/signup page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/contact-us`);

    cy.contains("Log in / Sign up").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);
  });
});
