const express     = require('express');
const router      = express.Router();
const MensagensCtrl = require('../controllers/mensagensCtrl');

router.post('/mensagens/enviar', MensagensCtrl.enviaMensagem);

module.exports = router;