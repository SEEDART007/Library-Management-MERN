import { useEffect, useState } from "react";
import api from "../api/axios";

const BorrowedBooks = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔐 Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ DENY MEMBERS
  if (!user || user.role === "member") {
    return (
      <h2 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        ❌ Access Denied
      </h2>
    );
  }

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const res = await api.get("/all");
        setBorrows(Array.isArray(res.data.borrows) ? res.data.borrows : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load borrowed books");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, []);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Borrowed Books</h1>

      {borrows.length === 0 ? (
        <p>No books are currently borrowed</p>
      ) : (
        borrows.map((b) => (
          <div
            key={b.borrowId || b._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: b.overdue ? "#ffe6e6" : "#f9f9f9"
            }}
          >
            <h3>{b.book?.title || "Unknown Book"}</h3>
            <p><b>Author:</b> {b.book?.author || "Unknown"}</p>

            <hr />

            <p><b>Borrowed By:</b> {b.user?.name || "Unknown"}</p>
            <p><b>Email:</b> {b.user?.email || "Unknown"}</p>

            <p>
              <b>Issued:</b>{" "}
              {b.issueDate ? new Date(b.issueDate).toDateString() : "N/A"}
            </p>
            <p>
              <b>Due:</b>{" "}
              {b.dueDate ? new Date(b.dueDate).toDateString() : "N/A"}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span style={{ color: b.status === "issued" ? "orange" : "green" }}>
                {b.status?.toUpperCase() || "UNKNOWN"}
              </span>
            </p>

            {b.overdue && (
              <p style={{ color: "red", fontWeight: "bold" }}>⚠ Overdue</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BorrowedBooks;
