const passport  = require('passport');
const Usuario   = require('../models/usuario');
const Departamento = require('../models/departamentos');
const Evento = require('../models/evento');
const mongoose = require('mongoose');
const async = require('asyncawait/async');
const waterfall = require('async-waterfall');
const await = require('asyncawait/await');
const cloudinary    = require("cloudinary");
const nodemailer   = require("nodemailer");
const crypto       = require("crypto");

exports.cadastraEvento = (req, res, next) => { 
      console.log(req.body);
      const evento = new Evento();
      evento.departamento = req.body.departamento;
      evento.para = req.body.para;
      evento.titulo = req.body.titulo;
      evento.data = req.body.data;
      evento.horario = req.body.horario;
      evento.descricao = req.body.descricao;
      evento.conta = req.body.contas;
      req.body.departamentosParticipantes.forEach(element => {
            evento.departamentosParticipantes.push({
                  departamento: element
            });
      });
      // evento.departamentosParticipantes = req.body.departamentosParticipantes;
      evento.doacoes = req.body.doacoes;
      
      evento.save((err, result) => {
            if (err) return res.status(500).json({error: err});
            cloudinary.uploader.upload(req.body.cartaz, (resultImagem) => {
                  const savedData = async(()=>{
                        await (Evento.update({
                              '_id': result._id
                        }, {
                              "idCartaz": resultImagem.public_id,
                              "versaoCartaz": resultImagem.version
                        }));
                  });
                  savedData().then(result3 => {
                        return res.status(200).json({message: 'Evento criado.', evento: result});
                  });
            });
      });
      // return res.status(200).json({message: 'Notificação criada.', notificacao: notificacao})           
}

exports.adicionaImagem = (req, res, next) => { 
            cloudinary.uploader.upload(req.body.imagem, (result) => {
                  const savedData = async(()=>{
                        await (Evento.update({
                              '_id': req.body.evento
                        }, {
                              $push: {
                                    imagens: {
                                          "idImagem": result.public_id,
                                          "versaoImagem": result.version
                                    }
                              }
                              
                        }));
                  });
                  savedData().then(result3 => {
                        return res.status(200).json({message: 'Imagem adicioonada.'});
                  });
            });     
}
