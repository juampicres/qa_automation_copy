*** Settings ***
Documentation    Create/ Validate/ Update/ Delete Center Managers in CCB
Library     SeleniumLibrary

*** Variables ***
${CENTER_MANAGERS_LINK}             xpath=//*[@href="/admin/center_managers"]
${NEW_CENTER_MANAGER_LINK}          xpath=//*[@href="/admin/center_managers/new"]
${CM_USER_SUBMIT_BUTTON}            id=center_manager_user_submit_action
${INLINE_ERRORS}                    xpath=//*[@class='inline-errors']
${CM_NEW_EMAIL_FIELD}               id=center_manager_user_email
${CM_NEW_PASSWORD_FIELD}            id=center_manager_user_password
${CM_PASSWORD_CONFIRMATION_FIELD}   id=center_manager_user_password_confirmation
${CM_LOCATIONS_CHECKBOX}            xpath=//*[@id='center_manager_user_locations_input']//*[text()='Default']
${CM_LOCATION_LABEL}                Default
${CM_BUSINESS_UNITS_CHECKBOX}       xpath=//*[@id='center_manager_user_business_units_input']//*[text()='QA Automation']
${CM_BUSINESS_UNIT_LABEL}           QA Automation
${CM_CREATED_SUCCESS_TEXT}          Center manager user was successfully created.
${CM_EMAIL_CREATED_PAGE}            xpath=//*[@class='row row-email']/td
${CM_LOCATIONS_CREATED_PAGE}        xpath=//*[@class='row row-locations']/td
${CM_BUSINESS_UNITS_CREATED_PAGE}   xpath=//*[@class='row row-business_units']/td
${EDIT_CENTER_MANAGER_BUTTON}       xpath=//*[text()='Edit Center Manager']
${CM_FIRST_NAME_TEXT_FIELD}         id=center_manager_user_first_name
${CM_LAST_NAME_TEXT_FIELD}          id=center_manager_user_last_name
${CM_FIRST_NAME_TEXT}               CM First Name QA Automation
${CM_LAST_NAME_TEXT}                CM Last Name QA Automation
${CM_FIRST_NAME_DETAILS}            xpath=//*[@class='row row-first_name']/td
${CM_LAST_NAME_DETAILS}             xpath=//*[@class='row row-last_name']/td
${DELETE_CENTER_MANAGER_BUTTON}     xpath=//*[text()='Delete Center Manager']
${DELETE_MODAL_TEXT}                Are you sure you want to delete this?
${DELETED_PAGE_HEADER}              xpath=//*[@class='flashes']/*
${CENTER_MANAGER_DELETED_TEXT}      Center manager user was successfully destroyed.

*** Keywords ***
Create And Validate New Center Manager
    Click Link   ${CENTER_MANAGERS_LINK}
    Click Link   ${NEW_CENTER_MANAGER_LINK}
    Click Element   ${CM_USER_SUBMIT_BUTTON}
#    Page Should Contain Element     ${INLINE_ERRORS}    limit=4     #There should be 4 inline errors on that page.  Fails on HC/ Retail URLs. Env doesn't have the latest
    Input Text  ${CM_NEW_EMAIL_FIELD}    ${TEST_CM}   #from config.py
    Input Text  ${CM_NEW_PASSWORD_FIELD}    ${TEST_CM_PW}   #from config.py
    Input Text  ${CM_PASSWORD_CONFIRMATION_FIELD}     ${TEST_CM_PW}   #from config.py
    Click Element   ${CM_LOCATIONS_CHECKBOX}    #clicks checkbox 'default' location
    Click Element    ${CM_BUSINESS_UNITS_CHECKBOX}       #clicks checkbox 'QA Automation' as the business unit
    Click Element   ${CM_USER_SUBMIT_BUTTON}    #clicks the create button
    Wait Until Page Contains    ${CM_CREATED_SUCCESS_TEXT}
    Element Text Should Be  ${CM_EMAIL_CREATED_PAGE}      ${TEST_CM}   #from config.py
    Element Text Should Be  ${CM_BUSINESS_UNITS_CREATED_PAGE}   ${CM_BUSINESS_UNIT_LABEL}
    Element Text Should Be  ${CM_LOCATIONS_CREATED_PAGE}    ${CM_LOCATION_LABEL}
    ${new_center_manager}=      Get Location    #gets current URL
    Set Suite Variable   ${NEW_CREATED_CENTER_MANAGER}  ${new_center_manager}   #sets URL to the new variable

Update Validate And Delete New Center Manager
    Go To   ${NEW_CREATED_CENTER_MANAGER}
    Click Element   ${EDIT_CENTER_MANAGER_BUTTON}
    Input Text  ${CM_FIRST_NAME_TEXT_FIELD}    ${CM_FIRST_NAME_TEXT}    #updates first name field
    Input Text  ${CM_LAST_NAME_TEXT_FIELD}     ${CM_LAST_NAME_TEXT}   #updates last name field
    Click Element   ${CM_USER_SUBMIT_BUTTON}
    Go To   ${NEW_CREATED_CENTER_MANAGER}
    Element Text Should Be  ${CM_FIRST_NAME_DETAILS}      ${CM_FIRST_NAME_TEXT}     #validating the first name field
    Element Text Should Be  ${CM_LAST_NAME_DETAILS}       ${CM_LAST_NAME_TEXT}      #validating the last name field
    Click Element   ${DELETE_CENTER_MANAGER_BUTTON}
    Alert Should Be Present     ${DELETE_MODAL_TEXT}     #Verifies that an alert is present and by default, accepts it.
    Element Text Should Be  ${DELETED_PAGE_HEADER}    ${CENTER_MANAGER_DELETED_TEXT}

Create Verify Edit And Delete Center Manager
    Create And Validate New Center Manager
    Update Validate And Delete New Center Manager
