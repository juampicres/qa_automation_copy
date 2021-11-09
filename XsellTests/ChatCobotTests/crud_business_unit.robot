*** Settings ***
Documentation    Create/ Read/ Update/ Delete for business units in ccb as an admin and IM. Resources file has the steps

Resource    ../../RobotResources/ccb_resources.robot
Resource    ../../RobotResources/crud_bu_resources.robot
Suite Teardown    Close All Browsers

*** Test Cases ***
Create Verify Edit And Delete Business Unit As An Admin
    Login Hiper As An Admin
    Create Verify Edit And Delete Business Unit
    Close Browser
    [Tags]  Sanity  Hiper BU

Create Verify Edit And Delete Business Unit As An Internal Manager
    Login Hiper As An Internal Manager
    Create Verify Edit And Delete Business Unit
    Close Browser
    [Tags]  Sanity  Hiper   BU
