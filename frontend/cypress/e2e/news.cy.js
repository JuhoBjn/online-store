describe("The news page", () => {
  it("should allow a logged in user to access", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  });

  it("should not allow a user to access the page without loggin in", () => {
    cy.visit(`${Cypress.config("baseUrl")}`);

    // A logged out user should be directed to the frontpage.
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display a list of articles", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}`);

    cy.get(':nth-child(1) > [data-testid="news-article-container"]').should(
      "be.visible"
    );
    cy.get(
      ':nth-child(1) > [data-testid="news-article-container"] > .news-article-content > [data-testid="news-article-headline"]'
    ).should("be.visible");
    cy.get(
      ':nth-child(1) > [data-testid="news-article-container"] > .news-article-content > [data-testid="news-article-body"]'
    ).should("be.visible");
  });

  it("should allow a user to open news articles in a dedicated page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/`);

    cy.get(
      ':nth-child(1) > [data-testid="news-article-container"] > .news-article-content > [data-testid="news-article-headline"]'
    ).click();

    cy.url().should("contain", `${Cypress.config("baseUrl")}/article/`);
  });
});

describe("The news article page", () => {
  it("should allow a logged in user to visit the page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/article/1`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/article/1`);
  });

  it("should not allow an unauthenticated user to visit the page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/article/1`);

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/frontpage`);
  });

  it("should display a news article", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.visit(`${Cypress.config("baseUrl")}/article/2`);

    cy.get('[data-testid="news-page-article-headline"]').should("be.visible");
    cy.get('[data-testid="news-page-article-posted-at"]').should("be.visible");
    cy.get('[data-testid="news-page-article-body"]').should("be.visible");
    cy.get('[data-testid="news-page-article-link"]').should("be.visible");
  });
});

describe("The calendar sidebar", () => {
  it("should display a sidebar for the calendar components", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.get(".calendar-sidebar").should("be.visible");
  });

  it("should display a month view calendar", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.get('[data-testid="calendar-sidebar-month-container"]').should(
      "be.visible"
    );
  });

  it("should display a daily schedule", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.contains("Today's schedule").should("be.visible");
    cy.get('[data-testid="calendar-sidebar-day-container"]').should(
      "be.visible"
    );
  });

  it("should display a button to navigate to the activities view", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.get('[data-testid="add-new-activity-button"]').scrollIntoView();
    cy.get('[data-testid="add-new-activity-button"]').should("be.visible");
  });

  it("should allow a user to navigate to the activities page", () => {
    cy.login("bobb@test.com", "Bob12345");

    cy.get('[data-testid="add-new-activity-button"]').scrollIntoView();
    cy.get('[data-testid="add-new-activity-button"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/activities`);
  });
});
