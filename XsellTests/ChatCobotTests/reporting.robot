*** Settings ***
Documentation    A test suite for the ccb reporting page. Accessible by the following user roles: Admins/ SPM/ CM/ IM/  /reporting/agents
Library     SeleniumLibrary

Resource          ${CURDIR}${/}..${/}..${/}/RobotResources/ccb_resources.robot
Suite Teardown    Close All Browsers

*** Variables ***
${REPORTING_LINK}   xpath=//*[@href="/reporting/agents"]
${REPORTING_PAGE}   id=reporting_agent        #Updated on Staging

*** Test Cases ***
Access Reporting Page
    Login Hiper As An Admin
    Click Link    ${REPORTING_LINK}
    Wait Until Element Is Visible    ${REPORTING_PAGE}
    [Tags]  Sanity  Hiper
