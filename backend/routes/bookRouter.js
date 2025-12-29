const express = require('express');
const { getAllBooks, createBooks, getBookById } = require('../controllers/bookController');
const authMiddleware = require('../middlewares/auth')
const role = require('../middlewares/role')

const router = express.Router();
router.post("/books", authMiddleware, role(["admin", "librarian"]), createBooks);
router.get("/books",authMiddleware,getAllBooks)
// router.route("/books").get(getAllBooks).post(authMiddleware, role(["admin", "librarian"]),createBooks)
router.route("/books/:id").get(getBookById) 




module.exports = router;