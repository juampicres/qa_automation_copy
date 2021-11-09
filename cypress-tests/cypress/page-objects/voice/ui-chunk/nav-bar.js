/// <reference types="cypress" />

import { isSmallViewport } from '../../../support/utils';

const pageElements = {
  navbarContainer: '[class*=navContainer]',
  menuButton: 'menu-open',
  switchTopicButton: 'switch-topic-button',
  segmentListItem: '[class*=MenuItem_segment][class*=MenuItem_itemHeading]',
  topicTitle: 'div[class*=MenuItem_itemHeading][class*=MenuItem_topic]'
};

// ---------- GETTERS ----------

function getNavContainer() {
  return cy.get(pageElements.navbarContainer);
}

function getMenuButton() {
  return getNavContainer().fetch(pageElements.menuButton);
}

function getSwitchTopicButton() {
  return getNavContainer().fetch(pageElements.switchTopicButton);
}

function getSegmentListItems() {
  return getNavContainer().get(pageElements.segmentListItem);
}

function getTopicTitle() {
  cy.wait(1000);
  return cy.get(pageElements.topicTitle);
}
// ---------- ACTIONS ----------

/**
 * Opens menubar.
 */
export function openMenuBar() {
  getMenuButton().click();
}

/**
 * Open switch topic list.
 */
export function switchTopic() {
  getSwitchTopicButton().click();
}

// ---------- ASSERTIONS ----------

/**
 * Verifies navbar.
 */
export function navbarShouldHaveRendered() {
  getNavContainer().contains('Home');
  if (isSmallViewport()) getNavContainer().contains('Menu');
}

/**
 * Verifies Segment is listed.
 */
export function segmentShouldBePresent(segment) {
  getSegmentListItems().contains(segment, { matchCase: false });
}

/**
 * Verifies Topic title
 */
export function topicTitleShouldBePresent(topic) {
  getTopicTitle().contains(topic, { matchCase: false });
}