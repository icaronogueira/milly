const express     = require('express');
const router      = express.Router();
const NotificacoesCtrl = require('../controllers/notificacoesCtrl');

router.post('/notificacoes/novo', NotificacoesCtrl.criaNotificacao);
router.post('/notificacoes', NotificacoesCtrl.getNotificacoes);
router.post('/notificacoes/lida', NotificacoesCtrl.lerNotificacao);



module.exports = router;