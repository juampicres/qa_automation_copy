/// <reference types="cypress" />
const urlBatch = '/';
const urlTopic = '/managers/topics';
const urlObjections = '/managers/objections';
const urlEngagements = '/managers/engagements';
const urlUploaders = '/uploaders';
const batchName = 'Batch number 1';
const threshold = '80';
const topicName = 'topic 1';
const subtopicName = 'subtopic 1';
const editedName = 'edited topic 1';
const pageElements = {
  managerBatchesList: 'batches-list batch',
  managerCreateBatchButton: 'create-batch-button',
  topicsList: 'topics-list topic',
  createTopicButton: 'create-topic-button',
  createBatchModal: 'create-batch-modal',
  createTopicModal: 'create-topic-modal',
  topicSubmit: 'topic-submit',
  batchesListBatch: 'batches-list batch',
  topicsListTopicZero: 'topics-list topic-0',
  uploadedButton: 'uploaded-button',
  assignedButton: 'assigned-button',
  completedButton: 'completed-button',
  withFlagsButton: 'with-flags-button',
  withNotesButton: 'with-notes-button',
  allButton: 'all-button',
  typeSelect: 'type-select',
  managerApplyButtonFilter: 'manager-apply-button-filter',
  transcriptsTableRows: 'transcripts-table-rows',
  datetimepickerOneInput: 'datetimepicker1-input',
  datetimepickerTwoInput: 'datetimepicker2-input',
  rowsPerPage: 'rows-per-page',
  upload: 'upload',
  successAmount: 'success-amount',
  chats: 'chats',
  subtopicContent: '[class="subtopicContent"]',
  deleteConfirmButton: '[class="delete-btn"]',
  selectAllButton: '[class="floatRight selectBtnDiv"]',
  deleteAllButton: '[class="floatRight buttonDiv"]'
};

// ---------- GETTERS ----------

export function getManagerBatchesList() {
  return cy.fetch(pageElements.managerBatchesList);
}

export function getManagerCreateBatchButton() {
  return cy.fetch(pageElements.managerCreateBatchButton);
}

export function getTopicsList() {
  return cy.fetch(pageElements.topicsList);
}

export function getCreateTopicButton() {
  return cy.fetch(pageElements.createTopicButton);
}

export function getCreateBatchModal() {
  return cy.fetch(pageElements.createBatchModal);
}

export function getCreateTopicModal() {
  return cy.fetch(pageElements.createTopicModal);
}

export function getTopicSubmit() {
  return cy.fetch(pageElements.topicSubmit);
}

export function getBatchesListBatch() {
  return cy.fetch(pageElements.batchesListBatch);
}

export function getTopicsListTopicZero() {
  return cy.fetch(pageElements.topicsListTopicZero);
}

export function getUploadedButton() {
  return cy.fetch(pageElements.uploadedButton);
}

export function getAssignedButton() {
  return cy.fetch(pageElements.assignedButton);
}

export function getCompletedButton() {
  return cy.fetch(pageElements.completedButton);
}

export function getWithFlagsButton() {
  return cy.fetch(pageElements.withFlagsButton);
}

export function getWithNotesButton() {
  return cy.fetch(pageElements.withNotesButton);
}

export function getAllButton() {
  return cy.fetch(pageElements.allButton);
}

export function getTypeSelect() {
  return cy.fetch(pageElements.typeSelect);
}

export function getManagerApplyButtonFilter() {
  return cy.fetch(pageElements.managerApplyButtonFilter);
}

export function getTranscriptsTableRows() {
  return cy.fetch(pageElements.transcriptsTableRows);
}

export function getDatetimepickerOneInput() {
  return cy.fetch(pageElements.datetimepickerOneInput);
}

export function getDatetimepickerTwoInput() {
  return cy.fetch(pageElements.datetimepickerTwoInput);
}

export function getRowsPerPage() {
  return cy.fetch(pageElements.rowsPerPage);
}

export function getUpload() {
  return cy.fetch(pageElements.upload);
}

export function getSuccessAmount() {
  return cy.fetch(pageElements.successAmount);
}

export function getChats() {
  return cy.fetch(pageElements.chats);
}

export function getSubtopicContent() {
  return cy.get(pageElements.subtopicContent);
}

export function getDeleteConfirmButton() {
  return cy.get(pageElements.deleteConfirmButton);
}

export function getSelectAllButton() {
  return cy.get(pageElements.selectAllButton);
}

export function getDeleteAllButton() {
  return cy.get(pageElements.deleteAllButton);
}

// ---------- ACTIONS ----------

/**
 * Navigates user to batch creation page.
 * URL is defined on cypress.json file.
 */
export function navigateToBatchCreation() {
  cy.visit(`${urlBatch}`);
  getManagerBatchesList().should('not.exist'); // Check no batch is already present
  getManagerCreateBatchButton().click();
}

/**
 * Navigates user to Topics page.
 * URL is defined on cypress.json file.
 */
export function navigateToTopicCreation() {
  cy.visit(`${urlTopic}`);
  getTopicsList().should('not.exist');
  getCreateTopicButton().click();
}

/**
 * Navigates user to Engagements page.
 * URL is defined on cypress.json file.
 */
export function navigateToEngagements() {
  cy.visit(`${urlEngagements}`);
}

/**
 * Attempts to create a batch without specifying a type.
 */
export function cantCreateBatchModal() {
  getCreateBatchModal().tap(modal => {
    modal.fetch('batch-name-input').type(batchName);
    modal.fetch('batch-type-topic-checkbox').should('be.visible');
    modal.fetch('iaa-threshold-input').type(threshold);
    modal.fetch('gt-threshold-input').type(threshold);
    modal.fetch('continue-button-1').should('have.attr', 'disabled', 'disabled');
  });
}

/**
 * Creates a batch.
 */
export function createBatchModalPage() {
  getCreateBatchModal().tap(modal => {
    // page 1
    modal.fetch('batch-name-input').type(batchName);
    modal.fetch('batch-type-topic-checkbox').click();
    modal.fetch('annotation-threshold-slider').tap(slider => {
      slider.get('#threshold_slider_handle').click();
      slider.get('#threshold_slider_handle').type('{leftarrow}');
      slider.get('#threshold_slider_handle_val').should('contain', '1');
    });
    modal.fetch('iaa-threshold-input').type(threshold);
    modal.fetch('gt-threshold-input').type(threshold);
    modal.fetch('continue-button-1').click();

    // page 2
    modal.fetch('transcript-checkbox').first().click();
    modal.fetch('continue-button-2').click();

    // page 3
    modal.fetch('user-checkbox').first().click();
    modal.fetch('continue-button-3').click();
  });
}

/**
 * Creates a topic.
 */
export function createTopicPage() {
  getCreateTopicModal().tap(modal => {
    modal.fetch('topic-name-input').type(topicName);
    modal.fetch('topic-desc-input').type(topicName);
  });
  getTopicSubmit().click();
}


/**
 * Click topic ellipsis button.
 */
export function clickTopicEllipsisButton() {
  getTopicsListTopicZero().get('[class="menuGroupIcon relativeDiv inline-block"]').click();
}


/**
 * Click edit topic.
 */
export function clickEditTopic() {
  clickTopicEllipsisButton();
  cy.get('[class="text"]').contains('Edit Topic').click();
}

/**
 * Click delete topic.
 */
export function clickDeleteTopic() {
  clickTopicEllipsisButton();
  cy.get('[class="text"]').contains('Delete Topic').click();
}

/**
 * Click confirm delete button.
 */
export function clickConfirmDelete() {
  getDeleteConfirmButton().click();
}

/**
 * Edits a topic.
 */
export function editTopic() {
  clickEditTopic();
  getCreateTopicModal().tap(modal => {
    modal.fetch('topic-name-input').clear().type(editedName);
    modal.fetch('topic-desc-input').clear().type(editedName);
  });
  getTopicSubmit().click();
}

/**
 * Deletes a specific topic.
 */
export function deleteTopic() {
  clickDeleteTopic();
  clickConfirmDelete();
}

/**
 * Click select all button.
 */
export function clickSelectAllButton() {
  getSelectAllButton().click();
}

/**
 * Click delete all button.
 */
export function clickDeleteAllButton() {
  getDeleteAllButton().click();
}

/**
 * Deletes all topics from list.
 */
export function deleteAllTopics() {
  clickSelectAllButton();
  clickDeleteAllButton();
  clickConfirmDelete();
}

/**
 * Creates a topic with a subtopic.
 */
export function createTopicAndSubTopicPage() {
  getCreateTopicModal().tap(modal => {
    modal.fetch('topic-name-input').type(topicName);
    modal.fetch('topic-desc-input').type(topicName);
    modal.get('[id="subtopicname0"]').type(subtopicName);
    modal.get('[id="subtopicdesc0"]').type(subtopicName);
  });
  getTopicSubmit().click();
}

/**
 * Manually attempts to login as an Manager user.
 */
export function loginManagerUser() {
  cy.create('manager_user').login();
}

/**
 * Set initial records in the DB.
 */
export function createInitialRecordsDB() {
  cy.create('engagement')
    .then(({ body: user }) =>
      cy.createList('event', 3, { engagement_id: user.id })
    );
}

/**
 * Creates Uploaded engagement.
 */
export function createUploadedEngagement(createdAt) {
  cy.create('engagement', { engagement_type: 'voice', created_at: createdAt })
    .then(({ body: engagement }) =>
      cy.createList('event', 3, { engagement_id: engagement.id })
    );
  console.log(createdAt);
}

/**
 * Creates Incomplete batch.
 */
export function createIncompleteAssigned() {
  cy.create('batch_annotator');
}

/**
 * Creates Completed batch.
 */
export function createCompleteBatchEngagement() {
  cy.create('batches_engagement', 'completed_batch');
}

/**
 * Creates two assigned engagements, one flagged and the other with events flagged
 */
export function createTwoAssignedEngagement() {
  cy.create('engagement', 'engagement_with_flagged_events');
}

/**
 * Creating Notes engagements.
 */
export function createNotesEngagement() {
  cy.create('engagement', 'engagement_with_notes_events');
}

/**
 * Checks the correct count of transcripts for each tab.
 */
export function correctCountTranscriptsEachTab() {
  getUploadedButton().find('span').should('have.class', 'count').contains(1);
  getAssignedButton().find('span').should('have.class', 'count').contains(2);
  getCompletedButton().find('span').should('have.class', 'count').contains(1);
  getWithFlagsButton().find('span').should('have.class', 'count').contains(1);
  getWithNotesButton().find('span').should('have.class', 'count').contains(1);
  getAllButton().find('span').should('have.class', 'count').contains(4);
}

/**
 * Filter by engagement type and only see one engagement.
 */
export function filterOneEngagementVoice() {
  getAllButton().click();
  getTypeSelect().select('Voice');
  getManagerApplyButtonFilter().click();
  getTranscriptsTableRows().children().should('have.length', 1);
}

/**
 * Filter by engagement type and only see three engagements.
 */
export function filterThreeEngagement() {
  getAllButton().click();
  getTypeSelect().select('Text');
  getManagerApplyButtonFilter().click();
  getTranscriptsTableRows().children().should('have.length', 3);
}

/**
 * Filter from one date forward.
 */
export function filterOneDate(engagementFrom) {
  getAllButton().click();
  getDatetimepickerOneInput().type(engagementFrom);
  getManagerApplyButtonFilter().click();
  getTranscriptsTableRows().children().should('have.length', 4);
}

/**
 * Filters by engagement type by a specific date.
 */
export function filterSpecificDate(engagementFrom, createdAt) {
  getAllButton().click();
  getDatetimepickerOneInput().type(engagementFrom);
  getDatetimepickerTwoInput().type(createdAt);
  getManagerApplyButtonFilter().click();
  getTranscriptsTableRows().children().should('have.length', 1);
}

/**
 * Attempts to filter by a wrong date.
 */
export function filterWrongDate() {
  getAllButton().click();
  getDatetimepickerOneInput().type('1900/11/29');
  getDatetimepickerTwoInput().type('1900/11/29');
  getManagerApplyButtonFilter().click();
  getTranscriptsTableRows().should('not.exist');
}

/**
 * Create a total of 153 engagements uploaded.
 */
export function uploadedSpecificEngagements(createdAt) {
  cy.createList('engagement', 153, { engagement_type: 'voice', created_at: createdAt });
}

/**
 * Displays the correct count of transcripts for Uploaded tab.
 */
export function correctCountTranscriptsUploadedTab() {
  getUploadedButton().find('span').should('have.class', 'count').contains(153);
}

/**
 * Displays 10 rows by default.
 */
export function displayTenRowsByDefault() {
  getTranscriptsTableRows().children().should('have.length', 10);
}

/**
 * Displays 50 rows by default.
 */
export function displayFiftyRowsByDefault() {
  getRowsPerPage().select('50');
  getTranscriptsTableRows().children().should('have.length', 50);
}

/**
 * Displays 100 rows by default.
 */
export function displayOneHundredRowsByDefault() {
  getRowsPerPage().select('100');
  getTranscriptsTableRows().children().should('have.length', 100);
}

/**
 * Create event type.
 */
export function createEventType() {
  cy.create('event_type', { name: 'visitor_message'});
}

/**
 * Manually attempts to login as an Manager Uploader user.
 */
export function loginManagerUserUploader() {
  cy.create('manager_user', 'uploader').login();
}

/**
 * Navigates user to Uploaders page.
 * URL is defined on cypress.json file.
 */
export function navigateToUploaders() {
  cy.visit(`${urlUploaders}`);
}

/**
 * Correctly uploads a single file.
 */
export function uploadsSuccesfullySingleFile() {
  cy.uploadFiles('input[type=file]', ['uploadfile.csv']);
  getUpload().click();
  getSuccessAmount().should('contain', 'Success : 2');
  getSuccessAmount().should('contain', 'Failed : 0');
}

/**
 * Correctly uploads a single file tables rows.
 */
export function uploadsSuccesfullySingleFileTablesRows() {
  getTranscriptsTableRows().find('tr').should('have.length', 2);
  getTranscriptsTableRows()
    .contains('675382261333042')
    .siblings()
    .and('contain', 'UPLOADED')
    .and('contain', 'text');

  getTranscriptsTableRows()
    .contains('104039601103157')
    .siblings()
    .and('contain', 'UPLOADED')
    .and('contain', 'text');

  getTranscriptsTableRows()
    .contains('675382261333042')
    .siblings()
    .find('[data-testing="view-transcript"]')
    .click();
  getChats().get('.row-content').eq(0)
    .should('contain', 'Where there\'s life there\'s hope.');

  getChats().get('.row-content').eq(1)
    .should('contain', '\'You have nice manners for a thief and a liar,\' said the dragon.');

  getChats().get('.row-content').eq(2)
    .should('contain', 'May the hair on your toes never fall out!');
}

/**
 * Uploads a single invalid file.
 */
export function uploadsInvalidSingleFile() {
  cy.uploadFiles('input[type=file]', ['invalid.csv']);
  getUpload().click();
  getSuccessAmount().should('contain', 'Success : 0');
  getSuccessAmount().should('contain', 'Failed : 1');
}

// ---------- ASSERTIONS ----------

/**
 * Verifies created batch.
 */
export function checkCreateBatchModal() {
  cy.location('pathname').should('eq', '/');
  getBatchesListBatch()
    .should('be.visible')
    .and('have.length', 1)
    .first()
    .tap(batch => {
      batch.fetch('name').should('contain', batchName);
      batch.fetch('iaa-threshold').should('contain', threshold);
      batch.fetch('gt-threshold').should('contain', threshold);
      batch.fetch('annotation-threshold').should('contain', '1');
      batch.fetch('completion').should('contain', '0/1');
    });
}

/**
 * Verifies 0 transcripts exist.
 */
export function shouldContainZeroTranscripts() {
  getTranscriptsTableRows()
    .should('contain', '0 Transcripts');
}

/**
 * Verifies topic was created.
 */
export function checkCreateTopic() {
  cy.location('pathname').should('eq', '/managers/topics');
  getTopicsListTopicZero()
    .should('be.visible')
    .and('have.length', 1)
    .first()
    .tap(topic => {
      topic.fetch('name').should('contain', topicName);
    });
}

/**
 * Verifies topic can be edited.
 */
export function checkIfTopicHasBeenEdited() {
  cy.location('pathname').should('eq', '/managers/topics');
  getTopicsListTopicZero()
    .should('be.visible')
    .and('have.length', 1)
    .first()
    .tap(topic => {
      topic.fetch('name').should('contain', editedName);
    });
}

/**
 * Verifies created subtopic.
 */
export function checkCreateSubTopic() {
  cy.location('pathname').should('eq', '/managers/topics');
  getTopicsListTopicZero().get('[class="triangle"]').click();
  getSubtopicContent().contains(subtopicName);
}

/**
 * Verifies the transcripts tab to be visible.
 */
export function transcriptsTab() {
  getUploadedButton().should('be.visible');
  getAssignedButton().should('be.visible');
  getCompletedButton().should('be.visible');
  getWithFlagsButton().should('be.visible');
  getWithNotesButton().should('be.visible');
  getAllButton().should('be.visible');
}

/**
 * Verifies topics list is empty.
 */
export function checkTopicsListIsEmpty() {
  getTopicsList().should('not.exist');
}
