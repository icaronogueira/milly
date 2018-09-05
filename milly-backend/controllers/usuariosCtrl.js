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
                                          "idImagem": result.public_id ? result.public_id : 'avatar-user',
                                          "versaoImagem": result.version ? result.version : '1536009363'
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
                  console.log(req.body.email);
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
                        service: 'gmail',
                        auth: {
                              user: 'icarofne@gmail.com',
                              pass: 'segredo123'
                        }
                  });
                  let emailOptions = {
                        to: user.email,
                        from: 'icarofne@gmail.com',
                        subject: 'Sistema Milly - Recuperação de Senha',
                        text: 'Você está recebendo este email porque você solicitou a recuperação da senha para sua conta.\n\n' +
                        'Por favor, clique no link para completar o processo. Você receberá outro email contendo uma senha temporária para acesso.\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'Caso não tenha feito tal solicitação, ignore este email e sua senha permanecerá a mesma.\n'
                  }
                  smtpTransport.sendMail(emailOptions, (err) => {
                        return res.status(200).json({message: 'Verifique seu email ('+user.email+') para instruções quando à recuperação da senha.',
                                                      error: err}); 
                  });
            }
      ], (err) => {
            if (err) {return res.status(500).json({error: err});} 
      });
 }

 exports.resetToken = (req,res) => {
      let senhaTemporaria;
      waterfall([
            (done) => {
                  Usuario.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
                        if (!user) {
                              return res.status(500).json({error: 'Token de recuperação de senha expirou. Faça um novo requerimento de recuperação de senha.'});
                        }
                        //gerar string aleatoria
                        
                        senhaTemporaria = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
                        user.senha = user.encryptPassword(senhaTemporaria);
                        console.log("user.senha: " + user.senha + ". senhaTemporaria: "+senhaTemporaria);
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
                  
                        user.save((err) => {
                              done(err, user);
                        });
                  });
            },
            (user, done)=> {
                  console.log("senhaTemporaria: " + senhaTemporaria)
                  var smtpTransport = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                              user: 'icarofne@gmail.com',
                              pass: 'segredo123'
                        }
                  });
                  var mailOptions = {
                        to: user.email,
                        from: 'icarofne@gmail.com',
                        subject: 'Recuperação de senha',
                        text: 'Olá,\n\n' +
                              'Uma senha temporária foi gerada para você: ' + senhaTemporaria + '. Acesse o Milly com esta senha e em seguida, altere sua senha imediatamente.\n'
                        };
                  smtpTransport.sendMail(mailOptions, (err)=> {
                        return res.status(200).json({message: 'Verifique seu email'});
                  });
            }
          ], (err)=> {
                  if (err) {return res.status(500).json({error: err});}
          });
 }

exports.deletaUsuario = (req,res,next) => {
      Usuario.findOneAndRemove({email: req.body.email}, (err) => {
            if (err) {
                  return res.status(500).json({error: err});  
            }
            res.status(200).json({message: 'Seu cadastro foi removido.'});
      });
}

exports.acesso = (req,res,next) => {
      let tmp = req.body.acao==='aceitar' ? 'S' : 'negada';
      let tmp2 = req.body.acao==='aceitar' ? 'habilitado' : 'negado';
      Usuario.findOneAndUpdate({_id: req.body.membro._id}, {
            permissao: tmp
      }, (err) => {
            if (err) {
                  return res.status(500).json({error: err});  
            }
            res.status(200).json({message: `O pedido de acesso de ${req.body.membro.nome} foi ${tmp2}.`});
      });
}