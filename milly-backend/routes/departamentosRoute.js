const express     = require('express');
const router      = express.Router();
const DepartamentosCtrl = require('../controllers/departamentosCtrl');

router.post('/departamentos/novo', DepartamentosCtrl.criaDepartamento);
router.get('/departamentos/:igreja', DepartamentosCtrl.getDepartamentos);
router.get('/departamento/:departamento', DepartamentosCtrl.getDepartamento);
router.post('/departamentos/remover', DepartamentosCtrl.removeDepartamento);
router.post('/departamentos/segue', DepartamentosCtrl.segueDepartamento);
router.post('/departamentos/deixa', DepartamentosCtrl.deixaDepartamento);
router.post('/departamentos/adicionaDiretoria', DepartamentosCtrl.adicionaDiretoria);
router.post('/departamentos/removerDiretoria', DepartamentosCtrl.removerDiretoria);





module.exports = router;