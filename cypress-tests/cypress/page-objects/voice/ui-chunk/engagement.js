/// <reference types="cypress" />
import * as navBar from '../ui-chunk/nav-bar';

const pageElements = {
  showAllTopicsButton: '[data-test-id=show-all-topics]',
  recommendationItem: '[class*=RecommendationItem]',
  topic: 'div[class*=TopicItem_topicContainer]',
  title: 'navbar-header',
  nonOpportunity: 'Non-opportunity'
};

// ---------- GETTERS ----------

function getShowAllTopicsButton() {
  return cy.get(pageElements.showAllTopicsButton);
}

function getRecommendationItems() {
  return cy.get(pageElements.recommendationItem);
}

function getTopic(topic) {
  return cy.get(pageElements.topic).filter(`:contains("${topic}")`);
}

function getNonOpportunityButton() {
  return cy.contains("button", pageElements.nonOpportunity);
}

function getTitle() {
  return cy.fetch(pageElements.title);
}

// ---------- ACTIONS ----------

function showAllTopics() {
  getShowAllTopicsButton().click();
  cy.wait(1000);
}

/**
 * Switch topic.
 * Either from "Select topic" or from switch topic on left menu.
 */
export function switchTopic(topic) {
  cy.get('body').then($body => {
    if ($body.find(pageElements.showAllTopicsButton).length > 0) {
      showAllTopics();
      getTopic(topic).find('[type=button]').click();
    } else {
      navBar.switchTopic();
      getTopic(topic).find('[type=button]').click();
    }
  });
}

// ---------- ASSERTIONS ----------

/**
 * Verifies Engagement is present.
 */
export function engagementShouldHaveStarted(){
  getShowAllTopicsButton().should('be.visible');
  getRecommendationItems().should('be.visible');
}

/**
 * Verifies Segment is displayed.
 */
export function segmentShouldHaveRendered(topic, segment = 0){
  const topicTitle = Object.keys(topic)[0],
    segmentList = topic[topicTitle],
    recommendations = segmentList[Object.keys(segmentList)[segment]];
  verifyTopicTitle(topicTitle);
  verifyLeftMenuSegments(segmentList);
  verifySegmentRecommendations(recommendations);
}

/**
 * Verifies topic title on left menu.
 */
function verifyTopicTitle(topic){
  navBar.topicTitleShouldBePresent(topic);
}

/**
 * Verifies list of Segments on left menu.
 */
function verifyLeftMenuSegments(segments){
  cy.log(segments);
  Object.entries(segments).forEach(
    ([key, value]) => {
      navBar.segmentShouldBePresent(key);
    });
}

/**
 * Verifies each recommendation on a segment.
 */
function verifySegmentRecommendations(recommendations){
  Object.entries(recommendations).forEach(
    ([key, value]) => {
      getRecommendationItems().contains(key, { matchCase: false });
      getRecommendationItems().contains(value, { matchCase: false });
    });
}

export function markAsNonOpportunity(){
  getNonOpportunityButton().click();
}

export function verifyTitle(title){
  getTitle().should("contain", title);
}
