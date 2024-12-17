// backend/routes/LibraryRoutes.js
const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const LibraryController = require('../controllers/LibraryController');

// Public routes for viewing books (requires authentication but any role can access)
router.get('/', auth, LibraryController.getAllBooks);
router.get('/:id', auth, LibraryController.getBookById);

// Admin only routes
router.post('/', auth, checkRole('admin'), LibraryController.addBook);
router.put('/:id', auth, checkRole('admin'), LibraryController.updateBook);
router.delete('/:id', auth, checkRole('admin'), LibraryController.deleteBook);

module.exports = router;