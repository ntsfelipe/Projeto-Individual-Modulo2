// Middleware para verificar se o usuário está autenticado
exports.isAuthenticated = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/user?error=Você precisa fazer login primeiro');
    }
    next();
};

// Middleware para verificar se o usuário é admin
exports.isAdmin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/user?error=Você precisa fazer login primeiro');
    }
    
    if (req.session.user.tipo_usuario !== 'admin') {
        return res.redirect('/events?error=Acesso negado. Apenas administradores podem realizar esta ação');
    }
    
    next();
}; 