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

// Optional parameter for test cases where signup is supposed to fail.
Cypress.Commands.add(
  "signup",
  (
    email,
    password,
    supposedToFail = false,
    firstname = "default",
    lastname = "default",
    phone = 123456789,
    city = "Testtown",
    postalcode = "00100",
    country = "fi"
  ) => {
    cy.visit("/auth");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

    cy.contains("Sign up instead").click();

    cy.get("#auth-page_login-form-title").should("contain", "Sign up");
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="tc-checkbox"]').check();
    cy.get('[data-testid="submit-button"]').click();

    if (!supposedToFail) {
      cy.url().should("contain", "edit");

      cy.get('[data-testid="firstname-input"]').type(firstname);
      cy.get('[data-testid="lastname-input"]').type(lastname);
      cy.get('[data-testid="bio-input"]').type(
        `This is the profile of ${firstname} ${lastname}`
      );
      cy.get('[data-testid="phone-input"]').type(phone);
      cy.get('[data-testid="city-input"]').type(city);
      cy.get('[data-testid="postalcode-input"]').type(postalcode);
      cy.get('[data-testid="country-input"]').select(country);
      cy.contains("Update profile").click();

      cy.url().should("contain", "user");
    }
  }
);

// Optional parameter for test cases where login is supposed to fail.
Cypress.Commands.add("login", (email, password, supposedToFail = false) => {
  cy.visit("/auth");
  cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth`);

  cy.get("#auth-page_login-form-title").should("contain", "Log in");
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="submit-button"]').click();

  if (!supposedToFail) {
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  }
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
