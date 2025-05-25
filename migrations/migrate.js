const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

async function migrate() {
  try {
    await client.connect();

    // Criação da tabela events
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        criado_em TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('Migração concluída com sucesso!');
  } catch (err) {
    console.error('Erro ao executar a migração:', err);
  } finally {
    await client.end();
  }
}

migrate();