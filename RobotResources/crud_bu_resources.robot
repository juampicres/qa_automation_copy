*** Settings ***
Documentation    Create/ Validate/ Update/ Delete Business Units
Library     SeleniumLibrary

*** Variables ***
${BUSINESS_UNITS_LINK}                      xpath=//*[@href="/admin/business_units"]
${NEW_BUSINESS_UNITS_LINK}                  xpath=//*[@href="/admin/business_units/new"]
${CREATE_BUSINESS_UNIT_BUTTON}              id=business_unit_submit_action
${INLINE_ERRORS}                            xpath=//*[@class='inline-errors']
${BU_NAME_FIELD}                            id=business_unit_name
${NEW_BU_NAME}                              New Business Unit First Name QA Automation
${CORONA_ID_FIELD}                          id=business_unit_corona_id
${CORONA_ID_STRING}                         New Business Unit Corona Id QA Automation
${AI_ENABLED_CHECKBOX}                      id=business_unit_ai_enabled
${LAST_MESSAGE_CHECKBOX}                    id=business_unit_last_message_enabled
${BU_SUCCESFULLY_CREATED_MESSAGE}           xpath=//*[contains(text(), 'Business unit was successfully created.')]
${BU_NAME_DETAILS}                          xpath=//*[@class='row row-name']/td
${BU_CORONA_DETAILS}                        xpath=//*[@class='row row-corona']/td
${AI_BU_DETAILS}                            xpath=//*[@class='row row-ai_enabled']/td/*
${WHITELIST_BU_DETAILS}                     xpath=//*[@class='row row-whitelist_enabled']/td/*
${LAST_MESSAGE_BU_DETAILS}                  xpath=//*[@class='row row-last_message_enabled']/td/*
${SEARCH_ENABLED_BU_DETAILS}                xpath=//*[@class='row row-search_enabled']/td/*
${PROMO_PANEL_BU_DETAILS}                   xpath=//*[@class='row row-promo_panel_enabled']/td/*
${DEVICE_DETAILS_BU_DETAILS}                xpath=//*[@class='row row-device_details_enabled']/td/*
${TROUBLESHOOTING_BU_DETAILS}               xpath=//*[@class='row row-troubleshooting_enabled']/td/*
${ASYNC_CHAT_BU_DETAILS}                    xpath=//*[@class='row row-async_chat_enabled']/td/*
${TRANSCRIPT_RESOURCE_BU_DETAILS}           xpath=//*[@class='row row-transcript_resource_enabled']/td/*
${SUPERVISOR_DASH_BU_DETAILS}               xpath=//*[@class='row row-supervisor_dashboard_enabled']/td/*
${TEXT_YES}                                 YES
${EDIT_BUSINESS_UNIT_BUTTON}                xpath=//*[text()='Edit Business Unit']
${WHITELIST_ENABLED_CHECKBOX}               id=business_unit_whitelist_enabled
${SEARCH_ENABLED_CHECKBOX}                  id=business_unit_search_enabled
${PROMO_PANEL_ENABLED_CHECKBOX}             id=business_unit_promo_panel_enabled
${DEVICE_DETAILS_ENABLED_CHECKBOX}          id=business_unit_device_details_enabled
${TROUBLESHOOTING_ENABLED_CHECKBOX}         id=business_unit_troubleshooting_enabled
${ASYNC_ENABLED_CHECKBOX}                   id=business_unit_async_chat_enabled
${TRANSCRIPT_RESOURCE_ENABLED_CHECKBOX}     id=business_unit_transcript_resource_enabled
${SUPERVISOR_DASHBOARD_ENABLED_CHECKBOX}    id=business_unit_supervisor_dashboard_enabled
${DELETE_BU_BUTTON}                         xpath=//*[text()='Delete Business Unit']
${DELETE_MODAL_TEXT}                        Are you sure you want to delete this?
${BU_SUCCESFULLY_DELETED_MESSAGE}           Business unit was successfully destroyed.
${DELETED_PAGE_HEADER}                      xpath=//*[@class='flashes']/*

*** Keywords ***
Create And Validate New Business Unit
    Click Link  ${BUSINESS_UNITS_LINK}
    Click Element  ${NEW_BUSINESS_UNITS_LINK}
    Click Element  ${CREATE_BUSINESS_UNIT_BUTTON}
    Page Should Contain Element     ${INLINE_ERRORS}    limit=2     #There should be 2 inline errors on that page.  Fails on HC/ Retail URLs. Env doesn't have the latest
    Input Text    ${BU_NAME_FIELD}     ${NEW_BU_NAME}
    Input Text    ${CORONA_ID_FIELD}     ${CORONA_ID_STRING}
    Checkbox Should Be Selected    ${AI_ENABLED_CHECKBOX}       #AI Enabled is checked by default
    Checkbox Should Be Selected    ${LAST_MESSAGE_CHECKBOX}     #Last Message is checked by default
    Click Element    ${CREATE_BUSINESS_UNIT_BUTTON}
    Wait Until Page Contains Element    ${BU_SUCCESFULLY_CREATED_MESSAGE}
    Element Text Should Be  ${BU_NAME_DETAILS}      ${NEW_BU_NAME}
    Element Text Should Be  ${BU_CORONA_DETAILS}      ${CORONA_ID_STRING}
    Element Text Should Be  ${AI_BU_DETAILS}    ${TEXT_YES}
    Element Text Should Be  ${LAST_MESSAGE_BU_DETAILS}     ${TEXT_YES}
    ${new_bu}=      Get Location    #gets current URL for the newly created business unit
    Set Suite Variable   ${NEW_CREATED_BU}  ${new_bu}

Enable All Features Validate And Delete Business Unit
    Go To   ${NEW_CREATED_BU}   #goes to the newly created business unit
    Click Element   ${EDIT_BUSINESS_UNIT_BUTTON}
    Click Element   ${WHITELIST_ENABLED_CHECKBOX}
    Click Element   ${SEARCH_ENABLED_CHECKBOX}
    Click Element   ${PROMO_PANEL_ENABLED_CHECKBOX}
    Click Element   ${DEVICE_DETAILS_ENABLED_CHECKBOX}
    Click Element   ${TROUBLESHOOTING_ENABLED_CHECKBOX}
    Click Element   ${ASYNC_ENABLED_CHECKBOX}
    Click Element   ${TRANSCRIPT_RESOURCE_ENABLED_CHECKBOX}
    Click Element   ${SUPERVISOR_DASHBOARD_ENABLED_CHECKBOX}
    Click Element   ${CREATE_BUSINESS_UNIT_BUTTON}
    Element Text Should Be  ${WHITELIST_BU_DETAILS}       ${TEXT_YES}     #validating the first name field
    Element Text Should Be  ${LAST_MESSAGE_BU_DETAILS}         ${TEXT_YES}      #validating the last name field
    Element Text Should Be  ${SEARCH_ENABLED_BU_DETAILS}         ${TEXT_YES}      #validating the last name field
    Element Text Should Be  ${PROMO_PANEL_BU_DETAILS}         ${TEXT_YES}      #validating the last name field
    Element Text Should Be  ${DEVICE_DETAILS_BU_DETAILS}         ${TEXT_YES}      #validating the last name field
    Element Text Should Be  ${TROUBLESHOOTING_BU_DETAILS}         ${TEXT_YES}      #validating the last name field
    Element Text Should Be  ${ASYNC_CHAT_BU_DETAILS}         ${TEXT_YES}      #validating the last name field
    Element Text Should Be  ${TRANSCRIPT_RESOURCE_BU_DETAILS}         ${TEXT_YES}      #validating the last name field
    Element Text Should Be  ${SUPERVISOR_DASH_BU_DETAILS}         ${TEXT_YES}      #validating the last name field
    Click Element   ${DELETE_BU_BUTTON}
    Alert Should Be Present     ${DELETE_MODAL_TEXT}     #Verifies that an alert is present and by default, accepts it.
    Element Text Should Be  ${DELETED_PAGE_HEADER}    ${BU_SUCCESFULLY_DELETED_MESSAGE}

Create Verify Edit And Delete Business Unit
    Create And Validate New Business Unit
    Enable All Features Validate And Delete Business Unit
