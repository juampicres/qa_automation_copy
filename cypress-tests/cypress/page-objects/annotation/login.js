/// <reference types="cypress" />
const url = '/';
const pageElements = {
  alertContainer: '[class*="alert alert-danger alert-block devise-bs"]',
  loginContainer: 'log-in-dialog',
  emailInput: 'email-input',
  passwordInput: 'password-input',
  signInButton: 'submit-button'
};

// ---------- GETTERS ----------

export function getAlertContainer() {
  return cy.get(pageElements.alertContainer);
}

export function getLoginContainer() {
  return cy.fetch(pageElements.loginContainer);
}

export function getEmailInput() {
  return getLoginContainer().fetch(pageElements.emailInput);
}

export function getPasswordInput() {
  return getLoginContainer().fetch(pageElements.passwordInput);
}

export function getSignInButton() {
  return getLoginContainer().fetch(pageElements.signInButton);
}

// ---------- ACTIONS ----------

/**
 * Navigates user to login page.
 * URL is defined on cypress.json file.
 */
export function navigate() {
  cy.visit(`${url}`);
  loginPageShouldHaveRendered();
}

/**
 * Manually attempts to login user.
 * @param {string} email - user email
 * @param {string} password - user password
 */
export function login(email, password) {
  getEmailInput().type(email);
  getPasswordInput().type(password);
  signInButtonClick();
}

/**
 * Manually attempts to login user by entering an invalid email.
 */
export function invalidEmailLoginAttempt() {
  navigate();
  getEmailInput().type('invalid@testing.com');
  signInButtonClick();
}

/**
 * Manually attempts to login user by entering an invalid password.
 */
export function invalidPasswordLoginAttempt() {
  navigate();
  getPasswordInput().type('fake123');
  signInButtonClick();
}

/**
 * Manually attempts to login user without entering credentials.
 */
export function navigateAndClickSignInButton() {
  navigate();
  signInButtonClick();
}

/**
 * Clicks on Sign In button.
 */
export function signInButtonClick() {
  getSignInButton().click();
}

/**
 * Navigates to login page and manually signs into the application.
 * @param {string} email - valid user email
 * @param {string} password - valid user password
 */
export function navigateAndLogin(email, password) {
  navigate();
  login(email, password);
}

// ---------- ASSERTIONS ----------

/**
 * Verifies Login page.
 */
export function loginPageShouldHaveRendered() {
  getEmailInput().should('exist');
  getPasswordInput().should('exist');
  getSignInButton().should('exist');
}

/**
 * Verifies "Invalid Email or password." error message is displayed.
 */
export function invalidCredentialsShouldBeDisplayed() {
  getAlertContainer().contains('Invalid Email or password.');
}
