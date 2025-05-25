const EventsModel = require('../models/Events');

exports.index = (req, res) => {
  res.render('events');
};

exports.criarEvents = async (req, res) => {
  const { titulo, descricao, data_inicio, local } = req.body;

  try {
    const event = await EventsModel.criarEvents({ titulo, descricao, data_inicio, local });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarEvents = async (req, res) => {
  try {
    const events = await EventsModel.listarEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editarEvents = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, data_inicio, local } = req.body;

  try {
    const result = await EventsModel.editarEvents(id, { titulo, descricao, data_inicio, local });
    if (result.length === 0) {
      return res.status(404).json({ message: 'evento não econtrado' });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvents = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await EventsModel.deletarEvents(id);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json({ message: 'Evento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
