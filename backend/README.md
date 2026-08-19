# LIL Backend (FastAPI)

## Prerequisites
- Python 3.12+
- MongoDB (local or Atlas)
- Redis (optional but recommended)

## Installation
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Environment variables
```bash
cp .env.example .env
```
Update values in `.env`.

## MongoDB setup
- Local: `mongodb://localhost:27017`
- Atlas: replace `MONGODB_URI` with Atlas connection string.

## Redis setup
- Optional for local development.
- If unavailable, leave `REDIS_URL` unset.

## Running FastAPI
```bash
cd backend
uvicorn app.main:app --reload
```

## Running tests
```bash
cd backend
pytest
```

## API documentation
- Swagger: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Connecting React frontend
Set frontend API base URL to backend host (e.g. `http://localhost:8000/api/v1`).

## MCP configuration
MCP integration entrypoints are in:
- `app/mcp/client.py`
- `app/mcp/registry.py`
- `app/mcp/tools/*`

These are guarded and intended for AI tool orchestration, not direct unrestricted DB access.

## Docker
```bash
cd backend
docker compose up --build
```
