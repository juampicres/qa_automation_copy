*** Settings ***
Variables    ${CURDIR}${/}..${/}/config.py
Library     BuiltIn
Library     SeleniumLibrary
Library     Collections

*** Variables ***
${EMAIL_FIELD}         id=user_email
${PASSWORD_FIELD}      id=user_password
${SIGN_IN_BUTTON}      xpath=//*[@class="btn btn-primary"]
${AGENT_UTILIZATION}   id=agent-utilization
${ADMIN_DASHBOARD}     id=page_title
${USER_NAME_DROPDOWN}  xpath=//*[@class="user-name"]
${LOGOUT_LINK}         xpath=//*[@href="/users/sign_out"]
${LOGOUT_BUTTON}       id=logout
${HIPER_EMAIL_FIELD}   id=admin_user_email
${HIPER_PW_FIELD}      id=admin_user_password
${HIPER_LOGIN_BUTTON}  id=admin_user_submit_action
${LOGIN_SUCCESS}   xpath=//*[@class="flash flash_notice"]
${LOGIN_SUCCESSFULLY_MESSAGE}   Signed in successfully.

*** Keywords ***
Open Browser To
    [Arguments]     ${url}  ${browser}  ${alias}=None
    Open Browser    ${url}  ${browser}  ${alias}
    Maximize Browser Window
    Set Selenium Implicit Wait  ${WAIT_TIME}
    Set Screenshot Directory    ${CURDIR}${/}..${/}/Screenshots

Enter Email and Password
    [Arguments]     ${email}    ${password}
    Input Text      ${EMAIL_FIELD}      ${email}
    Input Text      ${PASSWORD_FIELD}   ${password}
    Click Element   ${SIGN_IN_BUTTON}

Log Into Application
    [Arguments]    ${email}     ${pw}
    Open Browser To     ${WEB_URL}  ${BROWSER}
    Enter Email and Password     ${email}     ${pw}

Login Hiper As An Agent
    Log Into Application    ${AGENT_EMAIL}     ${AGENT_PW}
    Wait Until Element Is Visible   ${AGENT_UTILIZATION}

Logout Of Hiper As An Agent
    Login Hiper As An Agent
    Click Element    ${USER_NAME_DROPDOWN}
    Click Link    ${LOGOUT_LINK}
    Wait Until Location Contains    ${WEB_URL}

Login Hiper As An Admin
    Log Into Application    ${ADMIN_EMAIL}     ${ADMIN_PW}
    Wait Until Element Is Visible   ${ADMIN_DASHBOARD}

Logout Of Hiper As An Admin
    Login Hiper As An Admin
    Click Link    ${LOGOUT_LINK}
    Wait Until Location Contains    ${WEB_URL}

Login Hiper As An Internal Manager
    Log Into Application    ${IM_EMAIL}     ${IM_PW}
    Wait Until Element Is Visible   ${ADMIN_DASHBOARD}

Logout Of Hiper As An Internal Manager
    Login Hiper As An Internal Manager
    Click Link    ${LOGOUT_LINK}
    Wait Until Location Contains    ${WEB_URL}

Login Hiper As An Center Manager
    Log Into Application    ${CM_EMAIL}     ${CM_PW}
    Wait Until Element Is Visible   ${ADMIN_DASHBOARD}

Logout Of Hiper As An Center Manager
    Login Hiper As An Center Manager
    Click Link    ${LOGOUT_LINK}
    Wait Until Location Contains    ${WEB_URL}

Login Hiper As An Strategic Partner Manager
    Log Into Application    ${SPM_EMAIL}     ${SPM_PW}
    Wait Until Element Is Visible   ${ADMIN_DASHBOARD}

Logout Of Hiper As An Strategic Partner Manager
    Login Hiper As An Strategic Partner Manager
    Click Link    ${LOGOUT_LINK}
    Wait Until Location Contains    ${WEB_URL}

Login To Hiper Engage   # page ids are different on this login page
    [Arguments]         ${email}     ${pw}
    Open Browser To     ${STAGING_ENGAGE_HIPER_URL}  ${BROWSER}     #referenced in config.py
    Input Text          ${HIPER_EMAIL_FIELD}      ${ADMIN_EMAIL}
    Input Text          ${HIPER_PW_FIELD}    ${ADMIN_PW}
    Click Element       ${HIPER_LOGIN_BUTTON}
    Wait Until Element Is Visible       ${LOGIN_SUCCESS}
    Element Text Should Be      ${LOGIN_SUCCESS}  ${LOGIN_SUCCESSFULLY_MESSAGE}
