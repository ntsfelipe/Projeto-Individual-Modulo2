const EventsModel = require('../models/events');

exports.index = async (req, res) => {
  try {
    const events = await EventsModel.listarEvents();
    res.render('events', { 
      events: events || [], 
      user: req.session?.user,
      success: req.query.success,
      error: req.query.error
    });
  } catch (error) {
    res.render('events', { 
      events: [], 
      error: 'Erro ao carregar eventos',
      user: req.session?.user
    });
  }
};

exports.criarEvents = async (req, res) => {
  if (!req.session || !req.session.user || req.session.user.tipo_usuario !== 'admin') {
    return res.redirect('/events?error=Apenas administradores podem criar eventos');
  }

  const { titulo, descricao, data_inicio, local, vagas_totais } = req.body;

  if (!titulo || !descricao || !data_inicio || !local || !vagas_totais) {
    return res.redirect('/events?error=Todos os campos são obrigatórios');
  }

  try {
    await EventsModel.criarEvents({ titulo, descricao, data_inicio, local, vagas_totais });
    res.redirect('/events?success=Evento criado com sucesso');
  } catch (error) {
    res.redirect('/events?error=' + error.message);
  }
};

exports.listarEvents = async (req, res) => {
  try {
    const events = await EventsModel.listarEvents();
    res.render('events', { 
      events,
      user: req.session && req.session.user ? req.session.user : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editarEvents = async (req, res) => {
  if (!req.session || !req.session.user || req.session.user.tipo_usuario !== 'admin') {
    return res.redirect('/events?error=Apenas administradores podem editar eventos');
  }

  const id = parseInt(req.body.id);
  const { titulo, descricao, data_inicio, local, vagas_totais } = req.body;

  if (!id || isNaN(id)) {
    return res.redirect('/events?error=ID inválido');
  }

  // Criar um objeto com apenas os campos preenchidos
  const updateData = {};
  if (titulo) updateData.titulo = titulo;
  if (descricao) updateData.descricao = descricao;
  if (data_inicio) updateData.data_inicio = data_inicio;
  if (local) updateData.local = local;
  if (vagas_totais) updateData.vagas_totais = vagas_totais;

  if (Object.keys(updateData).length === 0) {
    return res.redirect('/events?error=Nenhum campo para atualizar foi fornecido');
  }

  try {
    const result = await EventsModel.editarEvents(id, updateData);
    if (!result.rows || result.rows.length === 0) {
      return res.redirect('/events?error=Evento não encontrado');
    }
    res.redirect('/events?success=Evento atualizado com sucesso');
  } catch (error) {
    res.redirect('/events?error=' + error.message);
  }
};

exports.deleteEvents = async (req, res) => {
  if (!req.session || !req.session.user || req.session.user.tipo_usuario !== 'admin') {
    return res.redirect('/events?error=Apenas administradores podem deletar eventos');
  }

  const id = parseInt(req.body.id);

  if (!id || isNaN(id)) {
    return res.redirect('/events?error=ID inválido');
  }

  try {
    const result = await EventsModel.deletarEvents(id);
    if (!result.rows || result.rows.length === 0) {
      return res.redirect('/events?error=Evento não encontrado');
    }
    res.redirect('/events?success=Evento deletado com sucesso');
  } catch (error) {
    res.redirect('/events?error=' + error.message);
  }
};
