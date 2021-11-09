/// <reference types="cypress" />

beforeEach(() => cy.viewport(1366, 900));

context('As an annotator user', () => {
  // Set initial records in the DB and login user
  beforeEach(() => {
    cy.create('topic_with_subtopics');
    cy.create('annotator_user').login();
    cy.create('annotator_batch');
  });

  // Set starting point for the scenario
  beforeEach(() => cy.visit('/'));

  it('displays the available transcripts count', () => {
    cy.location('pathname').should('eq', '/');
    cy.fetch('available-transcripts').should('contain', '1');
  });

  it('lists assigned batches', () => {
    cy.fetch('batch-select-option')
      .should('be.visible')
      .and('have.length', 1);
  });

  it('displays available topics', () => {
    cy.fetch('topic-select-list').click();
    cy.fetch('topics-list topic-row')
      .should('be.visible')
      .and('have.length', 1)
      .first()
      .tap(event => {
        event.fetch('topic-name').should('contain', 'topic1');
      });
  });

  context('when the user selects a batch', () => {
    it('displays the pulled transcript events', () => {
      cy.fetch('batch-select').select('batch1');
      cy.fetch('events-list event')
        .should('be.visible')
        .and('have.length', 5)
        .fetch('type')
        .first()
        .should('have.length', 1)
        .invoke('text')
        .should('match', /[VAS]?/);
    });

    context('when annotating topic labels', () => {
      beforeEach(() => {
        cy.fetch('topic-select-list').click();
        cy.fetch('batch-select').select('batch1');
      });

      context('when a single event selected', () => {
        beforeEach(() => {
          cy.fetch('event-select-box-visitor_message').first().check({force: true});
          cy.fetch('topics-list topic-row').click();
        });

        it('assigns topic with selected event', () => {
          cy.fetch('events-list event topic_label')
            .first()
            .should('contain', 'topic1');
        });
        context('when selecting subtopic', () => {
          beforeEach(() => {
            cy.fetch('subtopics-list subtopic-row').first().click();
          });

          it('assigns subtopic with selected event', () => {
            cy.fetch('events-list event subtopic_label').should('have.length', 1);
          });
        });

        context('when selecting multiple subtopics', () => {
          beforeEach(() => {
            cy.fetch('subtopics-list subtopic-row').click({multiple: true});
          });

          it('assigns all subtopics with selected event', () => {
            cy.fetch('events-list event subtopic_label').should('have.length', 2);
          });
        });
      });

      context('when multiple events are selected', () => {
        beforeEach(() => {
          cy.fetch('event-select-box-visitor_message').first().check({ force: true });
          cy.fetch('event-select-box-visitor_message').eq(1).check({ force: true });
          cy.fetch('topics-list topic-row').click();
          cy.fetch('subtopic-drop').click();
          cy.fetch('subtopics-list subtopic-row').first().click({ force: true });
        });

        it('does not assign topic with selected events', () => {
          cy.fetch('events-list event topic_label').should('not.exist');
        });

        it('does not assign subtopic with selected event', () => {
          cy.fetch('events-list event subtopic_label').should('not.exist');
        });
      });

      context('when an invalid event is selected', () => {
        beforeEach(() => {
          cy.fetch('event-select-box-agent_message').first().check({force: true});
          cy.fetch('topics-list topic-row').click();
          cy.fetch('subtopic-drop').click();
          cy.fetch('subtopics-list subtopic-row').first().click();
        });

        it('does not assign topic with selected event', () => {
          cy.fetch('events-list event topic_label').should('not.exist');
        });

        it('does not assign subtopic with selected event', () => {
          cy.fetch('events-list event subtopic_label').should('not.exist');
        });
      });
    });

    context('when annotating objection labels', () => {
      beforeEach(() => {
        cy.fetch('objection-select-list').click();
        cy.fetch('batch-select').select('batch1');
      });

      context('when a valid event is selected', () => {
        beforeEach(() => {
          cy.fetch('event-select-box-agent_message').first().check({force: true});
          cy.fetch('objections-list objection-row-objection2').first().click();
        });

        it('assigns objection with selected event', () => {
          cy.fetch('events-list event objection_label-0').first().should('contain', 'objection2');
        });
      });

      context('when an invalid event is selected', () => {
        beforeEach(() => {
          cy.fetch('event-select-box-visitor_message').first().check({force: true});
          cy.fetch('objections-list objection-row-objection2').first().click();
        });

        it('does not assign objection with selected event', () => {
          cy.fetch('events-list event objection_label-0').should('not.exist');
        });
      });
    });

    context('when annotating action labels', () => {
      beforeEach(() => {
        cy.fetch('workflow-select-list').click();
        cy.fetch('batch-select').select('batch1');
      });

      context('when a valid event is selected', () => {
        beforeEach(() => {
          cy.fetch('event-select-box-agent_message').first().check({force: true});
          cy.fetch('workflow-list parent-action-row').click();
        });

        it('assigns workflow with selected event', () => {
          cy.fetch('events-list event action_label').first().should('contain', 'action1');
        });
      });
      context('when an invalid event is selected', () => {
        beforeEach(() => {
          cy.fetch('event-select-box-visitor_message').first().check({force: true});
          cy.fetch('workflow-list parent-action-row').click();
        });

        it('assigns workflow with selected event', () => {
          cy.fetch('events-list event action_label').should('not.exist');
        });
      });
    });

    context('when annotating workflow labels', () => {
      beforeEach(() => {
        cy.fetch('workflow-select-list').click();
        cy.fetch('batch-select').select('batch1');
      });

      context('when a valid event is selected', () => {
        beforeEach(() => {
          cy.fetch('event-select-box-agent_message').first().check({force: true});
          cy.fetch('workflow-list parent-workflow-row').click();
        });

        it('assigns action with selected event', () => {
          cy.fetch('events-list event workflow_label').first().should('contain', 'workflow1');
        });

        context('when selecting child action', () => {
          beforeEach(() => {
            cy.fetch('child-action-row').first().click();
          });

          it('assigns child action with selected event', () => {
            cy.fetch('events-list event workflow_label child_action_label').should('have.length', 1);
          });
        });

        context('when selecting multiple child actions', () => {
          beforeEach(() => {
            cy.fetch('child-action-row').click({multiple: true});
          });

          it('assigns all child actions with selected event', () => {
            cy.fetch('events-list event workflow_label child_action_label').should('have.length', 2);
          });
        });
      });

      context('when an invalid event is selected', () => {
        beforeEach(() => {
          cy.fetch('event-select-box-visitor_message').first().check({force: true});
          cy.fetch('workflow-list parent-workflow-row').click();
          cy.fetch('action-drop').click();
          cy.fetch('child-action-row').first().click();
        });

        it('does not assign action with selected event', () => {
          cy.fetch('events-list event workflow_label').should('not.exist');
        });

        it('does not assign child action with selected event', () => {
          cy.fetch('events-list event child_action_label').should('not.exist');
        });
      });
    });
    context('when the user annotates all labels', () => {
      beforeEach(() => {
        cy.fetch('batch-select').select('batch1');

        // Visitor message
        // Select topic
        cy.fetch('event-select-box-visitor_message').first().check({ force: true });
        cy.fetch('topic-select-list').click();
        cy.fetch('topics-list topic-row').click();
        cy.fetch('close-topic-select-list').click(); // Close topics menu
        cy.fetch('event-select-box-visitor_message').first().uncheck({ force: true }); // Un-check event

        // Agent message
        // Select objection and workflow
        cy.fetch('event-select-box-agent_message').first().check({ force: true });
        cy.fetch('objection-select-list').click();
        cy.fetch('objections-list objection-row-objection2').first().click();
        cy.fetch('workflow-select-list').click();
        cy.fetch('workflow-list parent-workflow-row').click();
        cy.fetch('workflow-list parent-action-row').click();
        cy.fetch('child-action-row').contains('action3').click();
      });

      it('assigns annotated labels with selected event', () => {
        cy.fetch('events-list event workflow_label').first().should('contain', 'workflow1');
        cy.fetch('events-list event action_label').first().should('contain', 'action1');
        cy.fetch('events-list event objection_label-0').first().should('contain', 'objection2');
        cy.fetch('events-list event child_action_label').first().should('contain', 'action3');
      });
    });

    context('when using pause/play button while annotating', () => {
      beforeEach(() => {
        cy.fetch('batch-select').select('batch1');
      });

      it('makes the transcript list re-appear', () => {
        cy.wait(1000); // wait 1 second
        cy.fetch('time-taken').should('contain', '1 Sec');
        cy.fetch('pause-clock').click();
        cy.wait(5000); // wait 5 seconds
        cy.fetch('time-taken').should('contain', '1 Sec');
        cy.fetch('events-list').should('not.exist');
        cy.get('.annotateScreenBlur').should('exist');
        cy.fetch('play-clock').click();
        cy.fetch('events-list').should('have.length', 1);
      });
    });
  });
});

context('As more than one annotator user', () => {
  beforeEach(() => {
    cy.create('annotator_user').as('user1');
    cy.create('annotator_user2').as('user2');
  });

  it('displays available transcripts count', () => {
    cy.create('topic_with_subtopics');
    cy.get('@user1').login();
    cy.create('annotator_batch');
    cy.visit('/');
    cy.fetch('topic-select-list').click();
    cy.fetch('batch-select').select('batch1');
    cy.fetch('available-transcripts').should('contain', '1');
    cy.fetch('event-select-box-visitor_message').first().check({force: true});
    cy.fetch('topics-list topic-row').click();
    cy.fetch('events-list event topic_label').first().should('contain', 'topic1');
    cy.fetch('complete-annotation').click();
    cy.fetch('submit-annotation').click();
    cy.fetch('available-transcripts').should('contain', '0');
    cy.wait(2500);
    cy.fetch('user-name').click();
    cy.fetch('user-logout').click();

    cy.get('@user2').login();
    cy.visit('/');
    cy.fetch('topic-select-list').click();
    cy.fetch('batch-select').select('batch1');
    cy.fetch('available-transcripts').should('contain', '1');
    cy.fetch('event-select-box-visitor_message').first().check({force: true});
    cy.fetch('topics-list topic-row').click();
    cy.fetch('events-list event topic_label').first().should('contain', 'topic1');
    cy.fetch('complete-annotation').click();
    cy.fetch('submit-annotation').click();
    cy.wait(2500);
    cy.fetch('available-transcripts').should('contain', '0');
  });
});

context('As an annotator user', () => {
  beforeEach(() => {
    cy.create('annotator_user').login();
    cy.create('annotator_batch');
    cy.create('topic_with_subtopics');
    cy.visit('/');
    cy.fetch('batch-select').select('batch1');
    cy.fetch('topic-select-list').click();
    cy.fetch('event-select-box-visitor_message').first().check({force: true});
    cy.fetch('topics-list topic-row').click();
  });

  it('saves event notes', () => {
    cy.fetch('event-notes').first().click();
    cy.fetch('event-note-content').first().type('event_notes');
    cy.fetch('complete-annotation').click();
    cy.wait(2000); // To overcome behaviour caused by eventNote.vue scheduleSaving() method
    cy.fetch('submit-annotation').click();
  });

  context('when user completes annotation for all assigned batches', () => {
    beforeEach(() => {
      cy.fetch('complete-annotation').click();
      cy.fetch('submit-annotation').click();
    });

    it('lists an empty batch array', () => {
      cy.fetch('batch-select-option').should('have.length', 0);
    });
  });
});
