const modelUser = require('../models/User');

exports.index = async (req, res) => {
    try {
        const users = await modelUser.listarUsers();
        res.render('user', {
            users,
            user: req.session?.user,
            error: req.query.error,
            success: req.query.success
        });
    } catch (error) {
        res.render('user', {
            users: [],
            error: 'Erro ao carregar usuários',
            user: req.session?.user
        });
    }
};

exports.criarUser = async (req, res) => {
    try {
        const { nome, tipo_usuario } = req.body;
        
        if (!nome || !tipo_usuario) {
            return res.redirect('/user?error=Nome e tipo de usuário são obrigatórios');
        }

        await modelUser.criarUser(nome, tipo_usuario);
        res.redirect('/user?success=Usuário cadastrado com sucesso');
    } catch (error) {
        res.redirect('/user?error=' + error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { nome } = req.body;
        
        if (!nome) {
            return res.redirect('/user?error=Selecione um usuário');
        }

        const user = await modelUser.login(nome);
        req.session.user = user;
        res.redirect('/events?success=Login realizado com sucesso');
    } catch (error) {
        res.redirect('/user?error=' + error.message);
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/user?success=Logout realizado com sucesso');
};