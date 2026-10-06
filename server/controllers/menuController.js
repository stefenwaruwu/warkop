const db = require('../config/db');

const getMenus = async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM menus ORDER BY created_at DESC';
    let params = [];

    if (category && category !== 'Semua') {
      query = 'SELECT * FROM menus WHERE category = ? ORDER BY created_at DESC';
      params = [category];
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error('getMenus error:', err);
    res.status(500).json({ message: 'Gagal mengambil data menu.' });
  }
};

const createMenu = async (req, res) => {
  try {
    const { name, category, price, description, badge } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Nama, kategori, dan harga wajib diisi.' });
    }

    const [result] = await db.query(
      'INSERT INTO menus (name, category, price, description, image, badge) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, price, description || '', image, badge || '']
    );

    const [newMenu] = await db.query('SELECT * FROM menus WHERE id = ?', [result.insertId]);
    res.status(201).json(newMenu[0]);
  } catch (err) {
    console.error('createMenu error:', err);
    res.status(500).json({ message: 'Gagal menambah menu.' });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description, badge } = req.body;

    const [existing] = await db.query('SELECT * FROM menus WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Menu tidak ditemukan.' });
    }

    const image = req.file ? req.file.filename : existing[0].image;

    await db.query(
      'UPDATE menus SET name=?, category=?, price=?, description=?, image=?, badge=? WHERE id=?',
      [
        name || existing[0].name,
        category || existing[0].category,
        price || existing[0].price,
        description !== undefined ? description : existing[0].description,
        image,
        badge !== undefined ? badge : existing[0].badge,
        id,
      ]
    );

    const [updated] = await db.query('SELECT * FROM menus WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (err) {
    console.error('updateMenu error:', err);
    res.status(500).json({ message: 'Gagal mengupdate menu.' });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await db.query('SELECT * FROM menus WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Menu tidak ditemukan.' });
    }

    await db.query('DELETE FROM menus WHERE id = ?', [id]);
    res.json({ message: 'Menu berhasil dihapus.' });
  } catch (err) {
    console.error('deleteMenu error:', err);
    res.status(500).json({ message: 'Gagal menghapus menu.' });
  }
};

module.exports = { getMenus, createMenu, updateMenu, deleteMenu };
