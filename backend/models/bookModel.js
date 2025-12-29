const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    isbn: {
      type: String,
      unique: true,
      required: true
    },
    category: {
      type: String,
      trim: true
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 1
    },
    copies: {
      type: Number,
      required: true,
      min: 0
    },
    publishedYear: {
      type: Number
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
