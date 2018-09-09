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
      const departamento = new Departamento();
      departamento.nome  = req.body.nome;
      departamento.diretor = req.body.diretor;
      departamento.igreja = req.body.igreja;
      
      departamento.save((err, result) => {
            if (err) return res.status(500).json({error: err});
            cloudinary.uploader.upload(req.body.logo, (result2) => {
                  const savedData = async(()=>{
                        await (Departamento.update({
                              '_id': result._id
                        }, {
                              "idLogo": result2.public_id,
                              "versaoLogo": result2.version
                        }));
                  });
                  savedData().then(result3 => {
                        return res.status(200).json({message: 'Departamento criado.', departamento: departamento});
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