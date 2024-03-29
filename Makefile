DOCKERCMD=docker compose

DOCKERUP=$(DOCKERCMD) up -d
DOCKERDOWN=$(DOCKERCMD) down
DOCKERPS=$(DOCKERCMD) ps
DOCKEREXEC=$(DOCKERCMD) exec

up:
	chmod +x ./devicesService/entrypoint.sh
	@echo "🚀 Starting services..."
	$(DOCKERCMD) build
	$(DOCKERUP)
	@echo "🏁 Services availables"
	$(DOCKERPS)

setup:
	@echo "📦 Setting up database..."
	$(DOCKEREXEC) devices python main.py db:migrate
	$(DOCKEREXEC) devices python main.py db:seed
	@echo "🏁 Database ready"

down:
	@echo "👋 Stopping services..."
	$(DOCKERDOWN)
	@echo "🏁 Services stopped"
