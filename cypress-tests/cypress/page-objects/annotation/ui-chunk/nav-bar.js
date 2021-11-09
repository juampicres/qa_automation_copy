/// <reference types="cypress" />

const pageElements = {
  navbarContainer: 'navbar',
  username: 'user-name',
  logoutButton: 'user-logout'
};

// ---------- GETTERS ----------

function getNavContainer() {
  return cy.fetch(pageElements.navbarContainer);
}

function getLogoutButton() {
  return cy.fetch(pageElements.logoutButton);
}

function getUsername() {
  return getNavContainer().fetch(pageElements.username);
}

// ---------- ACTIONS ----------

export function clickOnNavUsername() {
  getUsername().click();
}

export function clickOnLogoutButton() {
  getLogoutButton().click();
}

// ---------- ASSERTIONS ----------

/**
 * Verifies navbar displays correct username.
 * @param {string} user - valid username
 */
export function navbarShouldDisplayUsername(user) {
  getNavContainer().contains(user);
}
