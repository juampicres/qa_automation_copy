*** Settings ***
Documentation    Create/ Read/ Update/ Delete for all user roles that are allowed. Resources file has the steps
Library     SeleniumLibrary

Resource          ../../RobotResources/ccb_resources.robot
Resource          ../../RobotResources/crud_agent_user_role_resources.robot
Resource          ../../RobotResources/crud_cm_user_role_resources.robot
Resource          ../../RobotResources/crud_admin_user_role_resources.robot
Resource          ../../RobotResources/crud_spm_user_role_resources.robot
Resource          ../../RobotResources/crud_im_user_role_resources.robot
Suite Teardown    Close All Browsers

*** Test Cases ***
Create Verify Edit And Delete Agent As An Admin
    Login Hiper As An Admin
    Create Verify Edit And Delete Agent
    Close Browser
    [Tags]  Sanity  Hiper   Agents

Create Verify Edit And Delete Agent As An Internal Manager
    Login Hiper As An Internal Manager
    Create Verify Edit And Delete Agent
    Close Browser
    [Tags]  Sanity  Hiper   Agents

Create Verify Edit And Delete Agent As An Strategic Partner Manager
    Login Hiper As An Strategic Partner Manager
    Create Verify Edit And Delete Agent
    Close Browser
    [Tags]  Sanity  Hiper   Agents

Create Verify Edit And Delete Center Manager As An Admin
    Login Hiper As An Admin
    Create Verify Edit And Delete Center Manager
    Close Browser
    [Tags]  Sanity  Hiper   Cm

Create Verify Edit And Delete Center Manager As An Internal Manager
    Login Hiper As An Internal Manager
    Create Verify Edit And Delete Center Manager
    Close Browser
    [Tags]  Sanity  Hiper   Cm

Create Verify Edit And Delete Center Manager As An Strategic Partner Manager
    Login Hiper As An Strategic Partner Manager
    Create Verify Edit And Delete Center Manager
    Close Browser
    [Tags]  Sanity  Hiper   Cm

Create Verify Edit And Delete Strategic Partner Manager As An Admin
    Login Hiper As An Admin
    Create Verify Edit And Delete Strategic Partner Manager
    Close Browser
    [Tags]  Sanity  Hiper   SPM

Create Verify Edit And Delete Strategic Partner Manager As An Internal Manager
    Login Hiper As An Internal Manager
    Create Verify Edit And Delete Strategic Partner Manager
    Close Browser
    [Tags]  Sanity  Hiper   SPM

Create Verify Edit And Delete Internal Manager As An Admin
    Login Hiper As An Admin
    Create Verify Edit And Delete Internal Manager
    Close Browser
    [Tags]  Sanity  Hiper   IM

Create Verify Edit And Delete Admin
    Login Hiper As An Admin
    Create Verify Edit And Delete Admin
    Close Browser
    [Tags]  Sanity  Hiper   Admin
