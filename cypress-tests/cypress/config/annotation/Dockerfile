FROM node:16-buster-slim

RUN apt-get update                                                       && \
  apt-get install -y --no-install-recommends libgtk2.0-0 libgtk-3-0         \
  libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2          \
  libxtst6 xauth xvfb

RUN npm install -g cypress

WORKDIR /qa_automation/tests

COPY cypress/integration/annotation cypress/

COPY cypress/page-objects /qa_automation/page-objects

COPY cypress/config/annotation/ci.config.json .
