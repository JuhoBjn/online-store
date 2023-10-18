describe("The authentication page", () => {
  it("should display the Goldenage logo", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.get('[data-testid="logo"]').should("be.visible");
  });

  it("should display a login form", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.get("#auth-page_login-form-title").should("be.visible");
    cy.get('[data-testid="email-input"]').should("be.visible");
    cy.get('[data-testid="password-input"]').should("be.visible");
    cy.get('[data-testid="submit-button"]').should("be.visible");
  });

  it("should allow a user to change into signup mode", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.contains("Sign up instead").click();

    cy.get("#auth-page_login-form-title").should("be.visible");
    cy.get('[data-testid="email-input"]').should("be.visible");
    cy.get('[data-testid="password-instructions"]').should("be.visible");
    cy.get('[data-testid="password-input"]').should("be.visible");
    cy.get('[data-testid="submit-button"]').should("be.visible");
  });

  it("should allow a user to sign up with valid credentials", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.contains("Sign up instead").click();

    cy.get('[data-testid="email-input"]').type("victor@test.com");
    cy.get('[data-testid="password-input"]').type("Victor12345");
    cy.get('[data-testid="submit-button"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  });

  it("should not allow a user to sign up with an invalid email", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.contains("Sign up instead").click();

    cy.get('[data-testid="email-input"]').type("victortest.com");
    cy.get('[data-testid="password-input"]').type("Victor12345");
    cy.get('[data-testid="submit-button"]').click();

    cy.url().should("not.equal", `${Cypress.config("baseUrl")}/`);
  });

  it("should not allow a user to sign up with too short of a password", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.contains("Sign up instead").click();

    cy.get('[data-testid="email-input"]').type("thomas@test.com");
    cy.get('[data-testid="password-input"]').type("Thomas1");
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Signup failed."
    );
  });

  it("should not allow user to sign up with password containing no capital letter", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.contains("Sign up instead").click();

    cy.get('[data-testid="email-input"]').type("jonathan@test.com");
    cy.get('[data-testid="password-input"]').type("jonathan12345");
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Signup failed."
    );
  });

  it("should not allow user to sign up with password containing no lower case letter", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.contains("Sign up instead").click();

    cy.get('[data-testid="email-input"]').type("petra@test.com");
    cy.get('[data-testid="password-input"]').type("PETRA12345");
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Signup failed."
    );
  });

  it("should not allow a user to sign up with password containing no numbers", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.contains("Sign up instead").click();

    cy.get('[data-testid="email-input"]').type("emma@test.com");
    cy.get('[data-testid="password-input"]').type("Emmalonger");
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Signup failed."
    );
  });

  it("should not allow two users to be created with the same password", () => {
    // Sign up first user. Should succeed.
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);
    cy.contains("Sign up instead").click();
    cy.get('[data-testid="email-input"]').type("susan@test.com");
    cy.get('[data-testid="password-input"]').type("Susan12345");
    cy.get('[data-testid="submit-button"]').click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
    // Log out first user.
    cy.clearLocalStorage("currentUser");

    // Sign up second user. Should fail.
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);
    cy.contains("Sign up instead").click();
    cy.get('[data-testid="email-input"]').type("susan@test.com");
    cy.get('[data-testid="password-input"]').type("Susan1234567");
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "A user with this email already exists"
    );
  });

  it("should allow a user to log in with valid credentials", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.get("#auth-page_login-form-title").should("contain", "Log in");
    cy.get('[data-testid="email-input"]').type("larrys@test.com");
    cy.get('[data-testid="password-input"]').type("Larry12345");
    cy.get('[data-testid="submit-button"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  });

  it("should not allow a user to log in with the wrong password", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.get("#auth-page_login-form-title").should("contain", "Log in");
    cy.get('[data-testid="email-input"]').type("larrys@test.com");
    cy.get('[data-testid="password-input"]').type("Lary12345");
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Login failed."
    );
  });

  it("should not allow a user to log in without an account", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.get("#auth-page_login-form-title").should("contain", "Log in");
    cy.get('[data-testid="email-input"]').type("does.not@exist.com");
    cy.get('[data-testid="password-input"]').type("Noexisto123");
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Login failed."
    );
  });

  it("should not allow a user to log in with invalid email", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.get("#auth-page_login-form-title").should("contain", "Log in");
    cy.get('[data-testid="email-input"]').type("does.notexist.com");
    cy.get('[data-testid="password-input"]').type("Noexisto123");
    cy.get('[data-testid="submit-button"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);
  });

  it("should not allow a user to log in without entering email", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.get("#auth-page_login-form-title").should("contain", "Log in");
    cy.get('[data-testid="password-input"]').type("Noexisto123");
    cy.get('[data-testid="submit-button"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);
  });
});
