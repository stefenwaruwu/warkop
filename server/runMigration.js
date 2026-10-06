require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function run() {
  const sqlPath = path.join(__dirname, 'database', 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  };

  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('Connected to MySQL, running migration...');

    // Split statements and run one by one to continue on non-fatal errors (like duplicate seeds)
    const statements = sql
      .split(/;\s*\n/) // split by semicolon + newline
      .map(s => s.trim())
      .filter(Boolean);

    for (const stmt of statements) {
      try {
        await connection.query(stmt);
      } catch (err) {
        // Log and continue for non-fatal migrations (e.g., duplicate entries)
        console.warn('Statement failed but continuing:', err.code || err.message);
      }
    }

    console.log('Migration finished (errors during seed may be ignored).');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err.message || err);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

run();
