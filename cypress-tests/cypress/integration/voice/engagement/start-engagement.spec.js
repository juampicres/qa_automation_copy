/// <reference types="cypress" />
import Users from '../../../apis/users';
import Engagement from '../../../apis/engagement';
import * as homePage from '../../../page-objects/voice/home';
import * as engagement from '../../../page-objects/voice/ui-chunk/engagement';
const viewports = require('../../../fixtures/voice/viewports.json');

describe('Start an Engagement:', () => {
  context(
    'User sees Greeting segment being displayed',
    () => {
      if (Cypress.env('environment') !== 'local'){
        beforeEach(() => {
          Users.loginUser();
          homePage.navigate();
          homePage.endCall();
        });

        afterEach(() => {
          homePage.endCall();
        });

        Object.keys(viewports).forEach((viewport) => {
          it(`Viewport - ${viewport}`, viewports[viewport], function () {
            Engagement.startEngagement();
            engagement.engagementShouldHaveStarted();
          });
        });
      }
    }
  );
});
