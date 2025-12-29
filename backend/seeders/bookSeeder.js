const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env")
});
const mongoose = require("mongoose");
const Book = require("../models/bookModel");
const books = require("../data/books");
const dbConfig = require("../db/dbConfig");

const seedBooks = async () => {
  try {
    await dbConfig();
    console.log("Connected to DB for seeding");

    await Book.deleteMany();
    await Book.insertMany(books);

    console.log("Books seeded successfully");
  } catch (error) {
    console.error("Error seeding books:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    process.exit(0);
  }
};

seedBooks();
