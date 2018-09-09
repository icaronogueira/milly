const express     = require('express');
const router      = express.Router();
const DepartamentosCtrl = require('../controllers/departamentosCtrl');

router.post('/departamentos/novo', DepartamentosCtrl.criaDepartamento);
router.get('/departamentos/:igreja', DepartamentosCtrl.getDepartamentos);
router.post('/departamentos/remover', DepartamentosCtrl.removeDepartamento);


module.exports = router;