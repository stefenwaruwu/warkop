const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadEvent } = require('../middleware/upload');

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authMiddleware, uploadEvent, createEvent);
router.put('/:id', authMiddleware, uploadEvent, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

module.exports = router;
