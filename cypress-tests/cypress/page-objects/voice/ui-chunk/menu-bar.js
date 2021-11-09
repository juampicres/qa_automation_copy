/// <reference types="cypress" />

import { isSmallViewport } from '../../../support/utils';

const pageElements = {
  closeMenuButton: 'menu-close',
  logoutButton: 'logout-button',
  endCallButton: '[data-test-id=end-call-button]',
  menuItemContainer: '[class*=MenuItem_itemContainer]',

  // Logout Modal
  logoutModalContainer: '[class*=LogoutModal_modal]',
  logoutModalCancelButton: 'logout-cancel',
  logoutConfirmButton: 'logout-confirm',

  // End Call modal
  endCallConfirmButton: 'end-call-confirm',
};

// ---------- GETTERS ----------

function getCloseMenuButton() {
  return cy.fetch(pageElements.closeMenuButton);
}

function getLogoutButton() {
  return cy.fetch(pageElements.logoutButton)
    .contains('Log out');
}

function getLogoutModal() {
  return cy.get(pageElements.logoutModalContainer);
}

function getLogoutCancelButton() {
  return getLogoutModal().fetch(pageElements.logoutModalCancelButton);
}

function getLogoutConfirmButton() {
  return cy.fetch(pageElements.logoutConfirmButton).contains('Yes, log me out');
}

function getConfirmEndCallModalButton() {
  return cy.fetch(pageElements.endCallConfirmButton);
}

// ---------- ACTIONS ----------

/**
 * Closes menubar. Only applies for small viewport test cases.
 */
export function closeMenuBar() {
  getCloseMenuButton().click();
}

/**
 * Manually logs user out from the application.
 */
export function logout() {
  // Workaround required for desktop.
  const params = isSmallViewport() ? {} : { force: true };
  clickLogoutButton();
  getLogoutConfirmButton().click(params);
}

/**
 * Clicks logout button.
 */
export function clickLogoutButton() {
  getLogoutButton().should('be.visible').click({ force: true });
}

/**
 * Dismisses the logout modal.
 */
export function dismissLogoutModal() {
  getLogoutCancelButton().click();
}

// ---------- ASSERTIONS ----------

/**
 * Verifies Menubar.
 * */
export function menuBarShouldHaveRendered() {
  cy.get(pageElements.menuItemContainer);
}

/**
 * Clicks on "End Call" button if present.
 * Required for stating environment set up and teardown
 */
export function endCall(){
  menuBarShouldHaveRendered();
  cy.get('body').then($body => {
    if ($body.find(pageElements.endCallButton).length > 0) {
      $body.find(pageElements.endCallButton).trigger('click');
      getConfirmEndCallModalButton().click({ force: true });
    }
  });
  cy.get(pageElements.endCallButton, {timeout: 3000}).should('not.exist');
}

