const express     = require('express');
const router      = express.Router();
const IgrejasCtrl = require('../controllers/igrejasCtrl');


router.get('/igrejas', IgrejasCtrl.getIgrejas);
router.get('/igrejas/:igreja',IgrejasCtrl.getIgreja);
router.post('/igrejas/configuracoes', IgrejasCtrl.atualizaConfiguracoes);
router.get('/igrejas/membros/:igreja', IgrejasCtrl.getMembros);

module.exports = router;