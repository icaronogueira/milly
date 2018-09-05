const express     = require('express');
const router      = express.Router();
const UsuariosCtrl = require('../controllers/usuariosCtrl');

router.get('/usuario/:email', UsuariosCtrl.getUsuario);

router.post('/cadastro', UsuariosCtrl.criaUsuario);
router.post('/login', UsuariosCtrl.loginUsuario);
router.post('/esqueceusenha',UsuariosCtrl.esqueceuSenha);
router.post('/esqueceusenha',UsuariosCtrl.esqueceuSenha);
router.get('/reset/:token',UsuariosCtrl.resetToken);
router.post('/deleta', UsuariosCtrl.deletaUsuario);
router.post('/acesso', UsuariosCtrl.acesso);


module.exports = router;