*** Settings ***
Documentation    Create/ Read/ Update/ Delete for business units in ccb as an admin and IM. Resources file has the steps

Resource    ../../RobotResources/ccb_resources.robot
Suite Teardown    Close All Browsers

*** Variables ***
${ADMIN_USERS_LINK}                      xpath=//*[@href='/admin/admin_users']
${NEW_ADMIN_USER_LINK}                   xpath=//*[@href='/admin/admin_users/new']
${CREATE_ADMIN_USER_BUTTON}              id=admin_user_submit_action
${INLINE_ERRORS}                         xpath=//*[@class='inline-errors']
${EMAIL_FIELD}                           xpath=//*[@name='admin_user[email]']
${NEW_ADMIN_EMAIL}                       newadminuser@xselltechnologies.com
${PASSWORD_FIELD}                        id=admin_user_password
${PASSWORD_CONFIRMATION_FIELD}           id=admin_user_password_confirmation
${PASSWORD_STRING}                       thisisatestpassword
${ADMIN_SUCCESFULLY_CREATED_MESSAGE}     xpath=//*[contains(text(), 'Admin user was successfully created.')]
${ADMIN_EMAIL_DETAILS}                   xpath=//*[@class='row row-email']/td
${EDIT_ADMIN_USER_BUTTON}                xpath=//*[text()='Edit Admin User']
${DELETE_ADMIN_BUTTON}                   xpath=//*[text()='Delete Admin User']
${DELETE_MODAL_TEXT}                     Are you sure you want to delete this?
${ADMIN_SUCCESSFULLY_DELETED_MESSAGE}    Admin user was successfully destroyed.
${DELETED_PAGE_HEADER}                   xpath=//*[@class='flashes']/*

*** Test Cases ***
Create Verify And Delete Admin Users As An Admin
    Login To Hiper Engage   ${ADMIN_EMAIL}     ${ADMIN_PW}
    Create Validate And Delete New Admin User
    [Tags]  Sanity  Hiper Admin

*** Keywords ***
Create Validate And Delete New Admin User
    Click Link  ${ADMIN_USERS_LINK}
    Click Element  ${NEW_ADMIN_USER_LINK}
    Double Click Element    ${CREATE_ADMIN_USER_BUTTON}
    Page Should Contain Element     ${INLINE_ERRORS}    limit=2
    Input Text  ${EMAIL_FIELD}  ${NEW_ADMIN_EMAIL}
    Input Text  ${PASSWORD_FIELD}   ${PASSWORD_STRING}
    Input Text  ${PASSWORD_CONFIRMATION_FIELD}  ${PASSWORD_STRING}
    Click Element   ${CREATE_ADMIN_USER_BUTTON}
    Wait Until Page Contains Element    ${ADMIN_SUCCESFULLY_CREATED_MESSAGE}
    Element Text Should Be  ${ADMIN_EMAIL_DETAILS}      ${NEW_ADMIN_EMAIL}
    Click Link  ${DELETE_ADMIN_BUTTON}
    Alert Should Be Present     ${DELETE_MODAL_TEXT}     #Verifies that an alert is present and by default, accepts it.
    Element Text Should Be  ${DELETED_PAGE_HEADER}    ${ADMIN_SUCCESSFULLY_DELETED_MESSAGE}
