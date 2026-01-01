from txtai.embeddings import Embeddings
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Load free embedding model
embeddings = Embeddings({
    "path": "sentence-transformers/all-MiniLM-L6-v2"
})

# Your 10 books
books = [
    (0, "Atomic Habits: building good habits, discipline, self improvement"),
    (1, "Deep Work: focus, productivity, deep concentration"),
    (2, "Rich Dad Poor Dad: money, finance, investing"),
    (3, "Ikigai: purpose, happiness, life balance"),
    (4, "Clean Code: writing clean, maintainable software")
]

# Index books (ONE TIME)
embeddings.index(books)

class Query(BaseModel):
    text: str

@app.post("/search")
def search(query: Query):
    results = embeddings.search(query.text, 1)
    book_id = results[0][0]
    return {"book": books[book_id][1]}
