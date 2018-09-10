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
      notificacao.componente = req.body.componente;
      notificacao.save((err) => {
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
      });
}