import { useEffect, useState } from "react";
import api from "../api/axios";

const BorrowedBooks = () => {
  const [borrows, setBorrows] = useState([]);

  useEffect(() => {
    api.get("/my").then(res => setBorrows(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        My Borrowed Books
      </h2>

      {borrows.length === 0 && (
        <p className="text-gray-500 text-center">
          You have not borrowed any books yet.
        </p>
      )}

      <div className="space-y-4">
        {borrows.map(b => (
          <div
            key={b._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            <p className="text-lg font-medium text-gray-800">
              {b.book.title}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Due Date:</span>{" "}
              {new Date(b.dueDate).toDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;
