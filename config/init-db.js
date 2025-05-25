require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const initDb = async () => {
  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        senha VARCHAR(100),
        tipo_usuario VARCHAR(50),
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(100),
        descricao TEXT,
        data_inicio TIMESTAMP,
        data_fim TIMESTAMP,
        local VARCHAR(255),
        vagas_totais INTEGER,
        id_organizador INTEGER,
        FOREIGN KEY (id_organizador) REFERENCES users(id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS inscricao (
        id SERIAL PRIMARY KEY,
        id_usuario INTEGER,
        id_evento INTEGER,
        data_inscricao TIMESTAMP,
        status VARCHAR(50),
        FOREIGN KEY (id_usuario) REFERENCES users(id),
        FOREIGN KEY (id_evento) REFERENCES events(id)
      );
    `);

    console.log('✅ Banco de dados inicializado com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao inicializar o banco de dados:', err);
  } finally {
    await client.end();
  }
};

initDb();
