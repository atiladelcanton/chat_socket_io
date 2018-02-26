module.exports.iniciaChat = function (application, req, res) {

    let dadosForm = req.body;
    req.assert('apelido', 'Nome ou Apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou Apelido deve conter entre 3 e 15 caracters').len(3, 15);
    let errors = req.validationErrors();
    if (errors) {
        res.render('index', {validacao: errors});
        return;
    }
    application.get('io').emit('msgParaCliente', {
        apelido: dadosForm.apelido,
        mensagem: ' Acabou de entrar no chat'
    });

    res.render('chat', {dadosForm: dadosForm});
};