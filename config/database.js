let mongoose = require('mongoose');

module.exports = function(uri) {
    mongoose.connect(uri);
    mongoose.connection.on('connected', function() {
        console.log("Conectado em " + uri)
    });
    mongoose.connection.on('disconnected', function() {
        console.log("Desconectado de " + uri)
    });
    mongoose.connection.on('error', function(e) {
        console.log("Falha na conexão " + e)
    });
    mongoose.set('debug', true);
}