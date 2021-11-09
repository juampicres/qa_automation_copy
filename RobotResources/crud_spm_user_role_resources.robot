*** Settings ***
Documentation    Create/ Validate/ Update/ Delete Strategic Partner Managers in CCB
Library     SeleniumLibrary

*** Variables ***
${SPM_LINK}                          xpath=//*[@href="/admin/strategic_partner_managers"]
${NEW_SPM_LINK}                      xpath=//*[@href="/admin/strategic_partner_managers/new"]
${SPM_SUBMIT_BUTTON}                 id=strategic_partner_manager_user_submit_action
${INLINE_ERRORS}                     xpath=//*[@class='inline-errors']
${SPM_NEW_EMAIL_FIELD}               id=strategic_partner_manager_user_email
${SPM_NEW_PASSWORD_FIELD}            id=strategic_partner_manager_user_password
${SPM_PASSWORD_CONFIRMATION_FIELD}   id=strategic_partner_manager_user_password_confirmation
${SPM_LOCATIONS_CHECKBOX}            xpath=//*[@id='strategic_partner_manager_user_locations_input']//*[text()='Default']
${SPM_LOCATION_LABEL}                Default
${SPM_BUSINESS_UNITS_CHECKBOX}       xpath=//*[@id='strategic_partner_manager_user_business_units_input']//*[text()='QA Automation']
${SPM_BUSINESS_UNIT_LABEL}           QA Automation
${SPM_CREATED_SUCCESS_TEXT}          Strategic partner manager user was successfully created.
${SPM_EMAIL_CREATED_PAGE}            xpath=//*[@class='row row-email']/td
${SPM_BUSINESS_UNIT_CREATED_PAGE}    xpath=//*[@class='row row-business_units']/td
${SPM_LOCATION_CREATED_PAGE}         xpath=//*[@class='row row-locations']/td
${EDIT_SPM_BUTTON}                   xpath=//*[text()='Edit Strategic Partner Manager']
${SPM_FIRST_NAME_TEXT_FIELD}         id=strategic_partner_manager_user_first_name
${SPM_LAST_NAME_TEXT_FIELD}          id=strategic_partner_manager_user_last_name
${SPM_FIRST_NAME_TEXT}               SPM First Name QA Automation
${SPM_LAST_NAME_TEXT}                SPM Last Name QA Automation
${SPM_FIRST_NAME_DETAILS}            xpath=//*[@class='row row-first_name']/td
${SPM_LAST_NAME_DETAILS}             xpath=//*[@class='row row-last_name']/td
${DELETE_SPM_BUTTON}                 xpath=//*[text()='Delete Strategic Partner Manager']
${DELETE_MODAL_TEXT}                 xpath=//*[text()='Are you sure you want to delete this?']
${DELETED_PAGE_HEADER}               xpath=//*[@class='flashes']/*
${SPM_DELETED_TEXT}                  Strategic partner manager user was successfully destroyed.

*** Keywords ***
Create And Validate New SPM
    Click Link   ${SPM_LINK}
    Click Link   ${NEW_SPM_LINK}
    Click Element   ${SPM_SUBMIT_BUTTON}
#    Page Should Contain Element     ${INLINE_ERRORS}    limit=4     #There should be 4 inline errors on that page. Fails on HC/ Retail URLs. Env doesn't have the latest
    Input Text  ${SPM_NEW_EMAIL_FIELD}      ${TEST_SPM}   #from config.py
    Input Text  ${SPM_NEW_PASSWORD_FIELD}    ${TEST_SPM_PW}   #from config.py
    Input Text  ${SPM_PASSWORD_CONFIRMATION_FIELD}     ${TEST_SPM_PW}   #from config.py
    Click Element   ${SPM_LOCATIONS_CHECKBOX}    #clicks checkbox 'default' location
    Click Element    ${SPM_BUSINESS_UNITS_CHECKBOX}        #clicks checkbox 'QA Automation' as the business unit
    Click Element   ${SPM_SUBMIT_BUTTON}     #clicks the create button
    Wait Until Page Contains    ${SPM_CREATED_SUCCESS_TEXT}
    Element Text Should Be  ${SPM_EMAIL_CREATED_PAGE}      ${TEST_SPM}   #from config.py
    Element Text Should Be  ${SPM_BUSINESS_UNIT_CREATED_PAGE}      ${SPM_BUSINESS_UNIT_LABEL}
    Element Text Should Be  ${SPM_LOCATION_CREATED_PAGE}       ${SPM_LOCATION_LABEL}
    ${new_spm}=      Get Location    #gets current URL
    Set Suite Variable   ${NEW_CREATED_SPM}  ${new_spm}   #sets URL to the new variable

Update Validate And Delete New SPM
    Go To   ${NEW_CREATED_SPM}
    Click Element   ${EDIT_SPM_BUTTON}
    Input Text  ${SPM_FIRST_NAME_TEXT_FIELD}    ${SPM_FIRST_NAME_TEXT}    #updates first name field
    Input Text  ${SPM_LAST_NAME_TEXT_FIELD}     ${SPM_LAST_NAME_TEXT}   #updates last name field
    Click Element   ${SPM_SUBMIT_BUTTON}
    Go To   ${NEW_CREATED_SPM}
    Element Text Should Be  ${SPM_FIRST_NAME_DETAILS}      ${SPM_FIRST_NAME_TEXT}     #validating the first name field
    Element Text Should Be  ${SPM_LAST_NAME_DETAILS}       ${SPM_LAST_NAME_TEXT}      #validating the last name field
    Click Element   ${DELETE_SPM_BUTTON}
    Alert Should Be Present     ${DELETE_MODAL_TEXT}     #Verifies that an alert is present and by default, accepts it.
    Element Text Should Be  ${DELETED_PAGE_HEADER}    ${SPM_DELETED_TEXT}

Create Verify Edit And Delete Strategic Partner Manager
    Create And Validate New SPM
    Update Validate And Delete New SPM
