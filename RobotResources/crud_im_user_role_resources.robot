*** Settings ***
Documentation    Create/ Validate/ Update/ Delete Internal Managers in CCB
Library     SeleniumLibrary

*** Variables ***
${ADMIN_HOVER_TOOLBAR}              id=admin
${IM_LINK}                          xpath=//*[@href="/admin/internal_managers"]
${NEW_IM_LINK}                      xpath=//*[@href="/admin/internal_managers/new"]
${IM_SUBMIT_BUTTON}                 id=internal_manager_user_submit_action
${INLINE_ERRORS}                    xpath=//*[@class='inline-errors']
${IM_NEW_EMAIL_FIELD}               id=internal_manager_user_email
${IM_NEW_PASSWORD_FIELD}            id=internal_manager_user_password
${IM_PASSWORD_CONFIRMATION_FIELD}   id=internal_manager_user_password_confirmation
${IM_LOCATIONS_CHECKBOX}            xpath=//*[@id='internal_manager_user_locations_input']//*[text()='Default']
${IM_LOCATION_LABEL}                Default
${IM_BUSINESS_UNITS_CHECKBOX}       xpath=//*[@id='internal_manager_user_business_units_input']//*[text()='QA Automation']
${IM_BUSINESS_UNIT_LABEL}           QA Automation
${IM_CREATED_SUCCESS_TEXT}          Internal manager user was successfully created.
${IM_EMAIL_CREATED_PAGE}            xpath=//*[@class='row row-email']/td
${IM_LOCATIONS_CREATED_PAGE}        xpath=//*[@class='row row-locations']/td
${IM_BUSINESS_UNITS_CREATED_PAGE}   xpath=//*[@class='row row-business_units']/td
${EDIT_IMS_BUTTON}                  xpath=//*[text()='Edit Internal Manager']
${IM_FIRST_NAME_TEXT_FIELD}         id=internal_manager_user_first_name
${IM_LAST_NAME_TEXT_FIELD}          id=internal_manager_user_last_name
${IM_FIRST_NAME_TEXT}               Internal manager First Name QA Automation
${IM_LAST_NAME_TEXT}                Internal manager Last Name QA Automation
${IM_FIRST_NAME_DETAILS}            xpath=//*[@class='row row-first_name']/td
${IM_LAST_NAME_DETAILS}             xpath=//*[@class='row row-last_name']/td
${DELETE_IM_BUTTON}                 xpath=//*[text()='Delete Internal Manager']
${DELETE_MODAL_TEXT}                Are you sure you want to delete this?
${DELETED_PAGE_HEADER}              xpath=//*[@class='flashes']/*
${IM_DELETED_TEXT}                  Internal manager user was successfully destroyed.

*** Keywords ***
Create And Validate New IM
    Click Element   ${ADMIN_HOVER_TOOLBAR}
    Click Link   ${IM_LINK}
    Click Link   ${NEW_IM_LINK}
    Click Element   ${IM_SUBMIT_BUTTON}
#    Page Should Contain Element     ${INLINE_ERRORS}    limit=4     #There should be 4 inline errors on that page.  Fails on HC/ Retail URLs. Env doesn't have the latest
    Input Text  ${IM_NEW_EMAIL_FIELD}      ${TEST_IM}   #from config.py
    Input Text  ${IM_NEW_PASSWORD_FIELD}    ${TEST_IM_PW}   #from config.py
    Input Text  ${IM_PASSWORD_CONFIRMATION_FIELD}     ${TEST_IM_PW}   #from config.py
    Click Element   ${IM_LOCATIONS_CHECKBOX}    #clicks checkbox 'default' location
    Click Element    ${IM_BUSINESS_UNITS_CHECKBOX}        #clicks checkbox 'QA Automation' as the business unit
    Click Element   ${IM_SUBMIT_BUTTON}     #clicks the create button
    Wait Until Page Contains    ${IM_CREATED_SUCCESS_TEXT}
    Element Text Should Be  ${IM_EMAIL_CREATED_PAGE}      ${TEST_IM}   #from config.py
    Element Text Should Be  ${IM_BUSINESS_UNITS_CREATED_PAGE}   ${IM_BUSINESS_UNIT_LABEL}
    Element Text Should Be  ${IM_LOCATIONS_CREATED_PAGE}    ${IM_LOCATION_LABEL}
    ${new_im}=      Get Location    #gets current URL
    Set Suite Variable   ${NEW_CREATED_IM}  ${new_im}   #sets URL to the new variable

Update Validate And Delete New IM
    Go To   ${NEW_CREATED_IM}
    Click Element   ${EDIT_IMS_BUTTON}
    Input Text  ${IM_FIRST_NAME_TEXT_FIELD}    ${IM_FIRST_NAME_TEXT}    #updates first name field
    Input Text  ${IM_LAST_NAME_TEXT_FIELD}     ${IM_LAST_NAME_TEXT}   #updates last name field
    Click Element   ${IM_SUBMIT_BUTTON}
    Go To   ${NEW_CREATED_IM}
    Element Text Should Be  ${IM_FIRST_NAME_DETAILS}      ${IM_FIRST_NAME_TEXT}     #validating the first name field
    Element Text Should Be  ${IM_LAST_NAME_DETAILS}       ${IM_LAST_NAME_TEXT}      #validating the last name field
    Click Element   ${DELETE_IM_BUTTON}
    Alert Should Be Present     ${DELETE_MODAL_TEXT}     #Verifies that an alert is present and by default, accepts it.
    Element Text Should Be  ${DELETED_PAGE_HEADER}    ${IM_DELETED_TEXT}

Create Verify Edit And Delete Internal Manager
    Create And Validate New IM
    Update Validate And Delete New IM
