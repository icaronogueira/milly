const Usuario   = require('../models/usuario');
const Mensagem = require('../models/mensagem');
const Departamento = require('../models/departamentos');

//enivar texto, tipoDestinatario, paraDepartamento, igreja (id)
exports.enviaMensagem = (req, res, next) => {   
      console.log(req.body);
      let mensagem = new Mensagem();
      mensagem.texto = req.body.texto;
      mensagem.remetente = req.body.remetente;
      mensagem.assunto = req.body.assunto;
      mensagem.tipoDestinatario = req.body.tipoDestinatario;
      if (req.body.paraDepartamento)  {
            mensagem.paraDepartamento = req.body.paraDepartamento;
      }
      mensagem.infoUsuario=[];
      //preencher mensagem.infoUsuario de acordo com o tipoDestinatario
      //1 - todos os membros
      
      if (req.body.tipoDestinatario == 1) {
            Usuario.find({igreja: req.body.igreja}, (err, result) => {
                  result.forEach(r => {
                        mensagem.infoUsuario.push({
                              usuario: r._id,
                              lido: 'N',
                              removido: 'N'
                        });
                  });
                  mensagem.save((err) => {
                        if (err) return res.status(500).json({error: err});
                  });
                  return res.status(200).json({message: 'Mensagem enviada.', mensagem: mensagem});
            });
      }
      
      //2 - diretores
      if (req.body.tipoDestinatario == 2) {
            Departamento.find({igreja: req.body.igreja}, (err, result) => {
                  result.forEach(r => {
                        mensagem.infoUsuario.push({
                              usuario: r.diretor,
                              lido: 'N',
                              removido: 'N'
                        });
                  });
                  mensagem.save((err) => {
                        if (err) return res.status(500).json({error: err});
                  });
                  return res.status(200).json({message: 'Mensagem enviada.', mensagem: mensagem});
            });
      }
      //3 - para os que seguem o mensagem.paraDepartamento (IMPLEMENTAR POSTERIORMENTE)


      
            
}

exports.enviaMensagemParaUsuario = (req, res, next) => {   
      console.log(req.body);
      let mensagem = new Mensagem();
      mensagem.texto = req.body.texto;
      mensagem.remetente = req.body.remetente;
      mensagem.assunto = req.body.assunto;
      mensagem.infoUsuario=[{
            usuario: req.body.usuario,
            lido: 'N',
            removido: 'N'
      }];
      mensagem.save((err) => {
            if (err) return res.status(500).json({error: err});
      });
      return res.status(200).json({message: 'Mensagem enviada.', mensagem: mensagem});
}
