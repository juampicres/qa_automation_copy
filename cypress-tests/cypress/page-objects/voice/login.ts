import Chainable = Cypress.Chainable;

const url: string = Cypress.env().frontend;
const pageElements = {
  loginContainer: '[class*=Login_logoContainer]',
  emailInput: 'email',
  passwordInput: 'password',
  signInButton: 'sign-in',
  errorMessageText: '[class*=Login_errorText]',
  linkButtons: '[class*=Login_helperLinks]',
  submitButton: '[type=submit][class*=large]'
};

// ---------- GETTERS ----------

export function getLoginContainer(): Chainable<JQuery> {
  return cy.get(pageElements.loginContainer);
}

export function getEmailInput(): Chainable<JQuery> {
  return cy.fetch(pageElements.emailInput);
}

export function getPasswordInput(): Chainable<JQuery> {
  return getLoginContainer().fetch(pageElements.passwordInput);
}

export function getSignInButton(): Chainable<JQuery> {
  return getLoginContainer().fetch(pageElements.signInButton);
}

export function getErrorMessageText(): Chainable<JQuery> {
  return cy.get(pageElements.errorMessageText);
}

function getUnlockAccountLink(): Chainable<JQuery> {
  return cy.get(pageElements.linkButtons).contains('locked out');
}

function getResetPasswordLink(): Chainable<JQuery> {
  return cy.get(pageElements.linkButtons).contains('I forgot my password');
}

function getSubmitButton(): Chainable<JQuery> {
  return cy.get(pageElements.submitButton).contains('Send');
}

export function goToUnlockAccount(): void {
  getUnlockAccountLink().click();
}

export function goToResetPassword(): void {
  getResetPasswordLink().click();
}

// ---------- ACTIONS ----------

/**
 * Navigates user to login page.
 * URL is defined on cypress.json file.
 */
export function navigate(): void {
  cy.visit(`${url}`);
  loginPageShouldHaveRendered();
}

/**
 * Manually attempts to logins user
 * @param {string} email - user email
 * @param {string} password - user password
 */
export function login(email: string, password: string): void {
  getEmailInput().type(email);
  getPasswordInput().type(password);
  getSignInButton().click();
}

/**
 * Manually attempts a failed logins
 * @param {string} email - user email
 */
export function attemptLogin(email: string, password = 'not-my-password-1234!' ): void {
  getEmailInput().clear();
  getEmailInput().type(email);
  getPasswordInput().type(password);
  getPasswordInput().clear();
  getSignInButton().click();
}

/**
 * Navigates to login page and manually logs signs in the application.
 * @param {string} email - valid user email
 * @param {string} password - valid user password
 */
export function navigateAndLogin(email: string, password: string): void {
  navigate();
  login(email, password);
}

/**
 * Locks user account by attempting to login with a wrong password 4 times.
 * @param {string} email - valid user email
 */
export function lockUser(email: string): void {
  for (let i = 0; i < 4; i++) {
    attemptLogin(email);
  }
}

/**
 * Submits email both for unlock and recover password views.
 * @param {string} email - valid user email
 */
export function submitEmail(email: string): void {
  cy.intercept('POST', '/api/users/unlock').as('SEND_EMAIL_REQUEST');
  cy.intercept('POST', '/api/users/password').as('SEND_EMAIL_REQUEST');
  getEmailInput().type(email);
  getSubmitButton().click();
}

// ---------- ASSERTIONS ----------

/**
 * Verifies Login page.
 */
export function loginPageShouldHaveRendered(): void {
  getLoginContainer().contains('High Performer');
  getLoginContainer().contains('by XSELL');
  getEmailInput().should('exist');
  getPasswordInput().should('exist');
  getSignInButton().should('exist');
}

/**
 * Verifies Error message for wrong user or password is present.
 */
export function errorMessageShouldBePresent(): void {
  // TODO: This will change once the new message for unlock is ready
  getErrorMessageText().contains(getLoginErrorMessageText());
}

/**
 * Verifies that the unlock account view is present
 */
export function unlockAccountShouldHaveRendered(): void {
  getEmailInput().should('exist');
  getSubmitButton().should('exist');
  cy.contains('Unlock Account').should('exist');
  cy.contains('Enter your email below to receive unlock instructions.').should('exist');
}

/**
 * Verifies that the reset password view is present
 */
export function resetPasswordShouldHaveRendered(): void {
  getEmailInput().should('exist');
  getSubmitButton().should('exist');
  cy.contains('Forgot your password?').should('exist');
  cy.contains('Enter your email below to receive password reset instructions.').should('exist');
}

/**
 * Verifies that the unlock email was sent by checking the confirmation message on the UI
 */
export function unlockAccountEmailShouldHaveBeenSent(): void {
  cy.contains('Check your email').should('exist');
  cy.contains('An account unlock link has been sent to the email provided. ' +
      'Please follow the instructions in the email to unlock your account.').should('exist');
}

/**
 * Verifies that the recover email was sent by checking the confirmation message on the UI
 */
export function recoverEmailShouldHaveBeenSent(): void {
  cy.contains('Check your email').should('exist');
  cy.contains('A password reset link has been sent to the email provided. ' +
      'Please follow the instructions in the email to reset your password.').should('exist');
}

/**
 * Verifies that the email for both unlock and recover email was sent by checking the server response
 */
export function sendEmailRequestShouldHaveBeenMade(): void {
  cy.get('@SEND_EMAIL_REQUEST').then((request) => {
    assert.equal(request['response']['statusCode'], 201);
    assert.equal(request['response']['statusMessage'], 'Created');
  });
}

/**
 * Returns corresponding error message text depending on the environment
 */
export function getLoginErrorMessageText(): string{
  return 'The username or password you entered was incorrect. Please try again to continue.';
}
