dev:
	docker-compose up

start:
	docker-compose up -d

login-client:
	docker exec -it fullstack_client sh

login-server:
	docker exec -it fullstack_server sh

login-database:
	docker exec -it fullstack_database mongo
