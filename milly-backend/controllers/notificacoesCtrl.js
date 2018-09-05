const passport  = require('passport');
const Usuario   = require('../models/usuario');
const Notificacao = require('../models/notificacao');
const async = require('asyncawait/async');
const waterfall = require('async-waterfall');
const await = require('asyncawait/await');
const cloudinary    = require("cloudinary");
const nodemailer   = require("nodemailer");
const crypto       = require("crypto");

exports.criaUsuario = (req, res, next) => {   
      const notificacao = new Notificacao();
      notificacao.mensagem  = req.body.mensagem;
      notificacao.usuarioId = req.body.usuario._id;
      notificacao.lida = false;
      notificacao.component = req.body.component;
      notificacao.save((err) => {
            if (err) return res.status(500).json({error: err});
      });
      return res.status(200).json({message: 'Notificação criada.', notificacao: notificacao})
            
}