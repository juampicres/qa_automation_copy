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

  context('when the user selects a batch', () => {
    beforeEach(() => annotationPage.selectBatch());

    it("displays the pulled transcript events", () => {
      annotationPage.shouldDisplayPulledTranscriptEvents();
    });

    it("displays the submit validation message", () => {
      annotationPage.shouldDisplayValidationMessage();
    });

    it("displays the submit button as disabled", () => {
      annotationPage.shouldDisplaySubmitButtonAsDisabled();
    });

    it("using pause/play button makes the transcript list re-appear", () => {
      annotationPage.clickPlayAndPauseToCheckTranscriptListReAppears();
    });

    context('when the user annotates all labels', () => {
      beforeEach(() => {
        // Visitor message event
        annotationPage.selectSingleEvent();
        // Select topic
        annotationPage.clickTopicOneButton();
        // Un-check visitor message event
        annotationPage.uncheckSingleEvent();
        // Agent message
        annotationPage.selectInvalidEvent();
        // Select objection
        annotationPage.clickObjectionOneButton();
        // Select action
        annotationPage.clickActionOneButton();
        // Select workflow
        annotationPage.clickWorkflowOneButton();
      });

      it("assigns annotated labels with selected event", () => {
        annotationPage.shouldAssignWorkflowWithSelectedEvent();
        annotationPage.shouldAssignActionWithSelectedEvent();
        annotationPage.shouldAssignObjectionWithSelectedEvent();
        annotationPage.shouldAssignActionWithSelectedEvent();
      });

      it('displays the list of all labels being used', () => {
        annotationPage.shouldDisplayListTopicsBeingUsed();
        annotationPage.shouldAssignWorkflowLabelWithSelectedEvent();
        annotationPage.shouldAssignObjectionWithSelectedEvent();
        annotationPage.shouldAssignActionWithSelectedEvent();
      });
    });
  });
});

