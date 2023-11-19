describe("The reset password page", () => {
  it("should display a form to request password reset email", () => {
    cy.visit(`${Cypress.config("baseUrl")}/reset-password`);

    cy.get("#request-password-reset-title").should(
      "contain",
      "Request password reset"
    );

    cy.get('[data-testid="email-input"').should("be.visible");
    cy.contains("Send password reset email").should("be.visible");
  });

  it("should allow a user to request a password reset email", () => {
    cy.visit(`${Cypress.config("baseUrl")}/reset-password`);

    cy.get('[data-testid="email-input"]').type("larrys@test.com");
    cy.contains("Send password reset email").click();

    cy.get('[data-testid="password-reset-email-sent-message"]', {
      timeout: 10000
    }).should("be.visible");
  });

  it("should not send a password reset email if no user exists for given email", () => {
    cy.visit(`${Cypress.config("baseUrl")}/reset-password`);

    cy.get('[data-testid="email-input"]').type("no.existo@nowhere.com");
    cy.contains("Send password reset email").click();

    cy.get('[data-testid="reset-password-error-message"]').should("be.visible");
    cy.get('[data-testid="email-input"]').should("be.visible");
  });

  it("should not send email if no email is provided", () => {
    cy.visit(`${Cypress.config("baseUrl")}/reset-password`);

    cy.contains("Send password reset email").click();
    cy.get('[data-testid="email-input"]').should("be.visible");
  });

  it("should not send an email if an invalid address is entered", () => {
    cy.visit(`${Cypress.config("baseUrl")}/reset-password`);

    cy.get('[data-testid="email-input"]').type("invalid.email.com");
    cy.contains("Send password reset email").click();

    cy.get('[data-testid="email-input"]').should("be.visible");
  });

  let resetLink = "";
  it("should recieve email with reset link", () => {
    cy.request("http://127.0.0.1:1080/email").as("emails");

    cy.get("@emails")
      .its("body")
      .then((emails) => {
        const lastEmail = emails[emails.length - 1];
        resetLink = lastEmail.text.match(
          /http:\/\/localhost:5173\/reset-password#ey[a-zA-Z0-9._-]+/
        )[0];
        expect(resetLink).to.not.be.empty;
      });
  });

  it("should display a form to set a new password when url contains a valid token", () => {
    cy.visit(resetLink);

    cy.get("#set-new-password-title").should("be.visible");
    cy.get('[data-testid="password-input"]').should("be.visible");
    cy.get('[data-testid="password-instructions"]').should("be.visible");
    cy.contains("Set new password").should("be.visible");
  });

  it("should display an error message when the url contains an expired token", () => {
    const expiredToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzI5ZDc2LWM3MmYtNDE3Yi04NjM3LTQwNmNlMzI5MWU0MiIsImV4cCI6MTY5OTc0Mjg3NCwiaWF0IjoxNjk5NzQ0NzM0fQ.pNVbw5RfAtaja5vTjG1B7Y1ehD1X0yScmNo9Z4EiXuw";
    cy.visit(`${Cypress.config("baseUrl")}/reset-password#${expiredToken}`);

    cy.get('[data-testid="token-expiry-message"]').should("be.visible");
    cy.contains("Request new token to reset password").should("be.visible");
  });

  it("should allow a user to set a new password with valid token", () => {
    cy.visit(resetLink);

    cy.get('[data-testid="password-input"]').type("Larry123456");
    cy.contains("Set new password").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);
  });

  it("should not let a user set an invalid password", () => {
    cy.visit(resetLink);

    // Invalid password: no capital letter.
    cy.get('[data-testid="password-input"]').type("larry123456");
    cy.contains("Set new password").click();

    cy.get('[data-testid="set-new-password-error-message"]').should(
      "be.visible"
    );
    cy.url().should("contain", `${Cypress.config("baseUrl")}/reset-password`);
  });

  it("should allow a user to log in with new password", () => {
    cy.visit(resetLink);

    cy.get('[data-testid="password-input"]').type("Larry123456");
    cy.contains("Set new password").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.login("larrys@test.com", "Larry123456");
  });
});
