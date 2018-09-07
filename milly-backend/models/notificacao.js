const mongoose = require('mongoose');

const notificacaoSchema = mongoose.Schema({
      mensagem:  {type: String, required: true},
      usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
      lida: {type: String, default: 'N'},
      componente: {type: String}
});

module.exports = mongoose.model('Notificacao', notificacaoSchema);