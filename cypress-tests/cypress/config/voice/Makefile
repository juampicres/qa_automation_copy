.PHONY: up down build

VOICE_BACKEND_PATH = ../../../../../voice-backend

build:
	DOCKER_BUILDKIT=1 docker image build -t voice:backend --ssh default -f $(VOICE_BACKEND_PATH)/Dockerfile.e2e $(VOICE_BACKEND_PATH)
	docker-compose build

# Windows
# build:
# 		docker image build -t voice:backend --ssh default='C:\Users\Path\to\.ssh\id_rsa' -f $(VOICE_BACKEND_PATH)\Dockerfile.e2e $(VOICE_BACKEND_PATH)
#		docker-compose build

down:
	docker-compose down --remove-orphan

up:
	make down
	make build
	docker-compose run backend rails db:reset
	docker-compose up
