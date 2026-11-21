from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from books import router

app = FastAPI(title="Books API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["Content-Type"],
)

app.include_router(router)