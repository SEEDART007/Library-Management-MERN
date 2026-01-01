const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const {
  issueBook,
  returnBook,
  myBorrows,
  overdueBooks,
  getAllBorrowedBooks
} = require("../controllers/borrowController");

router.post("/", auth, role(["member"]), issueBook);
router.post("/return", auth, role(["member"]), returnBook);
router.get("/my", auth, role(["member"]), myBorrows);
router.get("/overdue", auth, role(["admin", "librarian"]), overdueBooks);

router.get(
  "/all",
  auth,
  role(["admin", "librarian"]),
  getAllBorrowedBooks
);

module.exports = router;
