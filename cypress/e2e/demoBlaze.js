/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');

describe('DemoBlaze e2e Tests', () => {
  const username = faker.internet.userName();
  const password = 'Qwerty1!'

  beforeEach(() => {
    cy.visit('https://www.demoblaze.com');
  });

  it('should register with all filled fields', () => {
    cy.get('#signin2').click();
    cy.get('#sign-username').should('be.visible', { timeout: 25000 }).type(username);
    cy.get('#sign-password').should('be.visible', { timeout: 20000 }).type(password);
    cy.contains('.btn-primary', 'Sign up').should('be.visible', { timeout: 10000 }).click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Sign up successful.');
    });
});

  it('should log in with all filled fields', () => {
    cy.get('#login2').click();
    cy.get('#loginusername').type(username).should('be.visible', { timeout: 20000 });
    cy.get('#loginpassword').should('be.visible', { timeout: 20000 }).type(password);
    cy.contains('.btn-primary', 'Log in').should('be.visible', { timeout: 10000 }).click();
    cy.contains('#nameofuser', username)
      .should('be.visible');
  });

  it('should add product to the cart', () => {
    cy.get('#login2').click();
    cy.get('#loginusername').type(username).should('be.visible', { timeout: 20000 });
    cy.get('#loginpassword').type(password);
    cy.contains('.btn-primary', 'Log in').should('be.visible', { timeout: 10000 }).click();

    cy.contains('.hrefch', 'Samsung galaxy s6').click();
    cy.contains('.btn.btn-success.btn-lg', 'Add to cart')
      .click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Product added');
    });
  });

  it('should check product in the user cart', () => {
    cy.get('#login2').click();
    cy.get('#loginusername').should('be.visible', { timeout: 10000 }).type(username);
    cy.get('#loginpassword').type(password);
    cy.contains('.btn-primary', 'Log in').should('be.visible', { timeout: 10000 }).click();

    cy.contains('.hrefch', 'Samsung galaxy s6').click();
    cy.contains('.btn-success', 'Add to cart')
    .should('be.visible', { timeout: 10000 }).click();
    cy.contains('.nav-link', 'Cart').click();
  
    cy.contains('td', 'Samsung galaxy s6').should('be.visible');
    cy.contains('td', '360').should('be.visible');

  });
});