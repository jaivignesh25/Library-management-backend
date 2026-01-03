const Book = require("../models/Book");

// CREATE BOOK
const createBook = async (req, res) => {
  try {
    console.log("REQ BODY ===>", req.body);

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    console.error("CREATE ERROR ===>", error.message);
    res.status(400).json({ error: error.message });
  }
};

// READ ALL BOOKS
const getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// READ BY CATEGORY
const getBooksByCategory = async (req, res) => {
  const books = await Book.find({ category: req.params.category });
  res.json(books);
};

// READ AFTER 2015
const getBooksAfterYear = async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
};

// UPDATE BOOK
const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).json({ message: "Book not found" });

  if (req.body.availableCopies < 0)
    return res.status(400).json({ message: "Negative stock not allowed" });

  Object.assign(book, req.body);
  await book.save();
  res.json(book);
};

// DELETE BOOK (only if copies = 0)
const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies !== 0)
    return res
      .status(400)
      .json({ message: "Cannot delete book with copies" });

  await book.deleteOne();
  res.json({ message: "Book deleted" });
};

module.exports = {
  createBook,
  getAllBooks,
  getBooksByCategory,
  getBooksAfterYear,
  updateBook,
  deleteBook
};
