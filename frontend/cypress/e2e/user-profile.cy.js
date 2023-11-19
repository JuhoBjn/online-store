describe("The user profile page", () => {
  const larrysId = "239aec9f-066e-4e6a-88d7-9cdccd43445b";
  const lottasId = "858560f9-fc03-43b0-b931-01213e4787ce";

  it("should allow a logged in user to visit their own profile page", () => {
    cy.login("larrys@test.com", "Larry12345");
    cy.visit(`${Cypress.config("baseUrl")}/user/${larrysId}`);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/user/${larrysId}`
    );
  });

  it("should display full profile info when visiting own profile page", () => {
    cy.login("larrys@test.com", "Larry12345");
    cy.visit(`${Cypress.config("baseUrl")}/user/${larrysId}`);

    cy.get('[data-testid="profile-picture"]').should("be.visible");
    cy.get('[data-testid="profile-picture"]')
      .invoke("attr", "src")
      .should("exist");
    cy.get('[data-testid="profile-picture"]')
      .invoke("attr", "alt")
      .should("exist");
    cy.get('[data-testid="user-name"]').should("contain", "Larry Smith");
    cy.contains("Edit profile").should("be.visible");
    cy.get('[data-testid="user-city"]').should("be.visible");
    cy.get('[data-testid="user-bio"]').should("be.visible");
    cy.get('[data-testid="private-details-container"]').should("be.visible");
    cy.get('[data-testid="private-details-heading"]').should("be.visible");
    cy.get('[data-testid="user-address"]').should("be.visible");
    cy.get('[data-testid="user-email"]').should("be.visible");
    cy.get('[data-testid="user-phone"]').should("be.visible");
  });

  it("should display a button to upgrade to a premium account when viewing own profile with a non-premium account", () => {
    cy.login("larrys@test.com", "Larry12345");
    cy.visit(`${Cypress.config("baseUrl")}/user/${larrysId}`);

    cy.contains("Upgrade to premium").should("be.visible");
  });

  it("should allow a user to visit another user's profile page", () => {
    cy.login("larrys@test.com", "Larry12345");
    cy.visit(`${Cypress.config("baseUrl")}/user/${lottasId}`);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/user/${lottasId}`
    );
  });

  it("should display a brief profile when viewing another user's profile", () => {
    cy.login("larrys@test.com", "Larry12345");
    cy.visit(`${Cypress.config("baseUrl")}/user/${lottasId}`);

    cy.get('[data-testid="profile-picture"]').should("be.visible");
    cy.get('[data-testid="profile-picture"]')
      .invoke("attr", "src")
      .should("exist");
    cy.get('[data-testid="profile-picture"]')
      .invoke("attr", "alt")
      .should("exist");
    cy.get('[data-testid="user-name"]').should("contain", "Lotta Schmiedmann");
    cy.get('[data-testid="user-city"]').should("be.visible");
    cy.get('[data-testid="user-bio"]').should("be.visible");
    cy.get('[data-testid="private-details-container"]').should("not.exist");
  });

  it("should display a button to send a friend request on an non-friended user's profile", () => {
    cy.login("larrys@test.com", "Larry12345");
    cy.visit(`${Cypress.config("baseUrl")}/user/${lottasId}`);

    cy.contains("Send friend request").should("be.visible");
  });

  it("should allow a user to a friend request to another user", () => {
    cy.login("larrys@test.com", "Larry12345");
    cy.visit(`${Cypress.config("baseUrl")}/user/${lottasId}`);

    cy.contains("Send friend request").click();
    cy.get('[data-testid="friend-request-sent"]').should("be.visible");
  });
});
