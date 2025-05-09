const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');

// Define onde ficam as views
app.set('views', path.join(__dirname, 'views'));

// Define o motor de views
app.set('view engine', 'ejs');

// Define onde ficam os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usa o arquivo de rotas
app.use('/', routes);