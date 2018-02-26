/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
let server = app.listen(8081, function () {
    console.log('Servidor online');
});

let io = require('socket.io').listen(server);
app.set('io', io);

/* Create connection for websocker */
io.on('connection', (socket) => {
    console.log('Usuário Conectado');
    socket.on('disconnect', () => {
        console.log('Usuário Deslogou');
    });

    socket.on('msgParaServidor', (data) => {
        socket.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem, minha:true });
    });


    socket.broadcast.on('msgParaServidor', (data) => {
        socket.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem, minha:false });
    });
});
