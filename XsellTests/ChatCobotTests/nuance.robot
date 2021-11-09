*** Settings ***
Documentation    End to end test for a engagement with Nuance on staging. Test for authenticating with Nuance from Engage
Library     SeleniumLibrary
Library     BuiltIn
Resource    ../../RobotResources/ccb_resources.robot
Suite Teardown    Repeat If Any Tests Failed

*** Variables ***
${NUANCE_USERNAME_FIELD}        id=username
${NUANCE_PASSWORD_FIELD}        id=password
${LOGIN_BUTTON}                 xpath=//*[@class='submit']
${NUANCE_CHAT_PAGE}             xpath=//*[@class='ember-application']
${HIPER_IFRAME}                 xpath=//div[@class='nuance-component nuance-floating-element is-active ember-view']//iframe
${HIPER_RECOMMENDATIONS}        xpath=//*[@class='list-group mb-0 position-relative']
${HIPER_CARD_BODY}              xpath=//*[@class='card-body']
${HIPER_CHAPTER_LABEL}          xpath=//*[@class='badge badge-success pull-right chapter-label']
${CHAT_BUBBLE_BUTTON}           id=tc-chat-bubble-msg
${CONTINUE_BUTTON}              xpath=//*[@class='inq-2252-btn']
${CHAT_BOX}                     id=tcChat_txtInput_input
${CHAT_MESSAGE}                 I want to add a line
${TOPIC_LABEL}                  Add a line
${SEND_BUTTON}                  id=tcChat_btnSend_img
${EMAIL_FIELD}                  id=user_email
${PASSWORD_FIELD}               id=user_password
${SIGN_IN_BUTTON}               xpath=//*[@class='btn btn-primary']
${NUANCE_INTEGRATIONS_LINK}     xpath=//*[@href='/admin/nuance_integrations']
${NUANCE_AUTHENTICATE_LINK}     xpath=//*[@href='/admin/nuance_integrations/authenticate']
${SUCCESS_MESSAGE}              xpath=//*[contains(text(), 'Authentication Successful')]

*** Test Cases ***
CCB Nuance Integration Test
    Nuance End To End Test
    [Tags]  Sanity  Hiper   Nuance

CCB Nuance Dashboard Authenticate Test
    Go To Nuance Dashboard And Authenticate
    [Tags]  Sanity  Hiper   Nuance

*** Keywords ***
Login To Nuance
    Open Browser To    ${NUANCE_WEB_URL}  ${BROWSER}    alias=NuancePage
    &{aliases}  Get Browser Aliases     	# &{aliases} = {NuancePage=1|AttPage=2}
    Log     ${aliases.NuancePage}   #logs 1
    Set Suite Variable   ${NUANCE_PAGE_ALIAS}  ${aliases.NuancePage}     #sets 1 to the variable that is used later to switch browsers
    Input Text   ${NUANCE_USERNAME_FIELD}     ${NUANCE_USERNAME}
    Input Text   ${NUANCE_PASSWORD_FIELD}    ${NUANCE_PW}
    CLick Button    ${LOGIN_BUTTON}
    Sleep   ${WAIT_TIME}    #It takes awhile to login to nuance
    Wait Until Page Contains Element     ${NUANCE_CHAT_PAGE}

Go To Att Test Site And Start Chat
    Open Browser To     ${ATT_TEST_URL}  ${BROWSER}     alias=AttPage
    Reload Page     # the chat bubble doesn't display up the first time the page loads
    Sleep   ${WAIT_TIME}    #the chat bubble takes a while to load.
    Wait Until Page Contains Element    ${CHAT_BUBBLE_BUTTON}
    Double Click Element   ${CHAT_BUBBLE_BUTTON}
    Input Text  ${CHAT_BOX}     ${CHAT_MESSAGE}
    Click Element   ${SEND_BUTTON}

Go to Nuance Log Into Hiper And Validate Recommendations
    Switch Browser   ${NUANCE_PAGE_ALIAS}     # alias. Switches To The Nuance Page. Variable is set in previous keyword
    Select Frame    ${HIPER_IFRAME}         # selects Hiper i-frame and its the 3rd iframe on the page
    Input Text  ${EMAIL_FIELD}  ${AGENT_EMAIL}      #enters email address
    Input Text  ${PASSWORD_FIELD}   ${AGENT_PW}     #enters password
    Wait Until Page Contains Element   ${SIGN_IN_BUTTON}
    Double Click Element   ${SIGN_IN_BUTTON}
    Wait Until Page Contains Element    ${HIPER_RECOMMENDATIONS}    # Recommendations list should display
    Element Text Should Be  ${HIPER_CARD_BODY}  ${CHAT_MESSAGE}   # matching 'I want to add a line'
    Element Text Should Be  ${HIPER_CHAPTER_LABEL}  ${TOPIC_LABEL}   # topic should be 'Add a line'

Log Into Att Staging As An Agent And Validate Recommedations  #back up if test can't find the iframe
    Login Hiper As An Agent
    Wait Until Page Contains Element    ${HIPER_RECOMMENDATIONS}    # Recommendations list should display
    Element Text Should Be  ${HIPER_CARD_BODY}  ${CHAT_MESSAGE}   # matching 'I want to add a line'
    Element Text Should Be  ${HIPER_CHAPTER_LABEL}  ${TOPIC_LABEL}

Nuance End To End Test
    Login To Nuance
    Go To Att Test Site And Start Chat
    Go to Nuance Log Into Hiper And Validate Recommendations

Go To Nuance Dashboard And Authenticate
    Login To Hiper Engage    ${ADMIN_EMAIL}     ${ADMIN_PW}     #declared in ccb_resources
    Click Link  ${NUANCE_INTEGRATIONS_LINK}
    Click Link  ${NUANCE_AUTHENTICATE_LINK}
    Wait Until Page Contains Element   ${SUCCESS_MESSAGE}   #"Authentication Successfull" message should display

Repeat If Any Tests Failed
    Close All Browsers
    Run Keyword If Any Tests Failed     Log Into Att Staging As An Agent And Validate Recommedations  #the iframe is brittle
    Close All Browsers
