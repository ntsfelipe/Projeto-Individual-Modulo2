const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');

const app = express();

// Configuração da sessão
app.use(session({
    secret: 'sua_chave_secreta_aqui',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // set to true if using https
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

// Middleware para processar JSON e dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para disponibilizar a sessão do usuário em todas as views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Rotas
app.use('/', routes);

// Tratamento de erros 404
app.use((req, res) => {
    res.status(404).render('error', { message: 'Página não encontrada' });
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 