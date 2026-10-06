const bcrypt = require('bcryptjs');
const pool = require('./config/db');

async function fixAdmin() {
    try {
        const passwordHash = await bcrypt.hash('qwertyuiop123', 10);
        
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', ['deapvn']);
        if (rows.length > 0) {
            await pool.query('UPDATE users SET password = ? WHERE username = ?', [passwordHash, 'deapvn']);
            console.log('Admin user password updated successfully!');
        } else {
            await pool.query(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                ['deapvn', passwordHash, 'admin']
            );
            console.log('Admin user "deapvn" inserted successfully!');
        }
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

fixAdmin();
