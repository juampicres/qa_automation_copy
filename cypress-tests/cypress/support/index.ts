// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
/// <reference types="cypress" />
import '@applitools/eyes-cypress/commands';

// Import commands.js using ES2015 syntax:
import './commands';
import './rails/commands';
import './guidelines/commands';
import './clear_database';
import './commands_delay';
declare global {
  namespace Cypress {
    interface Chainable {
      startVisualTest(app: string, name: string): void;
      endVisualTest(): void;
      eyesCheckWindow(name: string): void;
      fetch(locator: string): Chainable<JQuery>;
    }
  }
}

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
// This is for the 401 errors from logging in invalid and blank credentialsThis is applied to all spec files
