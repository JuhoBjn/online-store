describe("The payment page", () => {
  it("should allow a user to navigate to the payment page", () => {
    cy.visit(`${Cypress.config("baseUrl")}/payment`);
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/payment`);
  });

  it("should display information about payment", () => {
    cy.visit(`${Cypress.config("baseUrl")}/payment`);

    cy.get('[data-testid="payment-page-title"]').should("be.visible");
    cy.get('[data-testid="payment-page-introduction"]').should("be.visible");
    cy.get('[data-testid="payment-page-submit"]').should("exist");
  });

  it("should not allow a user to proceed without filling in the form", () => {
    cy.visit(`${Cypress.config("baseUrl")}/payment`);

    cy.get('[data-testid="payment-page-submit"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/payment`);
  });

  it("should allow a user to navigate to signup/login through the submit button after filling in the form", () => {
    cy.visit(`${Cypress.config("baseUrl")}/payment`);

    cy.get('[name="number"]').type("5555555555554444");
    cy.get('[name="name"]').type("Test User");
    cy.get('[name="expiry"]').type("0222");
    cy.get('[name="cvc"]').type("123");

    cy.get('[data-testid="payment-page-submit"]').click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth#signup`);
  });
});
