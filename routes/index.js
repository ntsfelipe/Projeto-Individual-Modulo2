const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventsController');
const userController = require('../controllers/UserController');
const inscricoesController = require('../controllers/InscricoesController');
const { isAdmin, isAuthenticated } = require('../middleware/auth');

// Home route
router.get('/', (req, res) => {
  res.render('home');
});

// User routes
router.get('/user', userController.index);
router.post('/user', userController.criarUser);
router.post('/user/login', userController.login);
router.get('/user/logout', userController.logout);

// Events routes
router.get('/events', eventController.index);
router.post('/events', isAdmin, eventController.criarEvents);
router.post('/events/edit', isAdmin, eventController.editarEvents);
router.post('/events/delete', isAdmin, eventController.deleteEvents);

// Inscricoes routes
router.get('/inscricoes', isAuthenticated, inscricoesController.index);
router.post('/inscricoes', isAuthenticated, inscricoesController.seInscrever);
router.post('/inscricoes/status', isAdmin, inscricoesController.atualizarStatus);

module.exports = router;
