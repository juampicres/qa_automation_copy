/// <reference types="cypress" />
import * as navBar from './ui-chunk/nav-bar';
import * as menuBar from './ui-chunk/menu-bar';
import { isSmallViewport } from '../../support/utils';

const url = Cypress.env().frontend;

// ---------- GETTERS ----------

export function getNavbar() {
  return navBar;
}

export function getMenuBar() {
  return menuBar;
}

// ---------- ACTIONS ----------

export function navigate() {
  cy.visit(`${url}`);
}

/**
 * Manually logs user out of the application.
 */
export function logout() {
  if (isSmallViewport()) getNavbar().openMenuBar();
  getMenuBar().logout();
}

/**
 * Ends call if possible.
 */
export function endCall() {
  if (isSmallViewport()) getNavbar().openMenuBar();
  getMenuBar().endCall();
  if (isSmallViewport()) getMenuBar().closeMenuBar();
}
// ---------- ASSERTIONS ----------
