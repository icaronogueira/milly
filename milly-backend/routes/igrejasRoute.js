const express     = require('express');
const router      = express.Router();
const IgrejasCtrl = require('../controllers/igrejasCtrl');


router.get('/igrejas', IgrejasCtrl.getIgrejas);
router.get('/igrejas/:igreja',IgrejasCtrl.getIgreja);
router.post('/igrejas/configuracoes', IgrejasCtrl.atualizaConfiguracoes);

module.exports = router;