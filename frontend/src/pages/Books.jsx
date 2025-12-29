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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <h3 className="text-lg font-medium text-gray-600">
          Loading books...
        </h3>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <h3 className="text-lg font-medium text-red-500">{error}</h3>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Available Books
      </h2>

      {books.length === 0 && (
        <p className="text-gray-500 text-center">
          No books available
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition"
          >
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              {book.title}
            </h4>

            <p className="text-gray-600">
              <span className="font-medium">Author:</span> {book.author}
            </p>

            <p className="text-gray-600 mb-4">
              <span className="font-medium">Copies:</span> {book.copies}
            </p>

            <button
              onClick={() => issueBook(book._id)}
              disabled={book.copies === 0}
              className={`w-full py-2 rounded-lg font-medium transition
                ${
                  book.copies === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {book.copies === 0 ? "Not Available" : "Issue"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
