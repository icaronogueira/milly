const mongoose = require("mongoose");
const bcrypt   = require("bcrypt-nodejs");

const usuarioSchema = mongoose.Schema({
    nome: {type: String},
    email: {type: String},
    igreja: {type: String},
    senha: {type: String},
    permissao: {type: String, default: 'N'}
});

usuarioSchema.methods.encryptPassword = (senha) => {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(10), null);
}

usuarioSchema.methods.checkPassword = function(senha) {
    return bcrypt.compareSync(senha, this.senha);
}


module.exports = mongoose.model('Usuario', usuarioSchema);