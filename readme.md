# QA Automation

## Local Setup

### Windows

Installing Python

1. Go to https://www.python.org/downloads/ and download the latest version of Python (3.9.6), check the 'add to PATH' option when installing

2. Open your command line

	`where python` -> will show you the path
	`python --version` -> will show you the version

	https://docs.python.org/3/using/windows.html

Webdrivers Setup

3. Download Webdrivers: http://www.seleniumhq.org/download/

    chromedriver.exe (Chrome)    https://chromedriver.chromium.org/downloads
    geckodriver.exe (Firefox)    https://github.com/mozilla/geckodriver/releases

	NOTE:
	-- Ensure the webdriver.exe and python.exe (if not done during installation) are added to the environment path
	-- Ensure the webdriver.exe is added to the [scripts] folder where python was installed on your machine

### macOS

Create Python development environment

1. run `brew install pyenv`

	pyenv versions -> prints available & currently set python versions
	pyenv local -> prints python version installed for current project
	pyenv local <`version`> -> set current project python version

2. run `pyenv install 3.9.6`

3. `cd` into directory where Python projects will be kept

4. run `pyenv init -`, ensure that the local version is set to `3.9.6`

5. run `pip install pipenv`

	5a. clone repo, if not already done

Webdrivers Setup

6. Download/install Webdrivers: http://www.seleniumhq.org/download/

    chromedriver (Chrome)		`brew install --cask chromedriver`
    geckodriver (Firefox)   		`brew install geckodriver`

Install Libraries:

	`cd` to the directory where requirements.txt is located
	activate your virtualenv (if not already on)
	run: pip install -r requirements.txt

### Installing Cypress

Install node.js from https://nodejs.org/en/

To check the node version `node --version` My version `v14.16.1`

Latest Version `v16.1.0`

run `npm install`

Create a package.json `npm init -y` - JavaScript Package Manager

`npm install cypress` -> Installs the latest version of Cypress (v7.3.0) If want to install a specific version then `npm install cypress@(version number)`

### Running Cypress Tests

Have `voice-backend`, `voice-frontend` apps running

In `voice-backend` create a user (`User.create(email:'technology@xselltechnologies.com', password: 'Xsell1234', password_confirmation: 'Xsell1234')`)

To run cypress locally `npx cypress open`

To run cypress via CLI headless `npx cypress run`

- To run the Voice Login Test:
	-`npm run Voice`

## After Running the command, make sure to click on the correct file in the Cypress window!

### Adding Applitools for Visual Testing
run `npm install @applitools/eyes-cypress`

run `npx eyes-setup`

run for a mac: `export APPLITOOLS_API_KEY=<YOUR_API_KEY>` for windows: `set APPLITOOLS_API_KEY=<YOUR_API_KEY>`

run cypress tests with logs: `npx cypress open >file.log` Set showLogs to true in applitools.config.js

https://help.applitools.com/hc/en-us/articles/360006914932-How-can-I-enable-Applitools-Eyes-SDK-traces-logs-

## Docker usage. How to run Cypress locally

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)
- There are a couple of commands in the `Makefile` that abstract away the Docker usage.
	- From the directory that contains the `Makefile` run `make up`. This should be the only command required to have all the required services up and running.
	- There are two other utility commands, but they are not needed to have the services running. `make down` to remove all the containers running the services, and `make build` to build the relevant Docker images. **This commands are used in the `make up` instructions, so they are not required to run the tests.**
	- Note: Remember to have the code from the backend and the frontend repositories updated (`git fetch` and `git pull`).


## Docker For Ubuntu

-1.  https://docs.docker.com/engine/install/ubuntu/
-2.  https://docs.docker.com/engine/install/linux-postinstall/ #manage-docker-as-a-non-root-user

-The command 'docker' could not be found in this WSL 2 distro. We recommend activating the WSL integration in Docker Desktop settings.

See https://docs.docker.com/docker-for-windows/wsl/

-Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

`sudo service docker start`

-Check Docker Images
`docker image ls`

https://docs.docker.com/compose/install/
## Application Setup/Final Steps


### Set up the dependent services

Local:
- From the directory that contains the relevant `Makefile` (i.e. `/cypress-tests`), run `make up`.
- Check your local DISPLAY environment variable by using `echo $DISPLAY` command, and set the same value in the `docker-compose.voice-local.yml` file

Annotation local:
- From the directory `/cypress-tests/cypress/config/annotation` run `make up`. This takes care of building the images, preparing the DB, and starting all required services.

### Final steps (for Mac users)

- Install XQuartz to open the Cypress GUI in your host machine
(For ref: https://medium.com/@mreichelt/how-to-show-x11-windows-within-docker-on-mac-50759f4b65cb)

- Run `xhost + 127.0.0.1`

- Changes in `docker-compose.voice-local.yml`
  	environment:
    	- DISPLAY: "host.docker.internal:0"

### Final steps (for Linux users)
-Install Dependencies

`sudo apt-get install x11-xserver-utils`
`sudo apt-get install xorg openbox`

- Run `xhost +local:docker`.

This is necessary in order to open the GUI in your host machine (i.e: outside the Docker container). Run it every time your machine restarts

##Issues
-xhost:  unable to open display ":0"
??? Still need to be looked into? #TODO

To change DISPLAY
`export DISPLAY=`

To check DISPLAY
`echo $DISPLAY`


## Notes

- Adding a new SSH key to your GitHub account
https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account

- The Latest stable Chrome browser and chromedriver
	Chrome browser release schedule: https://www.chromestatus.com/features/schedule

    The Latest Chrome browser version: Version 90.0.4430.212

- Chromedriver release schedule: https://chromedriver.chromium.org/downloads

    Latest chromedriver version: ChromeDriver 90.0.4430.24
	Check your chromedriver version command: `chromedriver --version`

### SSH Issues

ISSUE 1: `could not parse ssh: [default]: invalid empty ssh agent socket, make sure SSH_AUTH_SOCK is set`
This is for Linux
- eval `ssh-agent -s`
- echo $SSH_AUTH_SOCK

For Windows (https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement)
- C:\path\to\voice-backend>`docker image build -t xsell/voice-backend -f Dockerfile.cypress --ssh default='C:\path\to\.ssh\id_rsa' .`

## Using the GUI

- `docker-compose -f docker-compose.voice-local.yml run cypress`

## Executing via command line

- `docker-compose -f docker-compose.cypress.yml run cypress run`

Keep in mind that .yml file for Annotation can be found in config/annotation directory.

## Executing via command line using a specific browser

Execute `docker-compose -f docker-compose.cypress.yml run cypress run --browser chrome`
Available browsers are `electron` (default), `chrome` and `firefox`.
Be careful because this will open a browser window on your local screen, once per test suite.

## To just open cypress
Annotation Local:
- `npm run cy:annotation:local`
Local:
- `npm run cy:local`
Staging:
- `npm run cy:staging`
Prod:
- `npm run cy:production`

## Check CircleCI Workflows - Run this for every Pull Request

- Go to https://app.circleci.com/pipelines/github/XSell/qa_automation
  - There you will notice two workflows: Voice and Annotations
  - Click on the appropriate workflow/ based on what the test is for
    - Annotations: Click Annotation-Master / Annotation-Dev (This will run the tests against `master` and `develop`)
    - Voice: Click voice-main-approved / voice-dev-approved (This will run the tests against `main` and `develop`)
    - Ensure the build is successful and the tests passes (unless there is something broken/ tests are working as expected)
