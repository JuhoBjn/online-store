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
    cy.signup("victor@test.com", "Victor12345");
  });

  it("should direct the user to the edit profile page after signing up", () => {
    cy.signup("matthew@test.com", "Matthew12345");

    cy.url().should("contain", "edit");
  });

  it("should allow a user to create their profile after signing up", () => {
    cy.signup("guy@test.com", "Guy12345");

    cy.url().should("contain", "edit");

    cy.get('[data-testid="firstname-input"]').type("Guy");
    cy.get('[data-testid="lastname-input"]').type("Fieri");
    cy.get('[data-testid="bio-input"]').type(
      "This is the profile of Guy Fieri."
    );
    cy.get('[data-testid="phone-input"]').type("1234567890");
    cy.get('[data-testid="city-input"]').type("Helsinki");
    cy.get('[data-testid="postalcode-input"]').type("00200");
    cy.get('[data-testid="country-input"]').select("fi");
  });

  it("should not allow a user to sign up with an invalid email", () => {
    cy.signup("victortest.com", "Victor21345", true);

    cy.url().should("not.equal", `${Cypress.config("baseUrl")}/`);
  });

  it("should not allow a user to sign up with too short of a password", () => {
    cy.signup("thomas@test.com", "Thomas1", true);

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Signup failed."
    );
  });

  it("should not allow user to sign up with password containing no capital letter", () => {
    cy.signup("jonathan@test.com", "jonathan12345", true);

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Signup failed."
    );
  });

  it("should not allow user to sign up with password containing no lower case letter", () => {
    cy.signup("petra@test.com", "PETRA21345", true);

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Signup failed."
    );
  });

  it("should not allow a user to sign up with password containing no numbers", () => {
    cy.signup("emma@test.com", "Emmalonger", true);

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Signup failed."
    );
  });

  it("should not allow two users to be created with the same email", () => {
    // Sign up first user. Should succeed.
    cy.signup("susan@test.com", "Susan13245");
    // Log out first user.
    cy.clearLocalStorage("currentUser");

    // Sign up second user. Should fail.
    cy.signup("susan@test.com", "Susan12345", true);

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "A user with this email already exists"
    );
  });

  it("should allow a user to log in with valid credentials", () => {
    cy.login("larrys@test.com", "Larry12345");
  });

  it("should not allow a user to log in with the wrong password", () => {
    cy.login("larrys@test.com", "Lary12345", true);

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Login failed."
    );
  });

  it("should display a link to reset password upon wrong password", () => {
    cy.login("larrys@test.com", "WrongP4ssword", true);

    cy.get('[data-testid="reset-password-link"]').should("be.visible");
    cy.get('[data-testid="reset-password-link"]').should(
      "contain",
      "Reset password"
    );
  });

  it("should allow the user to navigate to the reset password page", () => {
    cy.login("larrys@test.com", "WrongP4ssword", true);

    cy.get('[data-testid="reset-password-link"]').click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/reset-password`);
  });

  it("should not allow a user to log in without an account", () => {
    cy.login("does.not@exist.com", "Noexisto123", true);

    cy.get('[data-testid="error-container"]').should("be.visible");
    cy.get('[data-testid="error-container"]').should(
      "contain",
      "Login failed."
    );
  });

  it("should not allow a user to log in with invalid email", () => {
    cy.login("does.notexist.com", "Noexisto123", true);
  });

  it("should not allow a user to log in without entering email", () => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.get("#auth-page_login-form-title").should("contain", "Log in");
    cy.get('[data-testid="password-input"]').type("Noexisto123");
    cy.get('[data-testid="submit-button"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);
  });

  it("should display a link to reset password when the user enters the wrong password", () => {
    cy.login("larrys@test.com", "WrongPassword123", true);

    cy.get('[data-testid="reset-password-link').should("be.visible");
  });

  it("should let the user navigate to the reset password page", () => {
    cy.login("larrys@test.com", "WrongPassword123", true);

    cy.get('[data-testid="reset-password-link').click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/reset-password`);
  });
});
