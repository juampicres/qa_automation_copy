/// <reference types="cypress" />
import * as annotationPage from '../../../../page-objects/annotation/annotation';

// Create a new Project for each test.
beforeEach(() =>  {
  annotationPage.setViewport();
  annotationPage.createNewProjectForEachTest();
});

context('As an annotator user', () => {
  beforeEach(() => {
    // Set starting point for the scenario
    annotationPage.setInitialRecordsAndLogin();
    annotationPage.navigateToAnnotation();
    annotationPage.clickShepherdCancelIcon();
  });

  it("displays the available transcripts count", () => {
    annotationPage.shouldDisplayAvailableTranscriptsCount();
  });

  it("lists assigned batches", () => {
    annotationPage.shouldListAssignedBatches();
  });

  it("displays available action", () => {
    annotationPage.shouldDisplayAvailableActions();
  });

  context('labels filters', () => {
     beforeEach(() => annotationPage.shouldListAllAvailableLabels());

    it('filters by action labels', () => {
      annotationPage.clickActionFilterButton();
      annotationPage.shouldFilterByActionLabel();
    });
  });

  context('when the user selects a batch', () => {
    beforeEach(() => annotationPage.selectBatch());

    it("displays the pulled transcript events", () => {
      annotationPage.shouldDisplayPulledTranscriptEvents();
    });

    context('when annotating action labels', () => {
      beforeEach(() => annotationPage.clickActionFilterButton());

      context('when a valid event is selected', () => {
        beforeEach(() => {
          annotationPage.selectInvalidEvent();
          annotationPage.clickActionOneButton();
        });

        it("assigns the action with the selected event", () => {
          annotationPage.shouldAssignActionWithSelectedEvent();
        });

        it('displays the list of actions being used', () => {
          annotationPage.shouldDisplayAvailableActions();
        });

        it("does not display the submit validation message", () => {
          annotationPage.shouldNotDisplaySubmitValidationMessage();
        });
      });

      context('when an invalid event is selected', () => {
        beforeEach(() => {
          annotationPage.selectSingleEvent();
          annotationPage.clickActionOneButton();
        });

        it("assigns the action with selected event", () => {
          annotationPage.shouldANotAssignActionWithSelectedEvent();
        });
      });
    });
  });
});
