const Usuario   = require('../models/usuario');
const Departamento = require('../models/departamentos');
const mongoose = require('mongoose');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const cloudinary    = require("cloudinary");

exports.criaDepartamento = (req, res, next) => { 
      const departamento =  {
            nome: req.body.nome,
            diretor: req.body.diretor,
            igreja: req.body.igreja
      };

      Departamento.findOneAndUpdate({
            _id: req.body.idDepartamento ? req.body.idDepartamento : new mongoose.mongo.ObjectID()
        }, departamento, { upsert: true, new: true }, function(err, result) {
            if (err) return res.status(500).json({error: err});
            console.log("result = " + result);
            cloudinary.uploader.upload(req.body.logo, (result2) => {
                  const savedData = async(()=>{
                        await (Departamento.update({
                              '_id': result._id
                        }, {
                              "idLogo": result2.public_id ? result2.public_id : "008",
                              "versaoLogo": result2.version ? result2.version : "1536345090" 
                        }));
                  });
                  savedData().then(result3 => {
                        return res.status(200).json({message: 'Departamento salvo.', departamento: result});
                  });
            });
        });
}

exports.getDepartamentos =  async ((req,res) => {
      console.log("getDepartamentos - " + req.params);
      const result = await(Departamento.find({'igreja': req.params.igreja}, (err) => {
            if (err) return res.status(500).json({error: err});
      }).sort({nome: 'asc'}).populate("diretor").populate('diretoria.usuario'));
      console.log("result - " + result);
      return res.status(200).json({departamentos: result});
});

exports.getDepartamento =  async ((req,res) => {
      console.log("id do departamento : " + req.params.departamento);
      const result = await(Departamento.findOne({'_id': req.params.departamento}, (err) => {
            if (err) return res.status(500).json({error: err});
      }).populate("diretor").populate('diretoria.usuario'));
      console.log("resultado a busca pelo departamento: " + result);
      return res.status(200).json({departamento: result});
});

exports.removeDepartamento = async ((req,res) => {
      const result = await(Departamento.findOneAndRemove({'_id': req.body.departamento}, (err) => {
            if (err) return res.status(500).json({error: err});
      }));
      return res.status(200).json({message: 'Departamento removido.'});
});

exports.segueDepartamento = async ((req,res) => {
      const result = await(Usuario.findOneAndUpdate({'_id': req.body.usuario._id}, {
            $addToSet: {segue: {departamento: req.body.departamento._id}}
      }, (err) => {
            if (err) return res.status(500).json({error: err});
      }));
      return res.status(200).json({message: req.body.usuario.nome + ' está seguindo o departamento '+ req.body.departamento.nome});
});

exports.deixaDepartamento = async ((req,res) => {
      const result = await(Usuario.findOneAndUpdate({'_id': req.body.usuario._id}, {
            $pull: {segue: {departamento: req.body.departamento._id}}
      }, (err) => {
            if (err) return res.status(500).json({error: err});
      }));
      return res.status(200).json({message: req.body.usuario.nome + ' deixou o departamento '+ req.body.departamento.nome});
});

exports.adicionaDiretoria = (req, res, next) => { 
      let f = req.body.funcao;
      Departamento.findOneAndUpdate({
            _id: req.body.departamento
        }, {
            $addToSet: {diretoria: {
                  usuario: req.body.usuario,
                  funcao: req.body.funcao
            }}
         }, function(err, result) {
            if (err) return res.status(500).json({error: err});
                  return res.status(200).json({message: 'Membro da diretoria adicionado', departamento: result, funcao: f});
        });
}

exports.removerDiretoria = async ((req,res) => {
      let f=req.body.funcao;
      const result = await(Departamento.findOneAndUpdate({_id: req.body.departamento}, {
            $pull: {diretoria: {
                  usuario: req.body.usuario,
                  funcao: req.body.funcao
            }}
      }, (err) => {
            if (err) return res.status(500).json({error: err});
      }));
      return res.status(200).json({message: 'Membro da diretoria removido.', departamento: result, funcao: f});
});
