/// <reference types="cypress" />
import * as reportsPage from '../../../../page-objects/annotation/reports';
const path = require('path');
const DOWNLOADS_FOLDER = Cypress.config('downloadsFolder');

context('As an analyst user', () => {
  context('single annotator', () => {
    beforeEach(() => cy.create('annotator_user', { id: 77 }));

    context('completed batch', () => {
      const BATCH_NAME = '1 - Batch for Report3';

      beforeEach(() => {
        reportsPage.createCompleteDataForReportThree(BATCH_NAME);
        reportsPage.loginAnalystUser();
      });

      it('downloads the report', () => {
        const filename = path.join(DOWNLOADS_FOLDER, `${BATCH_NAME}.csv`);

        reportsPage.selectReportThreeBatchAndDownloadFile(BATCH_NAME);
        reportsPage.reportThreeForCompleteBatchShouldCorrectlyDownload(filename);
      });
    });

    context('incomplete batch', () => {
      const BATCH_NAME = '2 - Batch for Report3';

      beforeEach(() => {
        reportsPage.createIncompleteDataForReportThree(BATCH_NAME);
        reportsPage.loginAnalystUser();
      });

      it('downloads the report', () => {
        const filename = path.join(DOWNLOADS_FOLDER, `${BATCH_NAME}.csv`);

        reportsPage.selectReportThreeBatchAndDownloadFile(`${BATCH_NAME} in-progress`);
        reportsPage.reportThreeForIncompleteBatchShouldCorrectlyDownload(filename);
      });
    });
  });
});
