const pool = require('../config/database');

const criarEvents = async ({ titulo, descricao, data_inicio, local, vagas_totais }) => {
  const query = 'INSERT INTO events (titulo, descricao, data_inicio, local, vagas_totais) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [titulo, descricao, data_inicio, local, vagas_totais];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const listarEvents = async () => {
  const query = 'SELECT * FROM events';
  const result = await pool.query(query);
  return result.rows;
};

const editarEvents = async (id, { titulo, descricao, data_inicio, local, vagas_totais }) => {
  const query = 'UPDATE events SET titulo = $1, descricao = $2, data_inicio = $3, local = $4, vagas_totais = $5 WHERE id = $6 RETURNING *';
  const values = [titulo, descricao, data_inicio, local, vagas_totais, id];
  return await pool.query(query, values);
};

const deletarEvents = async (id) => {
  const query = 'DELETE FROM events WHERE id = $1 RETURNING *';
  return pool.query(query, [id]);
};

module.exports = {
  criarEvents,
  listarEvents,
  editarEvents,
  deletarEvents,
};
