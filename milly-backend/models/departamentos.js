const mongoose = require('mongoose');

const departamentosSchema = mongoose.Schema({
      nome:  {type: String, required: true},
      diretor: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
      idLogo:     {type: String, required: true, default: '008'},
      versaoLogo: {type: String, required: true, default: '1536345090'},
      igreja: {type: mongoose.Schema.Types.ObjectId, ref: 'Igreja'}
});

module.exports = mongoose.model('Departamento', departamentosSchema);