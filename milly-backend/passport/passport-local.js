const Usuario       = require("../models/usuario");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;


passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
    passReqToCallback: true
}, (req, email, senha, done) => {
      Usuario.findOne({'email': email}, (err,user) => {
            if (err) {
                  return done(err);
            }
            if (user) {
                  return done(null, false, 'Este email já está cadastrado.');
            }
            const novoUsuario = new Usuario();
            novoUsuario.nome  = req.body.nome;
            novoUsuario.email = req.body.email;
            novoUsuario.igreja = req.body.igreja;
            novoUsuario.senha = novoUsuario.encryptPassword(req.body.senha);
            novoUsuario.tipoLogin = req.body.tipoLogin ? req.body.tipoLogin : 'email' ;
            novoUsuario.save((err) => {
                  console.log(err);
                  return done(null, novoUsuario);
            });
    }); 
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
    passReqToCallback: true
}, (req, email, password, done) => {
      Usuario.findOne({'email': email}, (err,usuario) => {
            if (err) {
                  return done(err);
            }
            if (!usuario) {
                  return done(null, false, 'Email não cadastrado.');
            }
            if (!usuario.checkPassword(req.body.senha)) {
                  return done(null, false, 'Senha está incorreta.');
            }

            return done(null, usuario);
      }); 
}));