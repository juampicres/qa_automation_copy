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

  it("displays available workflow", () => {
    annotationPage.shouldDisplayAvailableWorkflow();
  });

  context('labels filters', () => {
    beforeEach(() => annotationPage.shouldListAllAvailableLabels());

    it('filters by workflow labels', () => {
      annotationPage.clickWorkflowFilterButton();
      annotationPage.shouldFilterByWorkflowLabel();
    });
  });

  context('when the user selects a batch', () => {
    beforeEach(() => annotationPage.selectBatch());

    it("displays the pulled transcript events", () => {
      annotationPage.shouldDisplayPulledTranscriptEvents();
    });

    context('when annotating workflow labels', () => {
      beforeEach(() => annotationPage.clickWorkflowFilterButton());

      context('when a valid event is selected', () => {
        beforeEach(() => {
          annotationPage.selectInvalidEvent();
          annotationPage.clickWorkflowOneButton();
        });

        it("assigns the workflow with selected event", () => {
          annotationPage.shouldAssignWorkflowWithSelectedEvent();
        });

        it('displays the list of workflows being used', () => {
          annotationPage.shouldAssignWorkflowLabelWithSelectedEvent();
        });

        it("does not display the submit validation message", () => {
          annotationPage.shouldNotDisplaySubmitValidationMessage();
        });
      });

      context('when an invalid event is selected', () => {
        beforeEach(() => {
          annotationPage.selectSingleEvent();
          annotationPage.clickWorkflowOneButton();
        });

        it("does not assign the workflow with the selected event", () => {
          annotationPage.shouldANotAssignWorkflowWithSelectedEvent();
        });
      });
    });
  });
});
