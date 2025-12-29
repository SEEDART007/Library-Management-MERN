import { useEffect, useState } from "react";
import api from "../api/axios";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books");

        // ✅ IMPORTANT: access array correctly
        setBooks(res.data.books);
      } catch (err) {
        console.error(err);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const issueBook = async (bookId) => {
    try {
      await api.post("/", { bookId });
      alert("Book issued successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to issue book");
    }
  };

  if (loading) return <h3>Loading books...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div>
      <h2>Available Books</h2>

      {books.length === 0 && <p>No books available</p>}

      {books.map(book => (
        <div key={book._id} style={{ marginBottom: "12px" }}>
          <h4>{book.title}</h4>
          <p>Author: {book.author}</p>
          <p>Copies: {book.copies}</p>

          <button
            onClick={() => issueBook(book._id)}
            disabled={book.copies === 0}
          >
            {book.copies === 0 ? "Not Available" : "Issue"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Books;
