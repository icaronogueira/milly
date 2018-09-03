const mongoose = require("mongoose");
const bcrypt   = require("bcrypt-nodejs");

const usuarioSchema = mongoose.Schema({
      nome:         {type: String, required: true},
      //se tipoLogin=facebook, este campo contera o userID do face
      email:        {type: String, unique: true},
      igreja:       {type: mongoose.Schema.Types.ObjectId, ref: 'Igreja'},
      senha:        {type: String},
      permissao:    {type: String, required: true, default: 'N'},
      idImagem:     {type: String},
      versaoImagem: {type: String},

      tipoLogin: {type: String, default: 'email'},

      tipo:         {type: String, required: true, default: 'membro'},

      resetPasswordToken: String,
      resetPasswordExpires: Date,
});

usuarioSchema.methods.encryptPassword = (senha) => {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(10), null);
}

usuarioSchema.methods.checkPassword = function(senha) {
    return bcrypt.compareSync(senha, this.senha);
}


module.exports = mongoose.model('Usuario', usuarioSchema);