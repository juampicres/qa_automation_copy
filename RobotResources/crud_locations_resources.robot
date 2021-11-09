*** Settings ***
Documentation    Create/ Validate/ Update/ Delete Location
Library     SeleniumLibrary

*** Variables ***
${LOCATIONS_LINK}                                 xpath=//*[@href="/admin/locations"]
${NEW_LOCATIONS_LINK}                             xpath=//*[@href="/admin/locations/new"]
${CREATE_LOCATION_BUTTON}                         id=location_submit_action
${LOCATION_NAME_FIELD}                            id=location_name
${NEW_LOCATION_NAME}                              New Location First Name QA Automation
${EDIT_LOCATION_NAME}                             Edit Location First Name QA Automation
${LOCATION_CORONA_ID_FIELD}                       id=location_corona_id
${CORONA_ID_TEXT}                                 New Location Corona Id QA Automation
${EDIT_CORONA_ID_TEXT}                            Edit New Location Corona Id QA Automation
${SIMILARITY_THRESHOLD}                           id=location_similarity_threshold
${SIMILARITY_THRESHOLD_DEFAULT}                   0.9
${CLICK_THRESHOLD}                                id=location_click_threshold
${CLICK_THRESHOLD_DEFAULT}                        1
${BAG_OF_WORDS_THRESHOLD}                         id=location_bag_of_words_threshold
${BAG_OF_WORDS_NODE_COUNT_THRESHOLD_DEFAULT}      0
${NODE_COUNT_THRESHOLD}                           id=location_node_count_threshold
${MULTI_ENGAGEMENT_ENABLED_CHECKBOX}              id=location_multi_engagement_enabled
${DEACTIVATED_CHECKBOX}                           id=location_deactivated
${LOCATION_SUCCESFULLY_CREATED_MESSAGE}           xpath=//*[contains(text(), 'Location was successfully created.')]
${LOCATION_NAME_DETAILS}                          xpath=//*[@class='row row-name']/td
${LOCATION_CORONA_DETAILS}                        xpath=//*[@class='row row-corona_id']/td
${MULTI_ENGAGEMETENT_DETAILS}                     xpath=//*[@class='row row-multi_engagement_enabled']/td/*
${DEACTIVATED_DETAILS}                            xpath=//*[@class='row row-deactivated']/td/*
${LAST_MESSAGE_BU_DETAILS}                        xpath=//*[@class='row row-last_message_enabled']/td/*
${TEXT_YES}                                       YES
${TEXT_NO}                                        NO
${EDIT_LOCATION_BUTTON}                           xpath=//*[text()='Edit Location']
${DELETE_LOCATION_BUTTON}                         xpath=//*[text()='Delete Location']
${DELETE_MODAL_TEXT}                              Are you sure you want to delete this?
${LOCATION_SUCCESFULLY_DELETED_MESSAGE}           Location was successfully destroyed.
${DELETED_PAGE_HEADER}                            xpath=//*[@class='flashes']/*

*** Keywords ***
Create And Validate New Location Unit
    Click Link  ${LOCATIONS_LINK}
    Click Element  ${NEW_LOCATIONS_LINK}
    Input Text    ${LOCATION_NAME_FIELD}     ${NEW_LOCATION_NAME}
    Input Text    ${LOCATION_CORONA_ID_FIELD}     ${CORONA_ID_TEXT}
    Textfield Value Should Be   ${SIMILARITY_THRESHOLD}     ${SIMILARITY_THRESHOLD_DEFAULT}     #default value is 0.9
    Textfield Value Should Be   ${CLICK_THRESHOLD}      ${CLICK_THRESHOLD_DEFAULT}  #default value is 1
    Textfield Value Should Be   ${BAG_OF_WORDS_THRESHOLD}   ${BAG_OF_WORDS_NODE_COUNT_THRESHOLD_DEFAULT}     #default value is 0
    Textfield Value Should Be   ${NODE_COUNT_THRESHOLD}     ${BAG_OF_WORDS_NODE_COUNT_THRESHOLD_DEFAULT}  #default value is 0
    Checkbox Should Be Selected     ${MULTI_ENGAGEMENT_ENABLED_CHECKBOX}     #enabled by default
    Checkbox Should Not Be Selected    ${DEACTIVATED_CHECKBOX}     #disabled by default
    Click Element  ${CREATE_LOCATION_BUTTON}
    Wait Until Page Contains Element    ${LOCATION_SUCCESFULLY_CREATED_MESSAGE}
    Element Text Should Be  ${LOCATION_NAME_DETAILS}      ${NEW_LOCATION_NAME}
    Element Text Should Be  ${LOCATION_CORONA_DETAILS}      ${CORONA_ID_TEXT}
    Element Text Should Be  ${MULTI_ENGAGEMETENT_DETAILS}    ${TEXT_YES}
    Element Text Should Be  ${DEACTIVATED_DETAILS}     ${TEXT_NO}
    ${new_location}=      Get Location    #gets current URL for the newly created location
    Set Suite Variable   ${NEW_CREATED_LOCATION}  ${new_location}

Update Validate And Delete Location
    Go To   ${NEW_CREATED_LOCATION}   #goes to the newly created location
    Click Element   ${EDIT_LOCATION_BUTTON}
    Input Text  ${LOCATION_NAME_FIELD}    ${EDIT_LOCATION_NAME}     #updates name field
    Input Text  ${LOCATION_CORONA_ID_FIELD}     ${EDIT_CORONA_ID_TEXT}    #updates corona field
    Click Element   ${CREATE_LOCATION_BUTTON}
    Element Text Should Be  ${LOCATION_NAME_DETAILS}      ${EDIT_LOCATION_NAME}
    Element Text Should Be  ${LOCATION_CORONA_DETAILS}      ${EDIT_CORONA_ID_TEXT}
    Click Element   ${DELETE_LOCATION_BUTTON}
    Alert Should Be Present     ${DELETE_MODAL_TEXT}     #Verifies that an alert is present and by default, accepts it.
    Element Text Should Be  ${DELETED_PAGE_HEADER}    ${LOCATION_SUCCESFULLY_DELETED_MESSAGE}

Create Verify Edit And Delete Location
    Create And Validate New Location Unit
    Update Validate And Delete Location
