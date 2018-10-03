const mongoose = require('mongoose');

const eventosSchema = mongoose.Schema({
      departamento: {type: mongoose.Schema.Types.ObjectId, ref: 'Departamento', required: true},
      para: {type: String},
      idCartaz:     {type: String, required: true, default: 'adicionar_cartaz.png'},
      versaoCartaz: {type: String, required: true, default: '1537879211'},
      titulo: {type: String, required: true},
      data: {type: Date},
      horario: {type: Date},
      descricao: {type: String},
      imagens: [{
            idImagem:     {type: String},
            versaoImagem: {type: String},
      }],
      conta: [{
            banco: {type: String},
            agencia: {type: String},
            conta: {type: String},
            titular: {type: String},
      }],
      departamentosParticipantes: [{
            departamento: {type: mongoose.Schema.Types.ObjectId, ref: 'Departamento'}
      }],
      doacoes: [{
            item: {type: String},
            quantidade: {type: Number}
      }]
});

module.exports = mongoose.model('Evento', eventosSchema);