const pool = require('../config/database');
require('dotenv').config();

const User = {
    async findByNome(nome) {
        const query = 'SELECT * FROM users WHERE nome = $1';
        const result = await pool.query(query, [nome]);
        return result.rows[0];
    },

    async criarUser(nome, tipo_usuario) {
        // Verifica se o nome já existe
        const existingUser = await this.findByNome(nome);
        if (existingUser) {
            throw new Error('Este nome de usuário já está cadastrado');
        }

        const query = `
            INSERT INTO users (nome, tipo_usuario)
            VALUES ($1, $2)
            RETURNING *
        `;
        const values = [nome, tipo_usuario];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async listarUsers() {
        const query = 'SELECT * FROM users ORDER BY nome';
        const result = await pool.query(query);
        return result.rows;
    },

    async login(nome) {
        const user = await this.findByNome(nome);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user;
    }
};

module.exports = User;