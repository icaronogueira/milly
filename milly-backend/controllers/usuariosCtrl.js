const passport  = require('passport');
const Usuario   = require('../models/usuario');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

exports.criaUsuario = (req, res, next) => {
      passport.authenticate('local-signup', (err, user, info) => {
            if (err)  {return res.status(500).json({error: err});}
            if (info) {return res.status(200).json({error: info});}
            return res.status(201).json({message: 'Cadastrado com sucesso', usuario: user});
      })(req,res,next);
}