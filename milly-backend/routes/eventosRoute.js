const express     = require('express');
const router      = express.Router();
const EventosCtrl = require('../controllers/eventosCtrl');


router.post('/eventos/cadastra', EventosCtrl.cadastraEvento);
router.post('/eventos/adicionaimagem', EventosCtrl.adicionaImagem);

module.exports = router;