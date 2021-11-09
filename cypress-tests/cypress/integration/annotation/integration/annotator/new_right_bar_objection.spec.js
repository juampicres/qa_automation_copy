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
  })

  it("displays available objections", () => {
    annotationPage.shouldDisplayAvailableObjections();
  })

  context('labels filters', () => {
    beforeEach(() => annotationPage.shouldListAllAvailableLabels());

    it('filters by objection labels', () => {
      annotationPage.clickObjectionFilterButton();
      annotationPage.shouldFilterByObjectionLabel();
    });
   });

  context('when the user selects a batch', () => {
    beforeEach(() => annotationPage.selectBatch());

    it("displays the pulled transcript events", () => {
      annotationPage.shouldDisplayPulledTranscriptEvents();
    });

    context('when annotating objection labels', () => {
      beforeEach(() => annotationPage.clickObjectionFilterButton());

      context('when a valid event is selected', () => {
        beforeEach(() => {
          // Esto a veces está habilitado y a veces no. No entiendo por que
          annotationPage.selectInvalidEvent();
          annotationPage.clickObjectionOneButton();
        });

        it("assigns objection with selected event", () => {
          annotationPage.shouldAssignObjectionWithSelectedEvent();
        });

        it('displays the list of objections being used', () => {
          annotationPage.shouldDisplayAvailableLabelObjections();
        });

        it("does not display the submit validation message", () => {
          annotationPage.shouldNotDisplaySubmitValidationMessage();
        });
      });

      context('when an invalid event is selected', () => {
        beforeEach(() => {
          annotationPage.selectSingleEvent();
          annotationPage.clickObjectionOneButton();
        });

        it("does not assign objection with selected event", () => {
          annotationPage.shouldANotAssignObjectionWithSelectedEvent();
        });
      });
    });
  });
});
