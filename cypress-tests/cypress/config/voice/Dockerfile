FROM node:16-buster-slim

RUN apt-get update                             && \
  apt-get install -y --no-install-recommends      \
  libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev \
  libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

WORKDIR /qa_automation/tests

COPY package.json package-lock.json ./

RUN npm install

COPY cypress/integration/voice cypress/integration

COPY cypress/page-objects page-objects

COPY cypress/support support

COPY cypress/apis apis

COPY cypress/plugins plugins

COPY cypress/fixtures/voice fixtures/voice

COPY cypress/config/voice/ci.config.json applitools.config.js ./

COPY cypress/tsconfig.json .
