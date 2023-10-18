// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add("signup", (email, password) => {
  cy.visit("/auth");
  cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

  cy.contains("Sign up instead").click();

  cy.get("#auth-page_login-form-title").should("contain", "Sign up");
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="submit-button"]').click();

  cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/auth");
  cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

  cy.get("#auth-page_login-form-title").should("contain", "Log in");
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="submit-button"]').click();

  cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
