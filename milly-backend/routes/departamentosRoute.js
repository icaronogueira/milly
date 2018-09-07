const express     = require('express');
const router      = express.Router();
const DepartamentosCtrl = require('../controllers/departamentosCtrl');

router.post('/departamentos/novo', DepartamentosCtrl.criaDepartamento);

module.exports = router;