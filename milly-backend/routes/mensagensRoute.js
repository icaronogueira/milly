const express     = require('express');
const router      = express.Router();
const MensagensCtrl = require('../controllers/mensagensCtrl');

router.post('/mensagens/enviar', MensagensCtrl.enviaMensagem);
router.post('/mensagens/enviaUsuario', MensagensCtrl.enviaMensagemParaUsuario);
module.exports = router;