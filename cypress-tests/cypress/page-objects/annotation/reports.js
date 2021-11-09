/// <reference types="cypress" />
const url = 'export_v2';
const pageElements = {
  reportThreeBatchSelector: 'report3-batch-select',
  reportFourBatchSelector: 'report4-batch-select',
  reportThreeSubmitButton: 'report3-submit',
  reportFourSubmitButton: 'report4-submit',
  downloadLink: 'report-download-link'
};

// ---------- GETTERS ----------

export function getReportThreeBatchSelector() {
  return cy.fetch(pageElements.reportThreeBatchSelector);
}

export function getReportFourBatchSelector() {
  return cy.fetch(pageElements.reportFourBatchSelector);
}

export function getReportThreeSubmitButton() {
  return cy.fetch(pageElements.reportThreeSubmitButton);
}

export function getReportFourSubmitButton() {
  return cy.fetch(pageElements.reportFourSubmitButton);
}

export function getDownloadLink() {
  return cy.fetch(pageElements.downloadLink);
}

// ---------- ACTIONS ----------

/**
 * Navigates user to reports page.
 * URL is defined on cypress.json file.
 */
export function navigateToReports() {
  cy.visit(`${url}`);
}

/**
 * Selects report3 batch and downloads a specific file
 * @param {string} batchName - valid batch name
 */
export function selectReportThreeBatchAndDownloadFile(batchName) {
  navigateToReports();
  getReportThreeBatchSelector().select(batchName);
  getReportThreeSubmitButton().click();
  getDownloadLink().click();
}

/**
 * Selects report4 batch and downloads a specific file
 * @param {string} batchName - valid batch name
 */
export function selectReportFourBatchAndDownloadFile(batchName) {
  navigateToReports();
  getReportFourBatchSelector().select(batchName);
  getReportFourSubmitButton().click();
  getDownloadLink().click();
}

/**
 * Manually attempts to login as an Analyst user.
 */
export function loginAnalystUser() {
  cy.create('analyst_user').login();
}

/**
 * Creates complete data for report3. The batches are associated with the already created users.
 */
export function createCompleteDataForReportThree(batchName) {
  cy.create('batch', { name: 'Some other batch', id: 4 });
  cy.create('complete_batch_for_report3', { name: batchName, complete: true });
}

/**
 * Creates complete data for report4. The batches are associated with the already created users.
 */
export function createCompleteDataForReportFour(batchName) {
  cy.create('batch', { name: 'Some other batch', id: 4 });
  cy.create('complete_batch_for_report4', { name: batchName, complete: true });
}

/**
 * Creates incomplete data for report3. The batches are associated with the already created users.
 */
export function createIncompleteDataForReportThree(batchName) {
  cy.create('incomplete_batch_for_report3', { name: 'Some other batch' });
  cy.create('incomplete_batch_for_report3', { name: batchName, complete: false });
}

/**
 * Creates incomplete data for report4. The batches are associated with the already created users.
 */
export function createIncompleteDataForReportFour(batchName) {
  cy.create('batch', { name: 'Some other batch' });
  cy.create('incomplete_batch_for_report4', { name: batchName, complete: false });
}

// ---------- ASSERTIONS ----------

/**
 * Verifies complete batch for report3 file.
 * @param {string} filename - valid file name
 */
export function reportThreeForCompleteBatchShouldCorrectlyDownload(filename) {
  cy.readFile(filename).should('contain', 'complain');
  cy.readFile(filename).should('contain', 'data');
  cy.readFile(filename).should('contain', 'service');}

/**
 * Verifies complete batch for report4 file.
 * @param {string} filename - valid file name
 */
export function reportFourForCompleteBatchShouldCorrectlyDownload(filename) {
  cy.readFile(filename).should('contain', 'Some very large topic');}

/**
 * Verifies incomplete batch for report3 file.
 * @param {string} filename - valid file name
 */
export function reportThreeForIncompleteBatchShouldCorrectlyDownload(filename) {
  cy.readFile(filename).should('contain', 'upgrade');
  cy.readFile(filename).should('contain', 'add');
  cy.readFile(filename).should('contain', 'cell');}

/**
 * Verifies incomplete batch for report4 file.
 * @param {string} filename - valid file name
 */
export function reportFourForIncompleteBatchShouldCorrectlyDownload(filename) {
  cy.readFile(filename).should('contain', 'transcript,agent_id');
  cy.readFile(filename).should('not.contain', 'Some very large topic');}
