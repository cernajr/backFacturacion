const express = require('express');

const empresaController = require('../controllers/empresaController');

const router = express.Router();

const { empresaValidationRules, validate } = require('../middleware/validaciones/empresaValidation');

router.get('/', empresaController.getAllEmpresa);
router.get('/:id', empresaController.getEmpresaById);
router.post('/', [empresaValidationRules(), validate], empresaController.createEmpresa);
router.put('/:id', [empresaValidationRules(), validate], empresaController.updateEmpresa);
router.delete('/:id', empresaController.deleteEmpresa);

module.exports = router;