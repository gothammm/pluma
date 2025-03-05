WEB_DIR := apps/web
API_DIR := apps/api


start: 
	overmind start

setup:
	cd $(WEB_DIR) && pnpm install
	cd $(API_DIR) && python -m venv .venv
	cd $(API_DIR) && source .venv/bin/activate
	cd $(API_DIR) && pip install -r requirements.txt


.PHONY: web
web:
	cd $(WEB_DIR) && npm run dev

.PHONY: api
api:
	cd $(API_DIR) && uvicorn main:app --reload

format:
	cd $(API_DIR) && black . && isort .
