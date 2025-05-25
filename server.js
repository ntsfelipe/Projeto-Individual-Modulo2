const express = require('express');
const app = express();
const PORT = 3000;
const home = require('./controllers/HomeController');
const events = require('./controllers/EventsController');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const user = require('./controllers/UserController');


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

// Rotas

app.use('/', routes);

app.use('/api', routes);

// Rota principal
app.get('/', home.index);

app.get('/events', events.index);

app.get('/user', user.index);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});