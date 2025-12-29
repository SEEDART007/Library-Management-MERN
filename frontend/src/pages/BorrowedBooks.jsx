import { useEffect, useState } from "react";
import api from "../api/axios";

const BorrowedBooks = () => {
  const [borrows, setBorrows] = useState([]);

  useEffect(() => {
    api.get("/my").then(res => setBorrows(res.data));
  }, []);

  return (
    <div>
      <h2>My Borrowed Books</h2>
      {borrows.map(b => (
        <div key={b._id}>
          <p>{b.book.title}</p>
          <p>Due: {new Date(b.dueDate).toDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default BorrowedBooks;
