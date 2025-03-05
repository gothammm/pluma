from typing import Union

from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from routes import accounts_router, transaction_router
from routes.transaction_routes import router as transaction_router

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.get("/")
def read_root():
    return {"Hello": "World"}
