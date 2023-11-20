describe("The edit profile page", () => {
  const anthony = {
    id: "e16a6eac-9993-4137-9221-7c879337bbe4",
    email: "anthonya@test.com",
    password: "Anthony12345"
  };

  it("should allow a logged in user to visit the page", () => {
    cy.login(anthony.email, anthony.password);
    cy.visit(`${Cypress.config("baseUrl")}/user/${anthony.id}/edit`);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/user/${anthony.id}/edit`
    );
  });

  it("should allow a user to access the edit profile page from a button on their profile", () => {
    cy.login(anthony.email, anthony.password);
    cy.visit(`${Cypress.config("baseUrl")}/user/${anthony.id}`);

    cy.contains("Edit profile").click();

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/user/${anthony.id}/edit`
    );
  });

  it("should not allow a user to edit another user's profile", () => {
    cy.login(anthony.email, anthony.password);
    // Try to access Lotta Schmiedmann's edit profile page.
    cy.visit(
      `${Cypress.config(
        "baseUrl"
      )}/user/858560f9-fc03-43b0-b931-01213e4787ce/edit`
    );

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/user/858560f9-fc03-43b0-b931-01213e4787ce`
    );
  });

  it("should display a form to edit a user's profile", () => {
    cy.login(anthony.email, anthony.password);
    cy.visit(`${Cypress.config("baseUrl")}/user/${anthony.id}/edit`);

    cy.get('[data-testid="firstname-input"]').should("be.visible");
    cy.get('[data-testid="lastname-input"]').should("be.visible");
    cy.get('[data-testid="bio-input"]').should("be.visible");
    cy.get('[data-testid="email-input"]').should("be.visible");
    cy.get('[data-testid="phone-input"]').should("be.visible");
    cy.get('[data-testid="city-input"]').should("be.visible");
    cy.get('[data-testid="postalcode-input"]').should("be.visible");
    cy.get('[data-testid="country-input"]').should("be.visible");
    cy.contains("Update profile").should("be.visible");
  });

  it("should allow a user to update their first name", () => {
    cy.login(anthony.email, anthony.password);
    cy.visit(`${Cypress.config("baseUrl")}/user/${anthony.id}/edit`);

    cy.get('[data-testid="firstname-input"]').clear();
    cy.get('[data-testid="firstname-input"]').type("Andy");
    cy.contains("Update profile").click();

    cy.get('[data-testid="user-name"]').should("contain", "Andy");
  });

  it("should allow a user to update their last name", () => {
    cy.login(anthony.email, anthony.password);
    cy.visit(`${Cypress.config("baseUrl")}/user/${anthony.id}/edit`);

    cy.get('[data-testid="lastname-input"]').clear();
    cy.get('[data-testid="lastname-input"]').type("Moderator");
    cy.contains("Update profile").click();

    cy.get('[data-testid="user-name"]').should("contain", "Moderator");
  });

  it("should allow a user to update their bio", () => {
    cy.login(anthony.email, anthony.password);
    cy.visit(`${Cypress.config("baseUrl")}/user/${anthony.id}/edit`);

    cy.get('[data-testid="bio-input"]').clear();
    cy.get('[data-testid="bio-input"]').type("This the updated bio of Andy.");
    cy.contains("Update profile").click();

    cy.get('[data-testid="user-bio"]').should(
      "contain",
      "This the updated bio of Andy."
    );
  });

  it("should allow a user to update their phone number", () => {
    cy.login(anthony.email, anthony.password);
    cy.visit(`${Cypress.config("baseUrl")}/user/${anthony.id}/edit`);

    cy.get('[data-testid="phone-input"]').clear();
    cy.get('[data-testid="phone-input"]').type("9876543210");
    cy.contains("Update profile").click();

    cy.get('[data-testid="user-phone"]').should("contain", "9876543210");
  });

  it("should allow a user to update their city", () => {
    cy.login(anthony.email, anthony.password);
    cy.visit(`${Cypress.config("baseUrl")}/user/${anthony.id}/edit`);

    cy.get('[data-testid="city-input"]').clear();
    cy.get('[data-testid="city-input"]').type("Tampere");
    cy.contains("Update profile").click();

    cy.get('[data-testid="user-address"]').should("contain", "Tampere");
  });

  it("should allow a user to update their postal code", () => {
    cy.login(anthony.email, anthony.password);
    cy.visit(`${Cypress.config("baseUrl")}/user/${anthony.id}/edit`);

    cy.get('[data-testid="postalcode-input"]').clear();
    cy.get('[data-testid="postalcode-input"]').type("33300");
    cy.contains("Update profile").click();

    cy.get('[data-testid="user-address"]').should("contain", "33300");
  });

  it("should allow a user to update their country", () => {
    cy.login(anthony.email, anthony.password);
    cy.visit(`${Cypress.config("baseUrl")}/user/${anthony.id}/edit`);

    cy.get('[data-testid="country-input"]').select("se");
    cy.contains("Update profile").click();

    cy.get('[data-testid="user-address"]').should("contain", "se");
  });

  it("should allow a user to update their email", () => {
    cy.login(anthony.email, anthony.password);
    cy.visit(`${Cypress.config("baseUrl")}/user/${anthony.id}/edit`);

    cy.get('[data-testid="email-input"]').clear();
    cy.get('[data-testid="email-input"]').type("andym@test.com");
    cy.contains("Update profile").click();

    cy.get('[data-testid="user-email"]').should("contain", "andym@test.com");
  });
});
