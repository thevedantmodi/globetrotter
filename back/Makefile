run: *.js
	docker build -t node-app . && docker-compose up --build

clean:
	docker system prune

mega-clean:
	docker-compose down --volumes --remove-orphans; docker system prune;