const pool = require('../config/database');

const criarEvents = async ({ titulo, descricao, data_inicio, local }) => {
  const query = 'INSERT INTO events (titulo, descricao, data_inicio, local) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [titulo, descricao, data_inicio, local];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const listarEvents = async () => {
  const query = 'SELECT * FROM events';
  const result = await pool.query(query);
  return result.rows;
};

const editarEvents = async (id, { titulo, descricao, data_inicio, local }) => {
  const query = 'UPDATE events SET titulo = $1, descricao = $2, data_inicio = $3, local = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *';
  const values = [titulo, descricao, data_inicio, local, id];
  const result = await pool.query(query, values);
  return result.rows;
};

const deletarEvents = async (id) => {
  const query = 'DELETE FROM events WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows;
};

module.exports = {
  criarEvents,
  listarEvents,
  editarEvents,
  deletarEvents,
};
