*** Settings ***
Documentation    End to end test for a engagement with LivePerson on staging. Since we only have one LivePerson account this has a high chance to fail. This will be executed adhoc.
Library     SeleniumLibrary
Library     BuiltIn
Resource    ../../RobotResources/ccb_resources.robot
Variables   ../../../config.py
Suite Teardown    Repeat If Any Tests Fails

*** Variables ***
${LIVEPERSON_ACCOUNT_NUMBER}    id=siteNumber
${LOGIN_NAME}                   id=userName
${PASSWORD}                     id=sitePass
${SIGN_IN_BUTTON}               id=submitButtonWrapper
${LIVEPERSON_HOMEPAGE}          xpath=//*[@class='vue-main-wrapper']
${LIVEPERSON_ACCEPT_BUTTON}     xpath=//span[text()='Accept']
${HIPER_IFRAME}                 css=iframe[title='XSELL']
${HIPER_RECOMMENDATIONS}        xpath=//*[@class='back-btn-container']
${FREE_CONSULTATION_BUTTON}     xpath=//div[starts-with(@id,'LPMcontainer')]
${CHAT_BOX}                     xpath=//*[@title="Type your message"]
${CHAT_MESSAGE}                 I want to add a line
${SEND_BUTTON}                  xpath=//*[@class='lpc_composer__send-button-asset lpc_desktop']
${HIPER_CARD_BODY}              xpath=//*[@class='card-body']
${HIPER_CHAPTER_LABEL}          xpath=//*[@class='badge badge-success pull-right chapter-label']
${TOPIC_LABEL}                  Add

*** Test Cases ***
LivePerson Integration Test
    LivePerson End To End Test
    [Tags]  Sanity  Hiper

*** Keywords ***
Login To LivePerson Accept New Chat And Validate Recommendations
    Open Browser To     ${LIVEPERSON_URL}  ${BROWSER}
    Input Text   ${LIVEPERSON_ACCOUNT_NUMBER}   ${ACCOUNT_NUMBER}
    Input Text   ${LOGIN_NAME}   ${LOGIN_EMAIL}
    Input Text   ${PASSWORD}   ${LIVEPERSON_PASSWORD}
    CLick Element    ${SIGN_IN_BUTTON}
    Wait Until Page Contains Element    ${LIVEPERSON_HOMEPAGE}
    Click Element   ${LIVEPERSON_ACCEPT_BUTTON}
    Sleep   ${WAIT_TIME}
    Select Frame    ${HIPER_IFRAME}
    Sleep   ${WAIT_TIME}
    Wait Until Page Contains Element    ${HIPER_RECOMMENDATIONS}
    Element Text Should Be  ${HIPER_CARD_BODY}  ${CHAT_MESSAGE}   # matching 'I want to add a line'
    Element Text Should Be  ${HIPER_CHAPTER_LABEL}  ${TOPIC_LABEL}   # topic should be 'Add a line'

Open Verizon Test Site And Click Free Consultation
    Open Browser To     ${VERIZON_TEST_URL}  ${BROWSER}
    Sleep   ${WAIT_TIME}
    Double Click Element    ${FREE_CONSULTATION_BUTTON}
    Input Text  ${CHAT_BOX}     ${CHAT_MESSAGE}
    Click Element   ${SEND_BUTTON}

LivePerson End To End Test
    Open Verizon Test Site And Click Free Consultation
    Login To LivePerson Accept New Chat And Validate Recommendations

Repeat If Any Tests Fails
    Close All Browsers
    Run Keyword If Any Tests Failed     LivePerson End To End Test
    Close All Browsers
