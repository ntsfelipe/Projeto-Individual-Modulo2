const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function addUpdatedAtColumn() {
  try {
    await client.connect();
    await client.query(`
      ALTER TABLE events ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `);
    console.log('✅ Column updated_at added successfully!');
  } catch (err) {
    console.error('❌ Error adding column:', err);
  } finally {
    await client.end();
  }
}

addUpdatedAtColumn();