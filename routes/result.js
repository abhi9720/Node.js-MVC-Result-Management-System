const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const authMiddleware = require('../middleware/authMiddleware');

// Show create form
router.get('/create', authMiddleware, resultController.showCreateForm);
router.post('/create', authMiddleware, resultController.createRecord);

// Show edit form
router.get('/edit/:id', authMiddleware, resultController.showEditForm);
router.post('/edit/:id', authMiddleware, resultController.updateRecord);

// Delete record
router.post('/delete/:id', authMiddleware, resultController.deleteRecord);

// Show result details
router.get('/:id', authMiddleware, resultController.showResultDetails);

module.exports = router;
