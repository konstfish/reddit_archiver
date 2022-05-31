NAME = reddit_archiver
VERSION = 1.0.0

DEPLOY_ENV = remote
DEFAULT_ENV = default

build:
	docker-compose build

run:
	docker-compose up

deploy:
	docker context use $(DEPLOY_ENV)
	docker-compose --file docker-compose.prod.yml build
	docker-compose up -d
	docker context use $(DEFAULT_ENV)

rm:
	docker-compose down -v --remove-orphans