const mongoose = require('mongoose');

const departamentosSchema = mongoose.Schema({
      nome:  {type: String, required: true},
      diretor: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
      diretoria: [{
            usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
            funcao: {type: String}
      }],
      idLogo:     {type: String},
      versaoLogo: {type: String},
      igreja: {type: mongoose.Schema.Types.ObjectId, ref: 'Igreja'}
});

module.exports = mongoose.model('Departamento', departamentosSchema);