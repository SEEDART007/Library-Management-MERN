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
    (0, "Clean Code: writing clean, maintainable software"),
    (1, "Atomic Habits: building good habits, discipline, self improvement"),
    (2, "The Pragmatic Programmer: tips for professional programming"),
    (3, "Design Patterns: reusable solutions in software engineering"),
    (4, "You Don't Know JS: deep dive into JavaScript"),
    (5, "Introduction to Algorithms: fundamental algorithms and data structures"),
    (6, "The Alchemist: inspirational fiction about following dreams"),
    (7, "Thinking, Fast and Slow: psychology of decision making"),
    (8, "Sapiens: history of humankind from ancient to modern times"),
    (9, "Deep Work: focus, productivity, deep concentration")
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
