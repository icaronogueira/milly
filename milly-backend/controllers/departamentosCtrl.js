const passport  = require('passport');
const Usuario   = require('../models/usuario');
const Departamento = require('../models/departamentos');

const async = require('asyncawait/async');
const waterfall = require('async-waterfall');
const await = require('asyncawait/await');
const cloudinary    = require("cloudinary");
const nodemailer   = require("nodemailer");
const crypto       = require("crypto");

exports.criaDepartamento = (req, res, next) => { 
      let id; 
      console.log(req.body);
      const departamento = new Departamento();
      departamento.nome  = req.body.nome;
      departamento.diretor = req.body.diretor;
      departamento.igreja = req.body.igreja;
      
      departamento.save((err, result) => {
            if (err) return res.status(500).json({error: err});
            id=result._id;
            console.log(result);
      });

      cloudinary.uploader.upload(req.body.logo, (result) => {
            const savedData = async(()=>{
                  await (Departamento.update({
                        '_id': id
                  }, {
                        "idLogo": result.public_id ? result.public_id : 'avatar-user',
                        "versaoLogo": result.version ? result.version : '1536009363'
                  }));
            });
      });

      return res.status(200).json({message: 'Departamento criada.', departamento: departamento});
            
}