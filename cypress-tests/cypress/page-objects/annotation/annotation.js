/// <reference types="cypress" />
const url = '/';
const CHARS = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
const randomName = size => [...Array(size)].map(() => CHARS.charAt(Math.floor(Math.random() * CHARS.length))).join('');

const randomUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const pageElements = {
  shepherdCancelIcon: '.shepherd-cancel-icon',
  availableTranscripts: 'available-transcripts',
  batchSelectOption: 'batch-select-option',
  newSidebarLabelButtonTopicOne: 'new-sidebar-annotation-labels-button-topic1',
  newSidebarLabelButtonObjectionOne: 'new-sidebar-annotation-labels-button-objection1',
  newSidebarLabelButtonActionOne: 'new-sidebar-annotation-labels-button-action1',
  newSidebarLabelButtonWorkflowOne: 'new-sidebar-annotation-labels-button-workflow1',
  newSidebarLabelListItem: 'new-sidebar-labels-list-item',
  newSidebarTopicLabelTypeFilterButton: 'new-sidebar-topics-label-type-filter-button',
  newSidebarObjectionLabelTypeFilterButton: 'new-sidebar-objections-label-type-filter-button',
  newSidebarWorkflowLabelTypeFilterButton: 'new-sidebar-workflows-label-type-filter-button',
  newSidebarActionsLabelTypeFilterButton: 'new-sidebar-actions-label-type-filter-button',
  batchSelect: 'batch-select',
  eventsListEvent: 'events-list event',
  submitValidationMessage: 'submit-validation-message',
  submitAnnotation: 'submit-annotation',
  timeTaken: 'time-taken',
  pauseClock: 'pause-clock',
  eventsList: 'events-list',
  playClock: 'play-clock',
  eventSelectBoxVisitorMessage: 'event-select-box-visitor_message',
  eventsListEventTopicLabel: 'events-list event topic_label',
  labelsBeingUsedButtonForTopicOne: 'labels-being-used-button-for-topic1',
  newSidebarAnnotationLabelsButtonSubtopicOneTwoThree: 'new-sidebar-annotation-labels-button-subtopic123',
  eventsListEventSubtopicLabel: 'events-list event subtopic_label',
  labelsBeingUsedButtonForSubtopicOneTwoThree: 'labels-being-used-button-for-subtopic123',
  labelsBeingUsedButtonForSubtopicFourFiveSix: 'labels-being-used-button-for-subtopic456',
  newSidebarAnnotationLabelsButtonSubtopicFourFiveSix: 'new-sidebar-annotation-labels-button-subtopic456',
  eventSelectBoxAgentMessage: 'event-select-box-agent_message',
  eventsListEventObjectionLabelZero: 'events-list event objection_label-0',
  labelsBeingUsedButtonForObjectionOne: 'labels-being-used-button-for-objection1',
  eventsListEventActionLabel: 'events-list event action_label',
  labelsBeingUsedButtonForActionOne: 'labels-being-used-button-for-action1',
  eventsListEventWorkflowLabel: 'events-list event workflow_label',
  labelsBeingUsedButtonForWorkflowOne: 'labels-being-used-button-for-workflow1',
  completeAnnotation: 'complete-annotation',
  userName: 'user-name',
  userLogout: 'user-logout',
  eventNotes: 'event-notes',
  notesPresentIndicator: 'notes-present-indicator',
  noNotesPresentIndicator: 'no-notes-present-indicator',
  eventNoteContent: 'event-note-content'
};

// ---------- GETTERS ----------

export function getShepherdCancelIcon() {
  return cy.get(pageElements.shepherdCancelIcon);
}

export function getAvailableTranscripts() {
  return cy.fetch(pageElements.availableTranscripts);
}

export function getBatchSelectOption() {
  return cy.fetch(pageElements.batchSelectOption);
}

export function getNewSidebarLabelButtonTopicOne() {
  return cy.fetch(pageElements.newSidebarLabelButtonTopicOne);
}

export function getNewSidebarLabelButtonObjectionOne() {
  return cy.fetch(pageElements.newSidebarLabelButtonObjectionOne);
}

export function getNewSidebarLabelButtonActionOne() {
  return cy.fetch(pageElements.newSidebarLabelButtonActionOne);
}

export function getNewSidebarLabelButtonWorkflowOne() {
  return cy.fetch(pageElements.newSidebarLabelButtonWorkflowOne);
}

export function getNewSidebarLabelListItem() {
  return cy.fetch(pageElements.newSidebarLabelListItem);
}

export function getNewSidebarTopicLabelTypeFilterButton() {
  return cy.fetch(pageElements.newSidebarTopicLabelTypeFilterButton);
}

export function getNewSidebarObjectionLabelTypeFilterButton() {
  return cy.fetch(pageElements.newSidebarObjectionLabelTypeFilterButton);
}

export function getNewSidebarWorkflowLabelTypeFilterButton() {
  return cy.fetch(pageElements.newSidebarWorkflowLabelTypeFilterButton);
}

export function getNewSidebarActionsLabelTypeFilterButton() {
  return cy.fetch(pageElements.newSidebarActionsLabelTypeFilterButton);
}

export function getBatchSelect() {
  return cy.fetch(pageElements.batchSelect);
}

export function getEventsListEvent() {
  return cy.fetch(pageElements.eventsListEvent);
}

export function getSubmitValidationMessage() {
  return cy.fetch(pageElements.submitValidationMessage);
}

export function getSubmitAnnotation() {
  return cy.fetch(pageElements.submitAnnotation);
}

export function getTimeTaken() {
  return cy.fetch(pageElements.timeTaken);
}

export function getPauseClock() {
  return cy.fetch(pageElements.pauseClock);
}

export function getEventsList() {
  return cy.fetch(pageElements.eventsList);
}

export function getPlayClock() {
  return cy.fetch(pageElements.playClock);
}

export function getEventSelectBoxVisitorMessage() {
  return cy.fetch(pageElements.eventSelectBoxVisitorMessage);
}

export function getEventsListEventTopicLabel() {
  return cy.fetch(pageElements.eventsListEventTopicLabel);
}

export function getLabelsBeingUsedButtonForTopicOne() {
  return cy.fetch(pageElements.labelsBeingUsedButtonForTopicOne);
}

export function getNewSidebarAnnotationLabelsButtonSubtopicOneTwoThree() {
  return cy.fetch(pageElements.newSidebarAnnotationLabelsButtonSubtopicOneTwoThree);
}

export function getEventsListEventSubtopicLabel() {
  return cy.fetch(pageElements.eventsListEventSubtopicLabel);
}

export function getLabelsBeingUsedButtonForSubtopicOneTwoThree() {
  return cy.fetch(pageElements.labelsBeingUsedButtonForSubtopicOneTwoThree);
}

export function getLabelsBeingUsedButtonForSubtopicFourFiveSix() {
  return cy.fetch(pageElements.labelsBeingUsedButtonForSubtopicFourFiveSix);
}

export function getNewSidebarAnnotationLabelsButtonSubtopicFourFiveSix() {
  return cy.fetch(pageElements.newSidebarAnnotationLabelsButtonSubtopicFourFiveSix);
}

export function getEventSelectBoxAgentMessage() {
  return cy.fetch(pageElements.eventSelectBoxAgentMessage);
}

export function getEventsListEventObjectionLabelZero() {
  return cy.fetch(pageElements.eventsListEventObjectionLabelZero);
}

export function getLabelsBeingUsedButtonForObjectionOne() {
  return cy.fetch(pageElements.labelsBeingUsedButtonForObjectionOne);
}

export function getEventsListEventActionLabel() {
  return cy.fetch(pageElements.eventsListEventActionLabel);
}

export function getLabelsBeingUsedButtonForActionOne() {
  return cy.fetch(pageElements.labelsBeingUsedButtonForActionOne);
}

export function getEventsListEventWorkflowLabel() {
  return cy.fetch(pageElements.eventsListEventWorkflowLabel);
}

export function getLabelsBeingUsedButtonForWorkflowOne() {
  return cy.fetch(pageElements.labelsBeingUsedButtonForWorkflowOne);
}

export function getCompleteAnnotation() {
  return cy.fetch(pageElements.completeAnnotation);
}

export function getUserName() {
  return cy.fetch(pageElements.userName);
}

export function getUserLogout() {
  return cy.fetch(pageElements.userLogout);
}

export function getEventNotes() {
  return cy.fetch(pageElements.eventNotes);
}

export function getNotesPresentIndicator() {
  return cy.fetch(pageElements.notesPresentIndicator);
}

export function getNoNotesPresentIndicator() {
  return cy.fetch(pageElements.noNotesPresentIndicator);
}

export function getEventNoteContent() {
  return cy.fetch(pageElements.eventNoteContent);
}

// ---------- ACTIONS ----------

/**
 * Navigates user to annotation page.
 * URL is defined on cypress.json file.
 */
export function navigateToAnnotation() {
  cy.visit(`${url}`);
}

/**
 * Sets viewport to 1366 x 900.
 */
export function setViewport() {
  cy.viewport(1366, 900);
}

/**
 * Create a new Project for each test. Required to set the flag `new_right_bar`.
 */
export function createNewProjectForEachTest() {
  const PROJECT = randomName(10);
  cy.create('project', { name: PROJECT, new_right_bar: true, tenant_url: PROJECT, tenant_name: PROJECT, project_uuid: randomUUID() }).as('defaultProject');
}

/**
 * Set initial records in the DB and login annotator user.
 */
export function setInitialRecordsAndLogin() {
  cy.create('topic_with_subtopics');
  cy.create('annotator_user', 'with_default_project').login();
  cy.create('annotator_batch');
}

/**
 * Clicks on Shepherd cancel icon.
 */
export function clickShepherdCancelIcon() {
  getShepherdCancelIcon().click();
  cy.wait(2000); // To overcome behaviour caused by eventNote.vue scheduleSaving() method
}

/**
 * Clicks on topic filter button.
 */
export function clickTopicFilterButton() {
  getNewSidebarTopicLabelTypeFilterButton().click();
}

/**
 * Clicks on objection filter button.
 */
export function clickObjectionFilterButton() {
  getNewSidebarObjectionLabelTypeFilterButton().click();
}

/**
 * Clicks on action filter button.
 */
export function clickActionFilterButton() {
  getNewSidebarActionsLabelTypeFilterButton().click();
}

/**
 * Clicks on workflow filter button.
 */
export function clickWorkflowFilterButton() {
  getNewSidebarWorkflowLabelTypeFilterButton().click();
}

/**
 * Selects a batch from the dropdown menu.
 */
export function selectBatch() {
  getBatchSelect().select('batch1');
}

/**
 * Selects the first single event.
 */
export function selectSingleEvent() {
  getEventSelectBoxVisitorMessage().first().check({ force: true });
}

/**
 * Unchecks teh first single event.
 */
export function uncheckSingleEvent() {
  getEventSelectBoxVisitorMessage().first().uncheck({ force: true });
}

/**
 * Selects the first invalid event.
 */
export function selectInvalidEvent() {
  getEventSelectBoxAgentMessage().first().check({ force: true });
}

/**
 * Clicks on topic 1 label.
 */
export function clickTopicOneButton() {
  getNewSidebarLabelButtonTopicOne().contains('topic1').click();
}

/**
 * Clicks on subtopic 123 label.
 */
export function clickSubtopicOneTwoThree() {
  getNewSidebarAnnotationLabelsButtonSubtopicOneTwoThree().contains('topic1 / subtopic123').click();
}

/**
 * Clicks on subtopic 456 label.
 */
export function clickSubtopicFourFiveSix() {
  getNewSidebarAnnotationLabelsButtonSubtopicFourFiveSix().contains('topic1 / subtopic456').click();
}

/**
 * Clicks on objection 1 label.
 */
export function clickObjectionOneButton() {
  getNewSidebarLabelButtonObjectionOne().contains('objection1').click();
}

/**
 * Clicks on action 1 label.
 */
export function clickActionOneButton() {
  getNewSidebarLabelButtonActionOne().contains('action1').click();
}

/**
 * Clicks on workflow 1 label.
 */
export function clickWorkflowOneButton() {
  getNewSidebarLabelButtonWorkflowOne().contains('workflow1').click();
}

/**
 * Selects multiple events.
 */
export function selectMultipleEvents() {
  getEventSelectBoxVisitorMessage().first().check({ force: true });
  getEventSelectBoxVisitorMessage().eq(1).check({ force: true });
  clickTopicOneButton();
}

/**
 * Logs in as an annotator user and selects a topic.
 */
export function loginAnnotatorAndSelectTopic() {
  cy.create('annotator_user', 'with_default_project').login();
  cy.create('annotator_batch');
  cy.create('topic_with_subtopics');
  navigateToAnnotation();
  selectBatch();
  selectSingleEvent();
  clickTopicOneButton();
}

/**
 * Clicks on complete annotation button.
 */
export function clickCompleteAnnotation() {
  getCompleteAnnotation().click();
  cy.wait(2000); // To overcome behaviour caused by eventNote.vue scheduleSaving() method
}

/**
 * Clicks on submit annotation button.
 */
export function clickSubmitAnnotation() {
  getSubmitAnnotation().click();
  cy.wait(2000); // To overcome behaviour caused by eventNote.vue scheduleSaving() method
}

/**
 * Creates and submits an event note.
 */
export function saveAndSubmitEventNotes() {
  getEventNotes().first().click();
  getNoNotesPresentIndicator();
  getEventNoteContent().first().type('event_notes');
  clickCompleteAnnotation();
  getNotesPresentIndicator();
  clickSubmitAnnotation();
}

/**
 * Uses pause and play button to check transcript list re-appears.
 */
export function clickPlayAndPauseToCheckTranscriptListReAppears() {
  cy.wait(1000); // wait 1 second
  getTimeTaken().should('contain', '1 Sec');
  getPauseClock().click();
  cy.wait(5000); // wait 5 seconds
  getTimeTaken().should('contain', '1 Sec');
  getEventsList().should('not.exist');
  cy.get('.annotateScreenBlur').should('exist');
  getPlayClock().click();
  getEventsList().should('have.length', 1);
}

// ---------- ASSERTIONS ----------

/**
 * Verifies available transcripts count is displayed.
 */
export function shouldDisplayAvailableTranscriptsCount() {
  cy.location('pathname').should('eq', '/');
  getAvailableTranscripts().should('contain', '1');
}

/**
 * Verifies assigned batches are listed.
 */
export function shouldListAssignedBatches() {
  getBatchSelectOption().should('be.visible').and('have.length', 1);
}

/**
 * Verifies available topics are displayed.
 */
export function shouldDisplayAvailableTopics() {
  getNewSidebarLabelButtonTopicOne().contains('topic1');
}

/**
 * Verifies available objection1 is displayed.
 */
export function shouldDisplayAvailableObjections() {
  getNewSidebarLabelButtonObjectionOne().contains('objection1');
}

/**
 * Verifies all available objections labels are displayed.
 */
export function shouldDisplayAvailableLabelObjections() {
  getLabelsBeingUsedButtonForObjectionOne().contains('objection1');
}

/**
 * Verifies available actions are displayed.
 */
export function shouldDisplayAvailableActions() {
  getNewSidebarLabelButtonActionOne().contains('action1');
}

/**
 * Verifies available workflow are displayed.
 */
export function shouldDisplayAvailableWorkflow() {
  getNewSidebarLabelButtonWorkflowOne().contains('workflow1');
}

/**
 * Verifies all labels are displayed.
 */
export function shouldListAllAvailableLabels() {
  getNewSidebarLabelListItem().should('have.length', 7);
}

/**
 * Verifies user can filter by topic label.
 */
export function shouldFilterByTopicLabel() {
  getNewSidebarLabelListItem().should('have.length', 3);
  getNewSidebarLabelButtonTopicOne().contains('topic1');
}

/**
 * Verifies user can filter by objection label.
 */
export function shouldFilterByObjectionLabel() {
  getNewSidebarLabelListItem().should('have.length', 2);
  getNewSidebarLabelButtonObjectionOne().contains('objection1');
}

/**
 * Verifies user can filter by action label.
 */
export function shouldFilterByActionLabel() {
  getNewSidebarLabelListItem().should('have.length', 1);
  getNewSidebarLabelButtonActionOne().contains('action1');
}

/**
 * Verifies user can filter by workflow label.
 */
export function shouldFilterByWorkflowLabel() {
  getNewSidebarLabelListItem().should('have.length', 1);
  getNewSidebarLabelButtonWorkflowOne().contains('workflow1');
}

/**
 * Verifies pulled transcript events are displayed.
 */
export function shouldDisplayPulledTranscriptEvents() {
  getEventsListEvent()
    .should('have.length', 5)
    .fetch('type')
    .first()
    .should('have.length', 1)
    .its('text')
    .should('match', /[VAS]?/);
}

/**
 * Verifies topic is assigned to selected event.
 */
export function shouldAssignTopicToSelectedEvent() {
  getEventsListEventTopicLabel().contains('topic1');
}

/**
 * Verifies list of topics being used are displayed.
 */
export function shouldDisplayListTopicsBeingUsed() {
  getLabelsBeingUsedButtonForTopicOne().contains('topic1');
}

/**
 * Verifies submit validation message is not displayed.
 */
export function shouldNotDisplaySubmitValidationMessage() {
  getSubmitValidationMessage().should('not.exist');
}

/**
 * Verifies subtopic label is assigned to the selected event.
 */
export function shouldAssignsSubtopicSelectedEvent() {
  getEventsListEventSubtopicLabel().should('have.length', 1);
}

/**
 * Verifies list of subtopics 123 are displayed.
 */
export function shouldDisplayListSubtopicBeingUsedOneTwoThree() {
  getNewSidebarAnnotationLabelsButtonSubtopicOneTwoThree().contains('topic1 / subtopic123').should('have.length', 1);
}

/**
 * Verifies all subtopics are assigned to the selected event.
 */
export function shouldAssignsAllSubtopicSelectedEvent() {
  getEventsListEventSubtopicLabel().should('have.length', 2);
}

/**
 * Verifies list of subtopics 456 are displayed.
 */
export function shouldDisplayListSubtopicBeingUsedFourFiveSix() {
  getNewSidebarAnnotationLabelsButtonSubtopicFourFiveSix().contains('topic1 / subtopic456').should('have.length', 1);
}

/**
 * Verifies topic is not assigned to selected event when multiple events are selected.
 */
export function shouldNotAssignTopicWithSelectedEvent() {
  getEventsListEventTopicLabel().should('not.exist');
}

/**
 * Verifies subtopic is not assigned to selected event when multiple events are selected.
 */
export function shouldNotAssignSubtopicWithSelectedEvent() {
  getEventsListEventSubtopicLabel().should('not.exist');
}

/**
 * Verifies submit button is enabled.
 */
export function shouldDisplaySubmitButtonAsEnabled() {
  getSubmitAnnotation().should('not.have.attr', 'disabled', 'disabled');
}

/**
 * Verifies submit button is disabled.
 */
export function shouldDisplaySubmitButtonAsDisabled() {
  getSubmitAnnotation().should('have.attr', 'disabled', 'disabled');
}

/**
 * Verifies an empty batch array is displayed after a user completed annotation for all assigned batches.
 */
export function shouldDisplayEmptyBatchArray() {
  getBatchSelectOption().should('have.length', 0);
}

/**
 * Verifies objection is assigned to selected event.
 */
export function shouldAssignObjectionWithSelectedEvent() {
  getEventsListEventObjectionLabelZero().first().should('contain', 'objection1');
}

/**
 * Verifies objection is not assigned to selected event.
 */
export function shouldANotAssignObjectionWithSelectedEvent() {
  getEventsListEventObjectionLabelZero().should('not.exist');
}

/**
 * Verifies action is assigned to selected event.
 */
export function shouldAssignActionWithSelectedEvent() {
  getEventsListEventActionLabel().first().should('contain', 'action1');
}

/**
 * Verifies action is not assigned to selected event.
 */
export function shouldANotAssignActionWithSelectedEvent() {
  getEventsListEventActionLabel().should('not.exist');
}

/**
 * Verifies workflow is assigned to selected event.
 */
export function shouldAssignWorkflowWithSelectedEvent() {
  getEventsListEventWorkflowLabel().first().should('contain', 'workflow1');
}


/**
 * Verifies workflow labels is assigned to selected event.
 */
export function shouldAssignWorkflowLabelWithSelectedEvent() {
  getLabelsBeingUsedButtonForWorkflowOne().first().should('contain', 'workflow1');
}

/**
 * Verifies action is not assigned to selected event.
 */
export function shouldANotAssignWorkflowWithSelectedEvent() {
  getEventsListEventWorkflowLabel().should('not.exist');
}

/**
 * Verifies the submit validation message is displayed.
 */
export function shouldDisplayValidationMessage() {
  getSubmitValidationMessage().should('contain', 'Please assign at least one label before submitting');
}
