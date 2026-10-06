const express = require('express');
const router = express.Router();
const { getGalleries, createGallery, deleteGallery } = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadGallery } = require('../middleware/upload');

router.get('/', getGalleries);
router.post('/', authMiddleware, uploadGallery, createGallery);
router.delete('/:id', authMiddleware, deleteGallery);

module.exports = router;
