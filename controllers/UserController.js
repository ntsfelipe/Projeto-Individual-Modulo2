exports.index = (req, res) => {
    res.render('user', {
      titulo: 'Página de usuário',
      mensagem: 'Página de usuário'
    });
  };