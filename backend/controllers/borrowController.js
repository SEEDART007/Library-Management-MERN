const Borrow = require("../models/borrowModel");
const Book = require("../models/bookModel");


exports.issueBook = async (req, res) => {
  try {
    const { bookId } = req.body;
 
    const book = await Book.findById(bookId);
    if (!book) { 
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.copies < 1) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Create borrow record
    const borrow = await Borrow.create({
      user: req.user.id,
      book: bookId,
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    // Reduce book copies
    book.copies -= 1;
    await book.save();

    res.status(201).json({
      message: "Book issued successfully",
      borrow
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow || borrow.returnDate) {
      return res.status(400).json({ message: "Invalid borrow record" });
    }

    borrow.returnDate = new Date();
    await borrow.save();

    // Increase book copies
    const book = await Book.findById(borrow.book);
    book.copies += 1;
    await book.save();

    res.json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get borrowed books by user
 * @route   GET /api/borrow/my
 * @access  Member
 */
exports.myBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user.id })
      .populate("book", "title author")
      .sort({ createdAt: -1 });

    res.json(borrows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get overdue books
 * @route   GET /api/borrow/overdue
 * @access  Admin/Librarian
 */
exports.overdueBooks = async (req, res) => {
  try {
    const today = new Date();

    const overdue = await Borrow.find({
      dueDate: { $lt: today },
      returnDate: null
    })
      .populate("user", "name email")
      .populate("book", "title");

    res.json(overdue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBorrowedBooks = async (req, res) => {
  try {
    const borrows = await Borrow.find()
      .populate("book", "title author isbn")
      .populate("user", "name email role")
      .sort({ issueDate: -1 });

    const formatted = borrows.map(b => ({
      borrowId: b._id,
      book: b.book,
      user: b.user,
      issueDate: b.issueDate,
      dueDate: b.dueDate,
      returnDate: b.returnDate,
      status: b.status,
      overdue:
        b.status === "issued" && new Date() > b.dueDate
    }));

    res.status(200).json({
      total: formatted.length,
      borrows: formatted
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};