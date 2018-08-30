const express     = require('express');
const router      = express.Router();
const UsuariosCtrl = require('../controllers/usuariosCtrl');

router.get('/usuario/:email', UsuariosCtrl.getUsuario);

router.post('/cadastro', UsuariosCtrl.criaUsuario);
router.post('/login', UsuariosCtrl.loginUsuario);

module.exports = router;