/// <reference types="cypress" />
import * as batchCreationPage from '../../../../page-objects/annotation/batch-creation';

context('As a Manager user', () => {
  context('when filtering transcripts', () => {
    var date = new Date();

    date.setDate(date.getDate() - 7);
    const createdAt = date.toLocaleDateString('zh-Hans-CN');

    date.setDate(date.getDate() - 1);
    const engagementFrom = date.toLocaleDateString('zh-Hans-CN');

    // Set initial records in the DB and login user
    beforeEach(() => {
      batchCreationPage.loginManagerUser();

      // Creating a total of 4 engagements: one voice and three text types.
      // One is just uploaded, type voice.
      // Another one is completed.
      // Two are marked as assigned (one with flags and another with notes)

      // Uploaded
      batchCreationPage.createUploadedEngagement(createdAt);

      // Incomplete (Assigned)
      batchCreationPage.createIncompleteAssigned();

      // Completed (completed)
      batchCreationPage.createCompleteBatchEngagement();

      // Creating two assigned engagements, one flagged and the other with events
      // Flagged
      batchCreationPage.createTwoAssignedEngagement();

      // Notes
      batchCreationPage.createNotesEngagement();
    });

    beforeEach(() => { batchCreationPage.navigateToEngagements(); });

    it('should be able to see the transcripts tab ', () => {
      batchCreationPage.transcriptsTab();
    });

    it('should be able to see the correct count of transcripts for each tab', () => {
      batchCreationPage.correctCountTranscriptsEachTab();
    });

    it('should be able to filter by engagement type and only see one voice engagement', () => {
      batchCreationPage.filterOneEngagementVoice();
    });

    it('should be able to filter by engagement type and only see three engagements', () => {
      batchCreationPage.filterThreeEngagement();
    });

    it('should be able to filter from one date forwards', () => {
      // Filtering using the engagement created with engagementFrom
      batchCreationPage.filterOneDate(engagementFrom);
    });

    it('should be able to filter by engagement type by a specific date', () => {
      batchCreationPage.filterSpecificDate(engagementFrom, createdAt);
    });

    it('should not be able to filter by a wrong date', () => {
      batchCreationPage.filterWrongDate();
    });
  });

  context('when change rows per page', () => {
    beforeEach(() => {
      batchCreationPage.loginManagerUser();

      const createdAt = new Date();
      // Creating a total of  153 engagements.
      // Uploaded
      batchCreationPage.uploadedSpecificEngagements(createdAt);
    });

    beforeEach(() => { batchCreationPage.navigateToEngagements(); });

    it('displays the correct count of transcripts for uploaded tab', () => {
      batchCreationPage.correctCountTranscriptsUploadedTab();
    });

    it('displays 10 rows by default', () => {
      batchCreationPage.displayTenRowsByDefault();
    });

    it('displays 50 rows when requested', () => {
      batchCreationPage.displayFiftyRowsByDefault();
    });

    it('displays 100 rows when requested', () => {
      batchCreationPage.displayOneHundredRowsByDefault();
    });
  });
});
