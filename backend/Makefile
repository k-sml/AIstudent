build-local:
	docker-compose build --no-cache --force-rm api

up-local:
	docker-compose up -d api

down-local:
	docker-compose down
	
migrate:
	docker container exec -it aistudent-fastapi bash -c "python main.py"