*** Settings ***
Documentation    Create/ Validate/ Update/ Delete Admins in CCB
Library     SeleniumLibrary

*** Variables ***
${ADMIN_HOVER_TOOLBAR}                 id=admin
${ADMINS_LINK}                         xpath=//*[@href="/admin/admins"]
${NEW_ADMINS_LINK}                     xpath=//*[@href="/admin/admins/new"]
${ADMIN_SUBMIT_BUTTON}                 id=admin_user_submit_action
${INLINE_ERRORS}                       xpath=//*[@class='inline-errors']
${ADMIN_NEW_EMAIL_FIELD}               id=admin_user_email
${ADMIN_NEW_PASSWORD_FIELD}            id=admin_user_password
${ADMIN_PASSWORD_CONFIRMATION_FIELD}   id=admin_user_password_confirmation
${ADMIN_LOCATIONS_CHECKBOX}            xpath=//*[@id='admin_user_locations_input']//*[text()='Default']
${ADMIN_LOCATION_LABEL}                Default
${ADMIN_BUSINESS_UNITS_CHECKBOX}       xpath=//*[@id='admin_user_business_units_input']//*[text()='QA Automation']
${ADMIN_BUSINESS_UNIT_LABEL}           QA Automation
${ADMIN_CREATED_SUCCESS_TEXT}          Admin user was successfully created.
${ADMIN_EMAIL_CREATED_PAGE}            xpath=//*[@class='row row-email']/td
${EDIT_ADMINS_BUTTON}                  xpath=//*[text()='Edit Admins']
${ADMIN_FIRST_NAME_TEXT_FIELD}         id=admin_user_first_name
${ADMIN_LAST_NAME_TEXT_FIELD}          id=admin_user_last_name
${ADMIN_FIRST_NAME_TEXT}               Admin First Name QA Automation
${ADMIN_LAST_NAME_TEXT}                Admin Last Name QA Automation
${ADMIN_FIRST_NAME_DETAILS}            xpath=//*[@class='row row-first_name']/td
${ADMIN_LAST_NAME_DETAILS}             xpath=//*[@class='row row-last_name']/td
${DELETE_ADMIN_BUTTON}                 xpath=//*[text()='Delete Admins']
${DELETE_MODAL_TEXT}                   Are you sure you want to delete this?
${DELETED_PAGE_HEADER}                 xpath=//*[@class='flashes']/*
${ADMIN_DELETED_TEXT}                  Admin user was successfully destroyed.

*** Keywords ***
Create And Validate New Admin
    Click Element   ${ADMIN_HOVER_TOOLBAR}
    Click Link   ${ADMINS_LINK}
    Click Link   ${NEW_ADMINS_LINK}
    Click Element   ${ADMIN_SUBMIT_BUTTON}
#    Page Should Contain Element     ${INLINE_ERRORS}    limit=4     #There should be 4 inline errors on that page.  Fails on HC/ Retail URLs. Env doesn't have the latest
    Input Text  ${ADMIN_NEW_EMAIL_FIELD}      ${TEST_ADMIN}   #from config.py
    Input Text  ${ADMIN_NEW_PASSWORD_FIELD}    ${TEST_ADMIN_PW}   #from config.py
    Input Text  ${ADMIN_PASSWORD_CONFIRMATION_FIELD}     ${TEST_ADMIN_PW}   #from config.py
    Click Element   ${ADMIN_LOCATIONS_CHECKBOX}    #clicks checkbox 'default' location
    Click Element    ${ADMIN_BUSINESS_UNITS_CHECKBOX}        #clicks checkbox 'QA Automation' as the business unit
    Click Element   ${ADMIN_SUBMIT_BUTTON}     #clicks the create button
    Wait Until Page Contains    ${ADMIN_CREATED_SUCCESS_TEXT}
    Element Text Should Be  ${ADMIN_EMAIL_CREATED_PAGE}      ${TEST_ADMIN}   #from config.py
    ${new_admin}=      Get Location    #gets current URL
    Set Suite Variable   ${NEW_CREATED_ADMIN}  ${new_admin}   #sets URL to the new variable

Update Validate And Delete New Admin
    Go To   ${NEW_CREATED_ADMIN}
    Click Element   ${EDIT_ADMINS_BUTTON}
    Input Text  ${ADMIN_FIRST_NAME_TEXT_FIELD}    ${ADMIN_FIRST_NAME_TEXT}    #updates first name field
    Input Text  ${ADMIN_LAST_NAME_TEXT_FIELD}     ${ADMIN_LAST_NAME_TEXT}   #updates last name field
    Click Element   ${ADMIN_SUBMIT_BUTTON}
    Go To   ${NEW_CREATED_ADMIN}
    Element Text Should Be  ${ADMIN_FIRST_NAME_DETAILS}      ${ADMIN_FIRST_NAME_TEXT}     #validating the first name field
    Element Text Should Be  ${ADMIN_LAST_NAME_DETAILS}       ${ADMIN_LAST_NAME_TEXT}      #validating the last name field
    Click Element   ${DELETE_ADMIN_BUTTON}
    Alert Should Be Present     ${DELETE_MODAL_TEXT}     #Verifies that an alert is present and by default, accepts it.
    Element Text Should Be  ${DELETED_PAGE_HEADER}    ${ADMIN_DELETED_TEXT}

Create Verify Edit And Delete Admin
    Create And Validate New Admin
    Update Validate And Delete New Admin
