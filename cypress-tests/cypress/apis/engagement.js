import ApiClient from './api-client';

const BASE_URL = 'api/v1',
  ENGAGE = 'test_engage_webhook';

const generateEngagementId = () => {
  return Math.random().toString(36).substring(7);
};

class Engagement extends ApiClient {

  startEngagement(){
    // Both AGENT_VOICE_ID and CSRF-TOKEN is generated in users.js - loginUser();
    cy.get('@CSRF-TOKEN').then(csrfToken =>{
      cy.get('@AGENT_VOICE_ID').then(voiceId => {
        const options = {
            cyParams: {
              headers: {'X-CSRF-Token': csrfToken},
            }
          },
          body = {
            id: '1',
            engagement_external_id: generateEngagementId(),
            agent_external_voice_id: voiceId,
            agent_external_chat_id: null,
            type: 'engagement_start',
            sender: 'system',
            client: 'testing',
            location: 'infinity',
            business_unit: 'indirect_sales',
            visitor_name: null,
            vendor: 'sykes_clearlink',
            agent_name: null,
            content: 'System Message',
            sent_at: 'Thu, 7 Nov 2019 00:00:00 +0000',
            created_at: 'Thu, 7 Nov 2019 00:00:00 +0000',
            payload: {},
          };
        this.post(`${BASE_URL}/${ENGAGE}`, body, options);
      });
    });
  }
}

export default new Engagement();
