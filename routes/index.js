const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventsController');

// Home route
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/events', eventController.index);

router.post('/events', eventController.criarEvents);
router.get('/events', eventController.listarEvents);
router.put('/events/:id', eventController.editarEvents);
router.delete('/events/:id', eventController.deleteEvents);

module.exports = router;
