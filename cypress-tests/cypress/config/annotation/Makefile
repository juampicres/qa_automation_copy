.PHONY: up down build

HA_PATH = ../../../../../hiper_annotation

build:
	DOCKER_BUILDKIT=1 docker image build -t hiper_annotation:cypress --ssh default -f $(HA_PATH)/Dockerfile.e2e $(HA_PATH)

down:
	docker-compose down --remove-orphan

up:
	make down
	make build
	docker-compose run backend rails db:reset
	docker-compose up
