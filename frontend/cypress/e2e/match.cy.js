describe("The match page", () => {
  const thomasId = "ddfffcd7-983c-4f83-b998-884c36bea194";

  it("should allow a logged in user to visit the page", () => {
    cy.login("thomast@test.com", "Thomas12345");

    cy.get('[data-testid="match-page-link"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/match`);
  });

  it("should not allow a logged out user to visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/match`);

    // Logged out user should be redirected to the frontpage.
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display buttons to accept or pass the user", () => {
    cy.login("thomast@test.com", "Thomas12345");

    cy.visit(`${Cypress.config("baseUrl")}/match`);
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/match`);

    cy.get('[data-testid="pass-button-container"]').should("be.visible");
    cy.get('[data-testid="pass-button-icon"]').should("be.visible");

    cy.get('[data-testid="accept-button-container"]').should("be.visible");
    cy.get('[data-testid="accept-button-icon"]').should("be.visible");
  });

  it("should display user profile card", () => {
    cy.login("thomast@test.com", "Thomas12345");

    cy.visit(`${Cypress.config("baseUrl")}/match`);
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/match`);

    cy.get(".profile-card").should("be.visible");
    cy.get('[data-testid="profile-card-image"]').should("be.visible");
    cy.get(".profile-card-content-header").should("be.visible");
    cy.get('[data-testid="profile-card-user-name"]').should("be.visible");
    cy.get('[data-testid="profile-card-user-city"]').should("be.visible");
    cy.get('[data-testid="profile-card-user-bio"]').should("be.visible");
  });

  it("should display the next user when the user clicks pass", () => {
    cy.login("thomast@test.com", "Thomas12345");

    cy.visit(`${Cypress.config("baseUrl")}/match`);
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/match`);

    let firstUsername = "Initial value";
    cy.get('[data-testid="profile-card-user-name"]')
      .invoke("text")
      .then((value) => {
        firstUsername = value;
      });
    cy.get('[data-testid="pass-button-container"]').click();
    cy.get('[data-testid="profile-card-user-name')
      .invoke("text")
      .should((text) => {
        text !== firstUsername;
      });
  });

  it("should display the next user when user clicks on accept", () => {
    cy.login("thomast@test.com", "Thomas12345");

    cy.visit(`${Cypress.config("baseUrl")}/match`);
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/match`);

    let firstUsername = "Initial value";
    cy.get('[data-testid="profile-card-user-name"]')
      .invoke("text")
      .then((value) => {
        firstUsername = value;
      });
    cy.get('[data-testid="accept-button-container"]').click();
    cy.get('[data-testid="profile-card-user-name')
      .invoke("text")
      .should((text) => {
        text !== firstUsername;
      });
  });

  it("should send a friend request when user clicks the accept button", () => {
    cy.intercept({
      method: "POST",
      url: `http://localhost:5000/api/users/${thomasId}/friend-requests/*`
    }).as("sendFriendRequest");

    cy.login("thomast@test.com", "Thomas12345");

    cy.visit(`${Cypress.config("baseUrl")}/match`);
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/match`);

    cy.get('[data-testid="accept-button-container"]').click();

    cy.wait("@sendFriendRequest").its("state").should("be.equal", "Complete");
  });
});
