const db = require('../config/db');

const getEvents = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    console.error('getEvents error:', err);
    res.status(500).json({ message: 'Gagal mengambil data event.' });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Event tidak ditemukan.' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('getEventById error:', err);
    res.status(500).json({ message: 'Gagal mengambil data event.' });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, date, status, prize, requirements, register_link } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !date) {
      return res.status(400).json({ message: 'Judul dan tanggal wajib diisi.' });
    }

    const [result] = await db.query(
      'INSERT INTO events (title, description, image, date, status, prize, requirements, register_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', image, date, status || 'SEGERA', prize || '', requirements || '', register_link || '']
    );

    const [newEvent] = await db.query('SELECT * FROM events WHERE id = ?', [result.insertId]);
    res.status(201).json(newEvent[0]);
  } catch (err) {
    console.error('createEvent error:', err);
    res.status(500).json({ message: 'Gagal menambah event.' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, status, prize, requirements, register_link } = req.body;

    const [existing] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Event tidak ditemukan.' });
    }

    const image = req.file ? req.file.filename : existing[0].image;

    await db.query(
      'UPDATE events SET title=?, description=?, image=?, date=?, status=?, prize=?, requirements=?, register_link=? WHERE id=?',
      [
        title || existing[0].title,
        description !== undefined ? description : existing[0].description,
        image,
        date || existing[0].date,
        status || existing[0].status,
        prize !== undefined ? prize : existing[0].prize,
        requirements !== undefined ? requirements : existing[0].requirements,
        register_link !== undefined ? register_link : existing[0].register_link,
        id,
      ]
    );

    const [updated] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (err) {
    console.error('updateEvent error:', err);
    res.status(500).json({ message: 'Gagal mengupdate event.' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Event tidak ditemukan.' });
    }

    await db.query('DELETE FROM events WHERE id = ?', [id]);
    res.json({ message: 'Event berhasil dihapus.' });
  } catch (err) {
    console.error('deleteEvent error:', err);
    res.status(500).json({ message: 'Gagal menghapus event.' });
  }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
