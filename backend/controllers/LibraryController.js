// backend/controllers/LibraryController.js
const Library = require('../models/Library');

const LibraryController = {
  // Get all books
  getAllBooks: async (req, res) => {
    try {
      const books = await Library.find()
        .populate('addedBy', 'username')
        .sort({ addedAt: -1 });
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get book by ID
  getBookById: async (req, res) => {
    try {
      const book = await Library.findById(req.params.id)
        .populate('addedBy', 'username');
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add new book (admin only)
  addBook: async (req, res) => {
    try {
      const book = new Library({
        ...req.body,
        addedBy: req.user.id
      });
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update book (admin only)
  updateBook: async (req, res) => {
    try {
      const book = await Library.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete book (admin only)
  deleteBook: async (req, res) => {
    try {
      const book = await Library.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = LibraryController;