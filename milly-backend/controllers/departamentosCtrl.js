const passport  = require('passport');
const Usuario   = require('../models/usuario');
const Departamento = require('../models/departamentos');
const mongoose = require('mongoose');
const async = require('asyncawait/async');
const waterfall = require('async-waterfall');
const await = require('asyncawait/await');
const cloudinary    = require("cloudinary");
const nodemailer   = require("nodemailer");
const crypto       = require("crypto");

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
                        return res.status(200).json({message: 'Departamento salvo.', departamento: departamento});
                  });
            });
        });
}

exports.getDepartamentos =  async ((req,res) => {
      console.log("getDepartamentos - " + req.params);
      const result = await(Departamento.find({'igreja': req.params.igreja}, (err) => {
            if (err) return res.status(500).json({error: err});
      }).populate("diretor"));
      console.log("result - " + result);
      return res.status(200).json({departamentos: result});
});

exports.removeDepartamento = async ((req,res) => {
      const result = await(Departamento.findOneAndRemove({'_id': req.body.departamento}, (err) => {
            if (err) return res.status(500).json({error: err});
      }));
      return res.status(200).json({message: 'Departamento removido.'});
});