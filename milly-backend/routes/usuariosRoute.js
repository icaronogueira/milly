const express     = require('express');
const router      = express.Router();
const UsuariosCtrl = require('../controllers/usuariosCtrl');


router.post('/cadastro', UsuariosCtrl.criaUsuario);

module.exports = router;