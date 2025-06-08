const pool = require('../config/database');

module.exports = {
    async index(req, res) {
        const result = await pool.query('SELECT * FROM inscricao');
        return result.rows;
    },

    async seInscrever(id_evento, id_usuario) {
        const query = `
            INSERT INTO inscricao (id_usuario, id_evento, data_inscricao, status)
            VALUES ($1, $2, CURRENT_TIMESTAMP, 'pendente')
            RETURNING *
        `;
        const values = [id_usuario, id_evento];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async atualizarStatus(id, status) {
        const query = `
            UPDATE inscricao 
            SET status = $1
            WHERE id = $2
            RETURNING *
        `;
        const values = [status, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
};