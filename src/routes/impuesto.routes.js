const express = require('express');

const impuestoController = require('../controllers/impuestoController');

const router = express.Router();

const { impuestoValidationRules, validate } = require('../middleware/validaciones/impuestoValidation');

router.get('/', impuestoController.getAllImpuesto);
router.get('/:id', impuestoController.getImpuestoById);
router.post('/', [impuestoValidationRules(), validate], impuestoController.createImpuesto);
router.put('/:id', [impuestoValidationRules(), validate], impuestoController.updateImpuesto);
router.delete('/:id', impuestoController.deleteImpuesto);

module.exports = router;