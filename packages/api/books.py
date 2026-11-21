from itertools import count
from typing import Annotated

from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel, StringConstraints

router = APIRouter(prefix="/books", tags=["Books"])

BookText = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


class BookCreate(BaseModel):
    title: BookText
    author: BookText


class Book(BookCreate):
    id: int


books: dict[int, Book] = {}
book_ids = count(1)


@router.get("")
async def list_books() -> list[Book]:
    return list(books.values())


@router.post("", status_code=201)
async def add_book(data: BookCreate) -> Book:
    book = Book(id=next(book_ids), title=data.title, author=data.author)
    books[book.id] = book
    return book


@router.delete("/{book_id}", status_code=204)
async def delete_book(book_id: int) -> Response:
    if books.pop(book_id, None) is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return Response(status_code=204)