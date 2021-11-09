*** Settings ***
Documentation    A test suite for the ccb supervisor dashboard page. Accessible by the following user roles: Admins and Internal Managers.
...              Currently running this locally where there is an active engagement. In Staging, there needs to be a Suite Setup to create
...              a new engagement
Library     SeleniumLibrary
Library     BuiltIn

Resource          ${CURDIR}${/}..${/}..${/}/RobotResources/ccb_resources.robot
#Suite Setup    WIP will need to create a new engagagement in staging - Next PR
Suite Teardown    Close All Browsers

*** Variables ***
${SUPERVISOR_DASHBOARD_LINK}   xpath=//*[@href="${WEB_URL}/supervisor_mirror"]  #using the WEB_URL variable from config.py
${SUPERVISOR_DASHBOARD}   id=supervisor_dashboard
${FIRST_RECORD_TABLE}   xpath=//table[contains(@id,'DataTables_Table_0')]/tbody/*/td/*
${FIRST_ENGAGEMENT_ID}   xpath=//table[contains(@id,'DataTables_Table_0')]/tbody/*/td
${SUPERVISOR_MIRROR_PAGE}   id=supervisor-mirror
${BACK_TO_DASBOARD_LINK}   xpath=//*[@href="/supervisor_mirror"]

*** Test Cases ***
Access Supervisor Dashboard as an Admin
    Login Hiper As An Admin
    Go To Supervisor Dashboard And Click On First Record
    Go Back To Dasboard And Validate
    Close Browser

Access Supervisor Dashboard as an Internal Manager
    Login Hiper As An Internal Manager
    Go To Supervisor Dashboard And Click On First Record
    Go Back To Dasboard And Validate
    Close Browser

Access Supervisor Dashboard as an Center Manager
    Login Hiper As An Center Manager
    Go To Supervisor Dashboard And Click On First Record
    Go Back To Dasboard And Validate
    Close Browser

Access Supervisor Dashboard as an Strategic Partner Manager
    Login Hiper As An Center Manager
    Go To Supervisor Dashboard And Click On First Record
    Go Back To Dasboard And Validate
    Close Browser

*** Keywords ***
Go To Supervisor Dashboard And Click On First Record
    Click Link  ${SUPERVISOR_DASHBOARD_LINK}
    Wait Until Page Contains Element    ${SUPERVISOR_DASHBOARD}
    Click Element   ${FIRST_RECORD_TABLE}
    Wait Until Page Contains Element    ${SUPERVISOR_MIRROR_PAGE}

Go Back To Dasboard And Validate
    Click Link  ${BACK_TO_DASBOARD_LINK}
    Wait Until Page Contains Element    ${SUPERVISOR_DASHBOARD}

# Create New Engagement
# Next PR Set up to have a engagment on the supervisor dashboard in staging. If there are no active engagements, this test will fail
