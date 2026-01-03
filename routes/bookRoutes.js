const express = require("express");
const router = express.Router();

const {
  createBook,
  getAllBooks,
  getBooksByCategory,
  getBooksAfterYear,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/category/:category", getBooksByCategory);
router.get("/after/2015", getBooksAfterYear);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
