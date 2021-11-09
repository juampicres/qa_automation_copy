*** Settings ***
Documentation    Create/ Validate/ Update/ Delete Agents in CCB as an Admin
Library     SeleniumLibrary

*** Variables ***
${CHAT_AGENTS_LINK}              xpath=//*[@href="/admin/chat_agents"]
${NEW_CHAT_AGENTS_LINK}          xpath=//*[@href="/admin/chat_agents/new"]
${SUBMIT_ACTION}                 id=chat_agent_user_submit_action
${INLINE_ERRORS}                 xpath=//*[@class='inline-errors']
${EXTERNAL_ID_FIELD}             id=chat_agent_user_agent_external_chat_id
${NEW_EMAIL_FIELD}               id=chat_agent_user_email
${NEW_PASSWORD_FIELD}            id=chat_agent_user_password
${PASSWORD_CONFIRMATION_FIELD}   id=chat_agent_user_password_confirmation
${LOCATION_DROPDOWN}             id=chat_agent_user_agent_profile_attributes_location_id
${LOCATION_LABEL}                Default
${BUSINESS_UNIT_DROPDOWN}        id=chat_agent_user_agent_profile_attributes_business_unit_id
${BUSINESS_UNIT_LABEL}           QA Automation
${CHAT_AGENT_USER_BUTTON}        id=chat_agent_user_submit_action
${AGENT_CREATED_SUCCESS_TEXT}    Chat agent user was successfully created.
${EXTERNAL_ID_CREATED_PAGE}      xpath=//*[@class='row row-external_id']/td
${EMAIL_CREATED_PAGE}            xpath=//*[@class='row row-email']/td
${BUSINESS_UNIT_CREATED_PAGE}    xpath=//*[@class='row row-business_unit']/td
${LOCATION_CREATED_PAGE}         xpath=//*[@class='row row-location']/td
${EDIT_CHAT_AGENT_BUTTON}        xpath=//*[text()='Edit Chat Agent']
${FIRST_NAME_TEXT_FIELD}         id=chat_agent_user_first_name
${LAST_NAME_TEXT_FIELD}          id=chat_agent_user_last_name
${FIRST_NAME_TEXT}               First Name QA Automation
${LAST_NAME_TEXT}                Last Name QA Automation
${FIRST_NAME_AGENT_DETAILS}      xpath=//*[@class='row row-first_name']/td
${LAST_NAME_AGENT_DETAILS}       xpath=//*[@class='row row-last_name']/td
${DELETE_CHAT_AGENT_BUTTON}      xpath=//*[text()='Delete Chat Agent']
${DELETE_CHAT_AGENT_MODAL_TEXT}  Are you sure you want to delete this?
${DELETED_PAGE_HEADER}           xpath=//*[@class='flashes']/*
${AGENT_DELETED_TEXT}            Chat agent user was successfully destroyed.

*** Keywords ***
Create And Validate New Agent
    Click Link   ${CHAT_AGENTS_LINK}
    Click Link   ${NEW_CHAT_AGENTS_LINK}
    Click Element   ${SUBMIT_ACTION}
    Page Should Contain Element     ${INLINE_ERRORS}    limit=5     #There should be 5 inline errors on that page
    Input Text  ${EXTERNAL_ID_FIELD}    ${TEST_AGENT}   #from config.py
    Input Text  ${NEW_EMAIL_FIELD}    ${TEST_AGENT}   #from config.py
    Input Text  ${NEW_PASSWORD_FIELD}    ${TEST_AGENT_PW}   #from config.py
    Input Text  ${PASSWORD_CONFIRMATION_FIELD}     ${TEST_AGENT_PW}   #from config.py
    Select From List By Label     ${LOCATION_DROPDOWN}    ${LOCATION_LABEL}
    Select From List By Label      ${BUSINESS_UNIT_DROPDOWN}     ${BUSINESS_UNIT_LABEL}
    Click Element   ${CHAT_AGENT_USER_BUTTON}
    Wait Until Page Contains    ${AGENT_CREATED_SUCCESS_TEXT}
    Element Text Should Be  ${EXTERNAL_ID_CREATED_PAGE}     ${TEST_AGENT}   #from config.py
    Element Text Should Be  ${EMAIL_CREATED_PAGE}      ${TEST_AGENT}   #from config.py
    Element Text Should Be  ${BUSINESS_UNIT_CREATED_PAGE}      ${BUSINESS_UNIT_LABEL}
    Element Text Should Be  ${LOCATION_CREATED_PAGE}       ${LOCATION_LABEL}
    ${new_chat_agent}=      Get Location    #gets current URL
    Set Suite Variable   ${NEW_CREATED_CHAT_AGENT}  ${new_chat_agent}   #sets URL to the new variable

Update Validate And Delete New Agent
    Go To   ${NEW_CREATED_CHAT_AGENT}
    Click Element   ${EDIT_CHAT_AGENT_BUTTON}
    Input Text  ${FIRST_NAME_TEXT_FIELD}    ${FIRST_NAME_TEXT}  #updates first name field
    Input Text  ${LAST_NAME_TEXT_FIELD}     ${LAST_NAME_TEXT}   #updates last name field
    Click Element   ${CHAT_AGENT_USER_BUTTON}
    Go To   ${NEW_CREATED_CHAT_AGENT}
    Element Text Should Be  ${FIRST_NAME_AGENT_DETAILS}      ${FIRST_NAME_TEXT}     #validating the first name field
    Element Text Should Be  ${LAST_NAME_AGENT_DETAILS}       ${LAST_NAME_TEXT}      #validating the last name field
    Click Element   ${DELETE_CHAT_AGENT_BUTTON}
    Alert Should Be Present     ${DELETE_CHAT_AGENT_MODAL_TEXT}     #Verifies that an alert is present and by default, accepts it.
    Element Text Should Be  ${DELETED_PAGE_HEADER}    ${AGENT_DELETED_TEXT}

Create Verify Edit And Delete Agent
    Create And Validate New Agent
    Update Validate And Delete New Agent
