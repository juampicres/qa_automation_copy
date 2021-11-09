*** Settings ***
Documentation    Create/ Read/ Update/ Delete for business units in ccb as an admin and IM. Resources file has the steps

Resource    ../../RobotResources/ccb_resources.robot
Suite Teardown    Close All Browsers

*** Variables ***
${CLIENTS_LINK}                         xpath=//*[@href='/admin/clients']
${NEW_CLIENT_LINK}                      xpath=//*[@href='/admin/clients/new']
${CREATE_CLIENT_BUTTON}                 id=client_submit_action
${INLINE_ERRORS}                        xpath=//*[@class='inline-errors']
${NAME_FIELD}                           id=client_name
${NEW_CLIENT_NAME}                      This is a test client
${CLIENT_SUCCESFULLY_CREATED_MESSAGE}   xpath=//*[contains(text(), 'Client was successfully created.')]
${CLIENT_DETAILS}                       xpath=//*[@class='row row-name']/td
${DELETE_CLIENT_BUTTON}                 xpath=//*[text()='Delete Client']
${DELETE_MODAL_TEXT}                    Are you sure you want to delete this?
${CLIENT_SUCCESSFULLY_DELETED_MESSAGE}  Client was successfully destroyed.
${DELETED_PAGE_HEADER}                  xpath=//*[@class='flashes']/*

*** Test Cases ***
Create Verify Edit And Delete Clients
    Login To Hiper Engage   ${ADMIN_EMAIL}     ${ADMIN_PW}
    Create Validate And Delete Clients
    [Tags]  Sanity  Hiper Clients

*** Keywords ***
Create Validate And Delete Clients
    Click Link  ${CLIENTS_LINK}
    Click Element  ${NEW_CLIENT_LINK}
    Double Click Element    ${CREATE_CLIENT_BUTTON}
    Page Should Contain Element     ${INLINE_ERRORS}    limit=1
    Input Text  ${NAME_FIELD}  ${NEW_CLIENT_NAME}
    Click Element   ${CREATE_CLIENT_BUTTON}
    Wait Until Page Contains Element    ${CLIENT_SUCCESFULLY_CREATED_MESSAGE}
    Element Text Should Be  ${CLIENT_DETAILS}      ${NEW_CLIENT_NAME}
    Click Link  ${DELETE_CLIENT_BUTTON}
    Alert Should Be Present     ${DELETE_MODAL_TEXT}     #Verifies that an alert is present and by default, accepts it.
    Element Text Should Be  ${DELETED_PAGE_HEADER}    ${CLIENT_SUCCESSFULLY_DELETED_MESSAGE}
