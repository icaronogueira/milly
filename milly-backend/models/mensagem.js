const mongoose = require('mongoose');

const mensagemSchema = mongoose.Schema({
      texto:  {type: String, required: true},
      assunto:  {type: String, required: true},
      remetente: {type: String},
      //1-todos, 2-diretores, 3-seguidores de
      tipoDestinatario: {type: Number},
      //se tipoDestinatario=3
      paraDepartamento: {type: mongoose.Schema.Types.ObjectId, ref: 'Departamento', required: false},
      infoUsuario: [{
            usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
            lido: {type: String, default: 'N'},
            removido: {type: String, default: 'N'}
      }]
});

module.exports = mongoose.model('Mensagem', mensagemSchema);