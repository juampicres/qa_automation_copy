*** Settings ***
Documentation     A test suite with mulitiple login/logout tests for Hiper Engage
Library     SeleniumLibrary

Resource    ../../RobotResources/ccb_resources.robot

*** Variables ***
${LOGOUT_LINK}         xpath=//*[@href="/admin/logout"]

*** Test Cases ***
Login to Hiper Engage As An Admin
    Login To Hiper Engage   ${ADMIN_EMAIL}     ${ADMIN_PW}
    Close Browser
    [Tags]  Sanity    Login    Hiper

Logout Of Hiper Engage As An Admin
    Login To Hiper Engage   ${ADMIN_EMAIL}     ${ADMIN_PW}
    Click Link  ${LOGOUT_LINK}
    Wait Until Location Contains    ${STAGING_ENGAGE_HIPER_URL}
    Close Browser
    [Tags]  Sanity    Login    Hiper
