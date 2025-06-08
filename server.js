const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const session = require('express-session');

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', './views/pages');

// Configuração de arquivos estáticos
app.use(express.static('public'));

// Middleware para processar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json());

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

// Middleware para disponibilizar a sessão do usuário em todas as views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Rotas
app.use('/', routes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});