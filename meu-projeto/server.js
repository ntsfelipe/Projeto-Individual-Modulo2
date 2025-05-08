const express = require('express');
const app = express();
const PORT = 3000;
const home = require('./controllers/HomeController');

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', './views/pages');

// Configuração de arquivos estáticos
app.use(express.static('public'));

// Middleware para processar JSON
app.use(express.json());

// Rotas
const routes = require('./routes/index');
app.use('/', routes);

// Rota principal
app.get('/', home.index);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});