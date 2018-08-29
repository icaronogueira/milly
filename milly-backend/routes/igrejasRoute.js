const express     = require('express');
const router      = express.Router();
const IgrejasCtrl = require('../controllers/igrejasCtrl');


router.get('/igrejas', IgrejasCtrl.getIgrejas);

module.exports = router;