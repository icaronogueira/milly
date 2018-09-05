const express     = require('express');
const router      = express.Router();
const NotificacoesCtrl = require('../controllers/notificacoesCtrl');

router.post('/notificacoes/novo', NotificacoesCtrl.criaNotificacao);

module.exports = router;