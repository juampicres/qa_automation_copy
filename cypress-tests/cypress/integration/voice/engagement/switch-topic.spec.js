/// <reference types="cypress" />
import Users from '../../../apis/users';
import Engagement from '../../../apis/engagement';
import * as homePage from '../../../page-objects/voice/home';
import * as engagement from '../../../page-objects/voice/ui-chunk/engagement';

describe('Switch topic:', () => {
  if (Cypress.env('environment') !== 'local') {
    beforeEach(() => {
      Users.loginUser();
      homePage.navigate();
      homePage.endCall();
      Engagement.startEngagement();
    });

    afterEach(() => {
      homePage.endCall();
    });

    it('User is able to switch topic several times in a row', () => {
      const addALine = require('../../../fixtures/voice/topics/add_a_line.json'),
        adjustBill = require('../../../fixtures/voice/topics/adjust_bill.json'),
        amountDue = require('../../../fixtures/voice/topics/amount_due.json');

      engagement.engagementShouldHaveStarted();
      engagement.switchTopic('Add a line');
      engagement.segmentShouldHaveRendered(addALine);
      engagement.switchTopic('Adjust Bill');
      engagement.segmentShouldHaveRendered(adjustBill);
      engagement.switchTopic('Amount Due- Device');
      engagement.segmentShouldHaveRendered(amountDue);
    });
  }
});