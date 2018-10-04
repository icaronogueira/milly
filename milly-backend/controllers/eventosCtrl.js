const passport  = require('passport');
const Evento = require('../models/evento');
const mongoose = require('mongoose');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const cloudinary    = require("cloudinary");
const waterfall = require('async-waterfall');

exports.cadastraEvento = (req, res, next) => {
      console.log('entrou no cadastra evento');
      waterfall([
            (done) => {
                  console.log("primeiro metodo waterfall");
                  const evento = new Evento();
                  evento.departamento = req.body.departamento;
                  evento.para = req.body.para;
                  evento.titulo = req.body.titulo;
                  evento.data = req.body.data;
                  evento.horario = req.body.horario;
                  evento.descricao = req.body.descricao ? req.body.descricao : '';
                  evento.conta = req.body.contas ? req.body.contas : null;
                  if (req.body.departamentosParticipantes) {
                        req.body.departamentosParticipantes.forEach(element => {
                              evento.departamentosParticipantes.push({
                                    departamento: element
                              });
                        });      
                  }
                  
                  // evento.departamentosParticipantes = req.body.departamentosParticipantes;
                  evento.doacoes = req.body.doacoes ? req.body.doacoes : null;
                  evento.save((err, result) => {
                        let idevento = result._id;
                        done(err, idevento);
                  });              
            },
            (idevento, done) => {
                  console.log("segundo metodo waterfall");
                  console.log("evento");
                  console.log(idevento);
                  cloudinary.uploader.upload(req.body.cartaz, (resultImagem) => {
                        const savedData = async(()=>{
                              await (Evento.update({
                                    '_id': idevento
                              }, {
                                    "idCartaz": resultImagem.public_id,
                                    "versaoCartaz": resultImagem.version
                              }));
                        });
                        savedData().then(result3 => {
                              return res.status(200).json({message: 'Evento criado.', evento: idevento});
                        });
                  });
            }
      ], (err) => {
            if (err) {return res.status(500).json({error: err});} 
      })
      
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
