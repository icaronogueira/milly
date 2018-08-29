const Usuario = require("../models/usuario");
const passport = require("passport");
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
            novoUsuario.save((err) => {
                  return done(null, novoUsuario);
            });
    }); 
}));

// passport.use('local-login', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
// }, (req, email, password, done) => {
//     User.findOne({'email': email}, (err,user) => {
//         if (err) {
//             return done(err);
//         }
//         if (!user) {
//             return done(null, false, 'User with email not found.');
//         }
//         if (password.length < 5) {
//             return done(null, false, 'Password must not be less than 5 characters.');
//         }
//         if (!user.checkPassword(req.body.password)) {
//             return done(null, false, 'Password is incorrect.');
//         }

//         return done(null, user);
//     }); 
// }));