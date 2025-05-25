// controllers/TarefaController.js
const pool = require('../config/database');

exports.index = (req, res) => {
    res.render('events');
}

exports.criarEvents = async (req, res) => {
    const { titulo, descricao, data_inicio, local } = req.body;

    const query = 'INSERT INTO events (titulo, descricao, data_inicio, local) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [titulo, descricao, data_inicio, local];

    try {
        const result = await pool.query(query, values);
        const events = result.rows[0];
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 };

 exports.listarEvents = async (req, res) => {
    const query ='SELECT * FROM events' 

    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 };

 exports.editarEvents = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, data_inicio, local} = req.body;

    const query = 'UPDATE events SET titulo = $1, descricao = $2, data_inicio = $3, local = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *';
    const values = [titulo, descricao, data_inicio, local, id];

    try { 
        const result = await pool.query(query, values);
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'evento não econtrado'});
        }
        res.status(200).json(result.rows[0]);

    }   catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

 exports.deleteEvents = async (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM events WHERE id = $1 RETURNING *';
    const values = [id];

      try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json({ message: 'Evento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
    }
 }