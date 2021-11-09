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

  it("displays available topics", () => {
    annotationPage.shouldDisplayAvailableTopics();
  });

  context('labels filters', () => {
    beforeEach(() => annotationPage.shouldListAllAvailableLabels());

    it('filters by topic labels', () => {
      annotationPage.clickTopicFilterButton();
      annotationPage.shouldFilterByTopicLabel();
    });
  });

  context('when the user selects a batch', () => {
    beforeEach(() => annotationPage.selectBatch());

    it("displays the pulled transcript events", () => {
      annotationPage.shouldDisplayPulledTranscriptEvents();
    });

    context('when annotating topic/subtopic labels', () => {
      beforeEach(() => annotationPage.clickTopicFilterButton());

      context('when a single event is selected', () => {
        beforeEach(() => annotationPage.selectSingleEvent());

        context('when annotating topics', () => {
          beforeEach(() => annotationPage.clickTopicOneButton());

          it("assigns the topic to the selected event", () => {
            annotationPage.shouldAssignTopicToSelectedEvent();
          });

          it('displays the list of topics being used', () => {
            annotationPage.shouldDisplayListTopicsBeingUsed();
          });

          it("does not display the submit validation message", () => {
            annotationPage.shouldNotDisplaySubmitValidationMessage();
          });

          context('when annotating subtopics', () => {
            beforeEach(() => annotationPage.clickSubtopicOneTwoThree());

            context('when selecting a single subtopic', () => {
              it("assigns the subtopic to the selected event", () => {
                annotationPage.shouldAssignsSubtopicSelectedEvent();
              });

              it('displays the list of subtopics being used', () => {
                annotationPage.shouldDisplayListSubtopicBeingUsedOneTwoThree();
              });
            });

            context('when selecting multiple subtopics', () => {
              beforeEach(() => annotationPage.clickSubtopicFourFiveSix());

              it("assigns all subtopics to selected event", () => {
                annotationPage.shouldAssignsAllSubtopicSelectedEvent();
              });

              it('displays the list of all subtopics being used', () => {
                annotationPage.shouldDisplayListSubtopicBeingUsedOneTwoThree();
                annotationPage.shouldDisplayListSubtopicBeingUsedFourFiveSix();
              });
            });
          });
        });
      });

      context('when multiple events are selected', () => {
        beforeEach(() => annotationPage.selectMultipleEvents());

        it("does not assign topic with selected events", () => {
          annotationPage.shouldNotAssignTopicWithSelectedEvent();
        });

        it("does not assign subtopic with selected event", () => {
          annotationPage.clickSubtopicOneTwoThree();
          annotationPage.shouldNotAssignSubtopicWithSelectedEvent();
        });
      });

      context('when an invalid event is selected', () => {
        beforeEach(() => {
          annotationPage.selectInvalidEvent();
          annotationPage.clickTopicOneButton();
        });

        it("does not assign topic with selected event", () => {
          annotationPage.shouldNotAssignTopicWithSelectedEvent();
        });

        it("does not assign subtopic with selected event", () => {
          annotationPage.clickSubtopicOneTwoThree();
          annotationPage.shouldNotAssignSubtopicWithSelectedEvent();
        });
      });
    });
  });
});

context('As an annotator user with a topic selected', () => {
  beforeEach(() => annotationPage.loginAnnotatorAndSelectTopic());

    it('displays the submit button as enabled', () => {
    annotationPage.clickCompleteAnnotation();
    annotationPage.shouldDisplaySubmitButtonAsEnabled();
  });

  it('saves and submits the event notes', () => {
    annotationPage.saveAndSubmitEventNotes();
  });

  context('when user completes annotation for all assigned batches', () => {
    beforeEach(() => {
      annotationPage.clickCompleteAnnotation();
      annotationPage.clickSubmitAnnotation();
    });

    it("lists an empty batch array", () => {
      annotationPage.shouldDisplayEmptyBatchArray();
    });
  });
});
