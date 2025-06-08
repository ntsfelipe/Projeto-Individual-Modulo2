const Inscricoes = require('../models/Inscricoes');
const Events = require('../models/events');
const User = require('../models/User');

exports.index = async (req, res) => {
    try {
        const inscricoes = await Inscricoes.index();
        const events = await Events.listarEvents();
        const users = await User.listarUsers();
        
        res.render('inscricoes', { 
            inscricoes, 
            events,
            users,
            user: req.session?.user,
            error: req.query.error,
            success: req.query.success
        });
    } catch (error) {
        res.render('inscricoes', { 
            inscricoes: [], 
            events: [],
            users: [],
            error: 'Erro ao carregar inscrições',
            user: req.session?.user
        });
    }
}

exports.seInscrever = async (req, res) => { 
    try {
        let id_usuario = req.body.id_usuario;
        const id_evento = req.body.id_evento;

        // Se o usuário estiver logado, usa o ID dele
        if (req.session && req.session.user) {
            id_usuario = req.session.user.id;
        }

        if (!id_usuario || !id_evento) {
            return res.redirect('/inscricoes?error=ID do usuário e evento são obrigatórios');
        }

        const inscricao = await Inscricoes.seInscrever(id_evento, id_usuario);
        res.redirect('/inscricoes?success=Inscrição realizada com sucesso');
    } catch (error) {
        res.redirect('/inscricoes?error=' + error.message);
    }
}

exports.atualizarStatus = async (req, res) => {
    // Verifica se existe sessão e usuário antes de acessar
    if (!req.session || !req.session.user || req.session.user.tipo_usuario !== 'admin') {
        return res.redirect('/inscricoes?error=Apenas administradores podem atualizar o status das inscrições');
    }

    try {
        const { id, status } = req.body;
        if (!id || !status) {
            return res.redirect('/inscricoes?error=ID e status são obrigatórios');
        }
        
        const statusValidos = ['pendente', 'ativo', 'expirada'];
        if (!statusValidos.includes(status)) {
            return res.redirect('/inscricoes?error=Status inválido');
        }

        const inscricao = await Inscricoes.atualizarStatus(id, status);
        if (!inscricao) {
            return res.redirect('/inscricoes?error=Inscrição não encontrada');
        }

        res.redirect('/inscricoes?success=Status atualizado com sucesso');
    } catch (error) {
        res.redirect('/inscricoes?error=' + error.message);
    }
}