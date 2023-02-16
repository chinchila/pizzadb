.PHONY: all clean build

clean-db:
	npx sequelize-cli db:seed:undo:all
	npx sequelize-cli db:migrate:undo:all

clean: clean-db
	docker-compose down

migrate:
	npx sequelize-cli db:migrate
	npx sequelize-cli db:seed:all

run:
	yarn install
	docker-compose up --force-recreate -V -d

all: clean run migrate 
