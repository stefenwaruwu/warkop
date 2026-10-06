const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (typeof name !== 'string' || !name.trim() || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ message: 'Nama dan pesan wajib diisi.' });
  }

  try {
    await db.query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name.trim(), typeof email === 'string' && email.trim() ? email.trim() : null, message.trim()]
    );
    return res.status(201).json({ message: 'Pesan berhasil dikirim.' });
  } catch (error) {
    console.error('Failed to save contact message:', error.message);
    return res.status(500).json({ message: 'Pesan belum berhasil disimpan. Silakan coba lagi.' });
  }
});

module.exports = router;