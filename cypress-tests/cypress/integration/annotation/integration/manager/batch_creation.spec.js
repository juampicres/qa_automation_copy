/// <reference types="cypress" />
import * as batchCreationPage from '../../../../page-objects/annotation/batch-creation';

context('As a Manager user', () => {
  // Set initial records in the DB and login user
  beforeEach(() => {
    batchCreationPage.createInitialRecordsDB();
    batchCreationPage.loginManagerUser();
  });

  // Set starting point for the scenario
  beforeEach(() => { batchCreationPage.navigateToBatchCreation(); });       // Open batch creation modal

  it('can\'t create a batch without specifying a type', () => {
    batchCreationPage.cantCreateBatchModal();
  });

  it('can create a batch', () => {
    batchCreationPage.createBatchModalPage();

    // check created batch presence
    batchCreationPage.checkCreateBatchModal();
  });
});
