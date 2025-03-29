import sys
import uuid
from typing import Union

from fastapi import FastAPI, Request, status
from fastapi.concurrency import asynccontextmanager
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from loguru import logger
from pydantic import ValidationError

from routes import accounts_router, categories_router, transaction_router

app = FastAPI()

logger.remove()
logger.add(
    sys.stdout,
    colorize=True,
    level="DEBUG",
    format="{time:YYYY-MM-DD at HH:mm:ss} | <level>{level}</level> | <y>{extra[request_id]}</y> | <c>{name}:{function}:{line}</c> - {message}",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def request_middleware(request, call_next):
    request_id = str(uuid.uuid4())
    with logger.contextualize(request_id=request_id):
        return await call_next(request)


@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    """Catch Pydantic validation errors and return a clean response."""
    errors = exc.errors()
    formatted_errors = [
        {"loc": err["loc"], "msg": err["msg"], "type": err["type"]} for err in errors
    ]

    return JSONResponse(
        status_code=422,
        content={"detail": formatted_errors},
    )


app.include_router(transaction_router, prefix="/transactions")
app.include_router(accounts_router, prefix="/accounts")
app.include_router(categories_router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
