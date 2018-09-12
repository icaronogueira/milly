const passport  = require('passport');
const Usuario   = require('../models/usuario');
const Notificacao = require('../models/notificacao');
const async = require('asyncawait/async');
const waterfall = require('async-waterfall');
const await = require('asyncawait/await');
const cloudinary    = require("cloudinary");
const nodemailer   = require("nodemailer");
const crypto       = require("crypto");

exports.criaNotificacao = (req, res, next) => {   
      console.log(req.body);
      const notificacao = new Notificacao();
      notificacao.mensagem  = req.body.mensagem;
      notificacao.usuario = req.body.usuario;
      notificacao.lida = 'N';
      notificacao.autor= req.body.autor;
      notificacao.componente = req.body.componente;
      if (req.body.dataAdicional){
            notificacao.dataAdicional = req.body.dataAdicional;
      }
      if (req.body.idImagem) {
            notificacao.idImagem = req.body.idImagem;
      }
      if (req.body.versaoImagem) {
            notificacao.versaoImagem = req.body.versaoImagem;
      }
      notificacao.save((err, result) => {
            if (err) return res.status(500).json({error: err});
      });


      return res.status(200).json({message: 'Notificação criada.', notificacao: notificacao})
            
}

exports.getNotificacoes = (req, res, next) => {
      console.log("getNotificacoes. Id do usuario: " + req.body.usuario);
      Notificacao.find({usuario: req.body.usuario}, (err,result) => {
            if (err) {
                  return res.status(500).json({error: err});
            }
            return res.status(200).json({notificacoes: result});
      }).sort({createdAt: 'desc'});
}

exports.lerNotificacao = (req, res, next) => {
      Notificacao.findOneAndUpdate({_id: req.body.notificacao}, {
            lida: 'S'
      }, (err,result) => {
            if (err) {
                  return res.status(500).json({error: err});
            }
            Notificacao.find({usuario: req.body.usuario}, (err,result) => {
                  if (err) {
                        return res.status(500).json({error: err});
                  }
                  return res.status(200).json({notificacoes: result});
            }).sort({createdAt: 'desc'});
      });
}
exports.lerTodas = (req, res, next) => {
      console.log('ler Todas do usuario ' + req.body.usuario);
      Notificacao.updateMany({usuario: req.body.usuario}, {
            $set: {lida: 'S'}
      }, (err,result) => {
            if (err) {
                  return res.status(500).json({error: err});
            }
            Notificacao.find({usuario: req.body.usuario}, (err,result) => {
                  if (err) {
                        return res.status(500).json({error: err});
                  }
                  return res.status(200).json({notificacoes: result});
            }).sort({createdAt: 'desc'});
      });
}
