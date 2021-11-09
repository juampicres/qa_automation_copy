*** Settings ***
Documentation     A test suite with mulitiple login/logout tests
Library     SeleniumLibrary

Resource          ${CURDIR}${/}..${/}..${/}/RobotResources/ccb_resources.robot

*** Variables ***
${INCORRECT_EMAIL}              test@test.com
${INCORRECT_PW}                 test
${FORGOT_PASSWORD_LINK}         xpath=//*[@href="/users/password/new"]
${USER_EMAIL_FIELD}             id=user_email
${RESET_PASSWORD_INSTRUCTIONS}  xpath=//*[@class="btn btn-primary"]

*** Test Cases ***
Login to Hiper Agent
    Login Hiper As An Agent
    Close Browser
    [Tags]  Sanity    Login    Hiper

Logout Hiper Agent
    Logout Of Hiper As An Agent
    Close Browser
    [Tags]  Sanity    Login    Hiper

Login to Hiper Admin
    Login Hiper As An Admin
    Close Browser
    [Tags]  Sanity    Login    Hiper

Logout Hiper Admin
    Logout Of Hiper As An Admin
    Close Browser
    [Tags]  Sanity    Login    Hiper

Login to Hiper Internal Manager
    Login Hiper As An Internal Manager
    Close Browser
    [Tags]  Sanity    Login    Hiper

Logout Hiper Internal Manager
    Logout Of Hiper As An Internal Manager
    Close Browser
    [Tags]  Sanity    Login    Hiper

Login to Hiper Center Manager
    Login Hiper As An Center Manager
    Close Browser
    [Tags]  Sanity    Login    Hiper

Logout Hiper Center Manager
    Logout Of Hiper As An Center Manager
    Close Browser
    [Tags]  Sanity    Login    Hiper

Login With Incorrect Credentials
    Log Into Application    ${INCORRECT_EMAIL}  ${INCORRECT_PW}
    Wait Until Page Contains     Invalid Email or password
    Close Browser

Forgot Your Password
    Open Browser To     ${WEB_URL}  ${BROWSER}
    Click Link  ${FORGOT_PASSWORD_LINK}
    Input Text  ${USER_EMAIL_FIELD}     ${INCORRECT_EMAIL}
    Click Element   ${RESET_PASSWORD_INSTRUCTIONS}
    Wait Until Page Contains    If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.
    Close Browser
