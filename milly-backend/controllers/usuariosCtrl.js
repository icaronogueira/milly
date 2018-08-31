const passport  = require('passport');
const Usuario   = require('../models/usuario');
const async = require('asyncawait/async');
const waterfall = require('async-waterfall');
const await = require('asyncawait/await');
const cloudinary    = require("cloudinary");
const nodemailer   = require("nodemailer");
const crypto       = require("crypto");

cloudinary.config({
      cloud_name: 'nogcloud', 
      api_key: '666776379245362',
      api_secret: 'lrfzR7N6qQHZKh1dj5QD_GnuRdI' 
});

exports.criaUsuario = (req, res, next) => {
      passport.authenticate('local-signup', (err, user, info) => {
            if (err)  {return res.status(500).json({error: err});}
            if (info) {return res.status(200).json({error: info});}

            cloudinary.uploader.upload(req.body.imagem, (result) => {
                  const savedData = async(()=>{
                        await (Usuario.update({
                              '_id': user._id
                        }, {
                              "idImagem": result.public_id,
                              "versaoImagem": result.version
                        }));
                  });
                  savedData().then(result => {
                        return res.status(201).json({message: 'Cadastrado com sucesso', usuario: user});
                  });
            });
      })(req,res,next);
}

exports.loginUsuario = (req, res, next) => {
      passport.authenticate('local-login', (err, user, info) => {
            if (err)  {return res.status(500).json({error: err});}
            if (info) {return res.status(200).json({error: info});}
            return res.status(201).json({message: 'Bem-vindo', usuario: user});
      })(req,res,next);
}

exports.getUsuario = async( (req, res) => {
      const result = await( Usuario.findOne({'email': req.params.email}, {'senha': 0}));
       return res.status(200).json({usuario: result});
 });

 exports.esqueceuSenha = (req,res,next) => {
      waterfall([
            (done) => {
                  crypto.randomBytes(20, (err, buf) => {
                        let token = buf.toString('hex');
                        done(err, token);
                  });
            },
            (token, done) => {
                  Usuario.findOne({'email': req.body.email}, (err,user) => {
                        if (!user) {
                              return res.status(500).json({error: 'Este email não está cadastrado.'}); 
                        }
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000;

                        user.save((err) => {
                              done(err, token, user);
                        });
                  });
            },
            (token, user, done) => {
                  let smtpTransport = nodemailer.createTransport({
                        transport: 'ses', // loads nodemailer-ses-transport
                        accessKeyId: 'keyNodemailerNog',
                        secretAccessKey: 'secretNodemailerNog'
                  });
                  let emailOptions = {
                        to: user.email,
                        from: 'passwordreset@milly.com',
                        subject: 'Sistema Milly - Recuperação de Senha',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                  }
            }
      ]);
 }

