const db = require('../config/db');

const getGalleries = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM galleries ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('getGalleries error:', err);
    res.status(500).json({ message: 'Gagal mengambil data galeri.' });
  }
};

const createGallery = async (req, res) => {
  try {
    const { caption, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ message: 'Gambar wajib diupload.' });
    }

    const [result] = await db.query(
      'INSERT INTO galleries (image, caption, category) VALUES (?, ?, ?)',
      [image, caption || '', category || 'interior']
    );

    const [newItem] = await db.query('SELECT * FROM galleries WHERE id = ?', [result.insertId]);
    res.status(201).json(newItem[0]);
  } catch (err) {
    console.error('createGallery error:', err);
    res.status(500).json({ message: 'Gagal menambah foto galeri.' });
  }
};

const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await db.query('SELECT * FROM galleries WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Foto tidak ditemukan.' });
    }

    await db.query('DELETE FROM galleries WHERE id = ?', [id]);
    res.json({ message: 'Foto berhasil dihapus.' });
  } catch (err) {
    console.error('deleteGallery error:', err);
    res.status(500).json({ message: 'Gagal menghapus foto.' });
  }
};

module.exports = { getGalleries, createGallery, deleteGallery };
