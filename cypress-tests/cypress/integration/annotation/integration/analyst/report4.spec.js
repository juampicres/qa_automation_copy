/// <reference types="cypress" />
import * as reportsPage from '../../../../page-objects/annotation/reports';
const path = require('path');
const DOWNLOADS_FOLDER = Cypress.config('downloadsFolder');

context('As an analyst user', () => {
  context('single annotator', () => {
    beforeEach(() => cy.create('annotator_user', { id: 77 }));

    context('completed batch', () => {
      const BATCH_NAME = '1 - Batch for Report4';

      beforeEach(() => {
        reportsPage.createCompleteDataForReportFour(BATCH_NAME);
        reportsPage.loginAnalystUser();
      });

      it('downloads the report', () => {
        const filename = path.join(DOWNLOADS_FOLDER, `${BATCH_NAME}.csv`);

        reportsPage.selectReportFourBatchAndDownloadFile(BATCH_NAME);
        reportsPage.reportFourForCompleteBatchShouldCorrectlyDownload(filename);
      });
    });

    context('incomplete batch', () => {
      const BATCH_NAME = '2 - Batch for Report4';

      beforeEach(() => {
        reportsPage.createIncompleteDataForReportFour(BATCH_NAME);
        reportsPage.loginAnalystUser();
      });

      it('downloads the report', () => {
        const filename = path.join(DOWNLOADS_FOLDER, `${BATCH_NAME}.csv`);

        reportsPage.selectReportFourBatchAndDownloadFile(`${BATCH_NAME} in-progress`);
        reportsPage.reportFourForCompleteBatchShouldCorrectlyDownload(filename);
      });
    });
  });

  context('multiple annotators', () => {
    beforeEach(() => {
      cy.create('annotator_user', { id: 77 });
      cy.create('annotator_user');
    });

    context('completed batch', () => {
      const BATCH_NAME = '3 - Batch for Report4';
      beforeEach(() => {
        reportsPage.createCompleteDataForReportFour(BATCH_NAME);
        reportsPage.loginAnalystUser();
      });

      it('downloads the report', () => {
        const filename = path.join(DOWNLOADS_FOLDER, `${BATCH_NAME}.csv`);

        reportsPage.selectReportFourBatchAndDownloadFile(BATCH_NAME);
        reportsPage.reportFourForCompleteBatchShouldCorrectlyDownload(filename);
      });
    });

    context('incomplete batch', () => {
      const BATCH_NAME = '4 - Batch for Report4';

      beforeEach(() => {
        reportsPage.createIncompleteDataForReportFour(BATCH_NAME);
        reportsPage.loginAnalystUser();
      });

      it('downloads an empty report', () => {
        const filename = path.join(DOWNLOADS_FOLDER, `${BATCH_NAME}.csv`);

        reportsPage.selectReportFourBatchAndDownloadFile(`${BATCH_NAME} in-progress`);
        reportsPage.reportFourForIncompleteBatchShouldCorrectlyDownload(filename);
      });
    });
  });
});
