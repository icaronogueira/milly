const mongoose = require("mongoose");
const bcrypt   = require("bcrypt-nodejs");

const usuarioSchema = mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    igreja: {type: String, required: true},
    senha: {type: String, required: true},
    permissao: {type: String, default: 'N'},
    idImagem:      {type: String},
    versaoImagem: {type: String},



    resetPasswordToken: String,
    resetPasswordExpires: Date
});

usuarioSchema.methods.encryptPassword = (senha) => {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(10), null);
}

usuarioSchema.methods.checkPassword = function(senha) {
    return bcrypt.compareSync(senha, this.senha);
}


module.exports = mongoose.model('Usuario', usuarioSchema);