dev:
	docker-compose up

start:
	docker-compose up -d

setup:
	 docker-compose exec server node ./scripts/setup.js

seed:
	 docker-compose exec server node ./scripts/seed.js

login-client:
	docker exec -it javelin_client sh

login-server:
	docker exec -it javelin_server sh

login-database:
	docker exec -it javelin_database mongo
