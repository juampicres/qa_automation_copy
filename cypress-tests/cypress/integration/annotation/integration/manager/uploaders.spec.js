/// <reference types="cypress" />
import * as batchCreationPage from '../../../../page-objects/annotation/batch-creation';

context('As a Manager user', () => {
  // Set initial records in the DB and login user
  beforeEach(() => {
    batchCreationPage.createEventType();
    batchCreationPage.loginManagerUserUploader();
    batchCreationPage.navigateToUploaders();
  });

  context('with a valid file', () => {
    it('uploads succesfully a single file', () => {
      batchCreationPage.uploadsSuccesfullySingleFile();
      batchCreationPage.navigateToEngagements();
      batchCreationPage.uploadsSuccesfullySingleFileTablesRows();
    });
  });

  context('with an invalid file', () => {
    it('uploaded file fails', () => {
      batchCreationPage.uploadsInvalidSingleFile();
      batchCreationPage.navigateToEngagements();
    });
  });
});
