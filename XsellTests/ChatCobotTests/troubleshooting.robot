*** Settings ***
Documentation     A test for the troubleshooting page. Right now each agent already is part of a business unit that has troubleshooting enabled
Library           SeleniumLibrary
Library           BuiltIn

Resource          ${CURDIR}${/}..${/}..${/}/RobotResources/ccb_resources.robot
Suite Teardown     Close All Browsers

*** Variables ***
${BUSINESS_UNIT_LINK}   xpath=//*[@href="/admin/business_units"]
${USER_NAME_DROPDOWN}   xpath=//*[@class="user-name"]
${TROUBLESHOOTING_LINK}   xpath=//*[@href="/troubleshooting"]
${EDIT_BUSINESS_UNIT_LINK_QA_AUTOMATION}   xpath=//*[@href="/admin/business_units/19/edit"] #this is the BU that the user is part of - qa_automation
${CALL_ID_FIELD}   id=chatId
${TAGS_DROPDOWN}   id=tagOptions
${FREQUENCY_RADIO_BUTTON_VALUE}   Frequently
${OCCURENCE_RADIO_BUTTON}   occurrence
${COMMENT_FIELD}   id=comment
${SUBMIT_BUTTON}   xpath=//*[@class="btn btn-primary"]
${CONFIRMATION_BANNER}  xpath=//*[@style="visibility: visible;"]    #this is only active for >2 seconds. So will need to see how it works in staging

*** Test Cases ***
Go To Troubleshooting Page As An Agent
    Submit A Troubleshooting Ticket As An Agent
    [Tags]  Sanity    Login    Hiper

*** Keywords ***
Submit A Troubleshooting Ticket As An Agent
    Login Hiper As An Agent
    Click Element   ${USER_NAME_DROPDOWN}
    Click Link      ${TROUBLESHOOTING_LINK}
    Select From List By Value    ${TAGS_DROPDOWN}    Topic Switch
    Select Radio Button    ${OCCURENCE_RADIO_BUTTON}  ${FREQUENCY_RADIO_BUTTON_VALUE}
    Radio Button Should Be Set To   ${OCCURENCE_RADIO_BUTTON}  ${FREQUENCY_RADIO_BUTTON_VALUE}
    Input Text    ${COMMENT_FIELD}    This is a comment
    Should Not Be Empty     ${CALL_ID_FIELD}        #https://xsell.atlassian.net/browse/MNT-451
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Element Is Visible   ${CONFIRMATION_BANNER}      #https://xsell.atlassian.net/browse/MNT-441
