const express = require('express');
const router = express.Router();
const { getMenus, createMenu, updateMenu, deleteMenu } = require('../controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadMenu } = require('../middleware/upload');

router.get('/', getMenus);
router.post('/', authMiddleware, uploadMenu, createMenu);
router.put('/:id', authMiddleware, uploadMenu, updateMenu);
router.delete('/:id', authMiddleware, deleteMenu);

module.exports = router;
