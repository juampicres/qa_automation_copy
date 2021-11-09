*** Settings ***
Documentation    Create/ Read/ Update/ Delete locations in CCB as an Admin. Resources file has the steps.

Resource    ../../RobotResources/ccb_resources.robot
Resource    ../../RobotResources/crud_locations_resources.robot

*** Test Cases ***
Create Verify Edit And Delete Location As An Admin
    Login Hiper As An Admin
    Create Verify Edit And Delete Location
    Close Browser
    [Tags]  Sanity  Hiper Locations
