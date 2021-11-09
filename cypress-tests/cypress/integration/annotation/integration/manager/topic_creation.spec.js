/// <reference types="cypress" />
import * as batchCreationPage from '../../../../page-objects/annotation/batch-creation';

context('As a Manager user', () => {
  // Set initial records in the DB and login user
  beforeEach(() => {
    batchCreationPage.loginManagerUser();
    batchCreationPage.navigateToTopicCreation();
  });

  it('can create a topic', () => {
    batchCreationPage.createTopicPage();
    batchCreationPage.checkCreateTopic();
  });

  it('can create a topic with a subtopic', () => {
    batchCreationPage.createTopicAndSubTopicPage();
    batchCreationPage.checkCreateSubTopic();
  });

  it('can edit a topic', () => {
    batchCreationPage.createTopicPage();
    batchCreationPage.editTopic();
    batchCreationPage.checkIfTopicHasBeenEdited();
  });

  it('can delete a topic', () => {
    batchCreationPage.createTopicPage();
    batchCreationPage.deleteTopic();
    batchCreationPage.checkTopicsListIsEmpty();
  });

  it('can delete all topics', () => {
    batchCreationPage.createTopicPage();
    batchCreationPage.deleteAllTopics();
    batchCreationPage.checkTopicsListIsEmpty();
  });
});
